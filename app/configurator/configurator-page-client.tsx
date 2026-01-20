'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { defineStepper } from '@stepperize/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createSteps } from './steps';
import { ContactSchema } from './steps/contact';
import { useRecaptcha } from '@/lib/recaptcha';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import StepIndicator from '@/components/stepper/step-indicator';
import CodeBlip from '@/components/CodeBlip'; /* ===================== Typen & Defaults ===================== */

/* ===================== Typen & Defaults ===================== */

export type State = {
  triMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
  schukoMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
  doors: { count: number; cablePerDoorM: number; photoUrl?: string };
  gates: { count: number; cablePerGateM: number; photoUrl?: string };
  fridges: { count: number; photoUrl?: string };
  centralRooms: { count: number; photoUrl?: string };
  contact: {
    name: string;
    email: string;
    company?: string;
    message?: string;
    phone?: string;
    consent?: boolean;
  };
};

const defaultState: State = {
  triMachines: { count: 0, cablePerUnitM: 10 },
  schukoMachines: { count: 0, cablePerUnitM: 10 },
  doors: { count: 0, cablePerDoorM: 15 },
  gates: { count: 0, cablePerGateM: 20 },
  fridges: { count: 0 },
  centralRooms: { count: 0 },
  contact: { name: '', email: '', company: '', message: '', phone: '', consent: false },
};

const STORAGE_KEY = 'configurator-state';

/* ===================== Stepper-Definition ===================== */

const Wizard = defineStepper(
  { id: 'tri', title: 'Drehstrommaschinen' },
  { id: 'schuko', title: 'Schuko-Maschinen' },
  { id: 'doors', title: 'Eingangstüren' },
  { id: 'gates', title: 'Elektrische Tore' },
  { id: 'fridges', title: 'Getränkekühlschränke' },
  { id: 'central', title: 'Zentrales Freigabesystem' },
  { id: 'summary', title: 'Zusammenfassung' },
  { id: 'contact', title: 'Kontakt' },
);

/* ===================== Seite ===================== */

export default function ConfiguratorPageClient() {
  const [state, setState] = useState<State>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          return JSON.parse(stored) as State;
        } catch {}
      }
    }
    return defaultState;
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);
  const steps = useMemo(() => createSteps(state, setState), [state]);
  const executeRecaptcha = useRecaptcha();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div
      className={cn(
        'md:min-h-screen',
        'flex items-start sm:items-center justify-center',
        'px-4 sm:px-6 lg:px-10',
        // verhindert Overlap mit transparentem Header + Notch-safe
        'pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10',
      )}
    >
      <Wizard.Scoped>
        <MainContent
          steps={steps}
          state={state}
          onSubmit={async () => {
            const { contact, ...config } = state;
            const validation = ContactSchema.safeParse(contact);
            if (!validation.success) {
              const field = validation.error.issues[0]?.path[0];
              if (typeof field === 'string' && typeof document !== 'undefined') {
                const selector =
                  field === 'consent' ? '[data-contact-consent]' : `[name="${field}"]`;
                const el = document.querySelector(selector) as HTMLElement | null;
                el?.focus();
              }
              setStatus('idle');
              setErrorMessage(null);
              return;
            }

            try {
              setSubmitting(true);
              setStatus('idle');
              setErrorMessage(null);
              const token = await executeRecaptcha('contact');
              if (!token) throw new Error('reCAPTCHA failed');
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...validation.data, config, token, source: 'wizard' }),
              });
              if (!res.ok) throw new Error('Request failed');
              setStatus('success');
              setState(defaultState);
              if (typeof window !== 'undefined') {
                window.sessionStorage.removeItem(STORAGE_KEY);
              }
            } catch (e: unknown) {
              console.error(e);
              setStatus('error');
              setErrorMessage(e instanceof Error ? e.message : null);
            } finally {
              setSubmitting(false);
            }
          }}
          status={status}
          submitting={submitting}
          errorMessage={errorMessage}
        />
      </Wizard.Scoped>
    </div>
  );
}

/* ===================== Inhalt ===================== */

function MainContent({
  steps,
  state,
  onSubmit,
  status,
  submitting,
  errorMessage,
}: {
  steps: {
    id: string;
    title: React.ReactNode;
    tip: string;
    view: React.ReactNode;
    valid: (s: State) => boolean;
    hoverImg?: string;
  }[];
  state: State;
  onSubmit: () => Promise<void>;
  status: 'idle' | 'success' | 'error';
  submitting: boolean;
  errorMessage: string | null;
}) {
  const stepper = Wizard.useStepper({ initialStep: 'tri' });
  const idx = stepper.all.findIndex((s) => s.id === stepper.current.id);
  const isValid = steps[idx]?.valid?.(state);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  // Scroll to top on step changes (both directions, all layouts)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }, [idx, prefersReducedMotion]);

  // Stepper indicator replaces custom mobile/desktop steppers

  if (status === 'success') {
    return (
      <main className="w-full max-w-4xl mx-auto px-0 sm:px-2 pb-24 mt-10 md:mt-0 text-center">
        <Alert className="mt-4 animate-fade-in" variant="default" role="status" aria-live="polite">
          <AlertDescription>Danke! Anfrage versendet.</AlertDescription>
        </Alert>
        <Button asChild className="mt-6 h-11 px-4 touch-manipulation">
          <Link href="/">Zur Startseite</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-0 sm:px-2 pb-24 mt-10 md:mt-0">
      {/* Progress + Stepper */}
      <div className="relative my-8 sm:my-10">
        <StepIndicator
          current={idx + 1}
          total={stepper.all.length}
          labels={steps.map((s) => (typeof s.title === 'string' ? s.title : ''))}
          showLabels={false}
          onStepClick={(i) => stepper.goTo(stepper.all[i - 1]?.id)}
          size="lg"
        />
      </div>

      {/* Titel + CodeBlip Help */}
      <CodeBlip.Provider>
        <div className="text-center">
          <ResponsiveHelp
            title={steps[idx]?.title}
            tip={steps[idx]?.tip ?? ''}
            stepIndex={idx}
            stepCount={steps.length}
            image={steps[idx]?.hoverImg}
          />
          <CodeBlip.Modal />
        </div>
      </CodeBlip.Provider>

      {/* Aktueller Step-View */}
      <div className="mt-8">{steps[idx]?.view}</div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={() => stepper.prev()}
          disabled={stepper.isFirst}
          className="h-11 px-4 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          Zurück
        </Button>

        <div className="flex items-center gap-4">
          <Button
            onClick={async () => {
              if (!isValid) return;
              if (!stepper.isLast) stepper.next();
              else await onSubmit();
            }}
            disabled={submitting}
            aria-disabled={submitting}
            aria-busy={submitting && stepper.isLast}
            className="h-11 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 touch-manipulation"
          >
            {submitting && stepper.isLast && (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            )}
            {stepper.isLast ? 'Angebot anfordern' : 'Weiter'}
          </Button>
        </div>
      </div>
      {status === 'error' && (
        <Alert
          className="mt-4 animate-fade-in"
          variant="destructive"
          role="alert"
          aria-live="assertive"
        >
          <AlertDescription>
            {errorMessage ?? 'Etwas ist schiefgelaufen. Versuch es erneut.'}
          </AlertDescription>
        </Alert>
      )}
    </main>
  );
}

/* ===================== Responsive Help ===================== */
function ResponsiveHelp({
  title,
  tip,
  stepIndex: _stepIndex,
  stepCount: _stepCount,
  image,
}: {
  title: React.ReactNode;
  tip: string;
  stepIndex: number;
  stepCount: number;
  image?: string;
}) {
  // Replace Dialog tooltip with CodeBlip button
  return (
    <div className="mx-auto block min-h-[44px] px-2 text-center">
      <div className="inline-flex items-baseline gap-0">
        <h1
          className="font-extrabold text-ink-500 leading-tight whitespace-pre-wrap
                           text-[clamp(1.125rem,3.2vw,2rem)] sm:text-3xl md:text-4xl"
        >
          {title}
          <span className="ml-2 inline-flex align-baseline">
            <CodeBlip.Button
              blip={{
                label: typeof title === 'string' ? title : 'Info',
                feature: (
                  <div className="space-y-4">
                    {tip && (
                      <p className="text-base sm:text-lg leading-relaxed text-white/90">{tip}</p>
                    )}
                    {image && (
                      <Image
                        src={image}
                        alt=""
                        width={720}
                        height={405}
                        className="rounded-md border border-white/10"
                      />
                    )}
                  </div>
                ),
              }}
              delay={400}
              index={1}
            />
          </span>
        </h1>
      </div>
    </div>
  );
}
