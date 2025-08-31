"use client";

import * as React from "react";
import {useMemo, useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import {defineStepper} from "@stepperize/react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {createSteps} from "./steps";
import {ContactSchema} from "./steps/contact";
import {useRecaptcha} from "@/lib/recaptcha";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Loader2, PlusIcon} from "lucide-react";
import StepIndicator from "@/components/stepper/step-indicator";

/* ===================== Typen & Defaults ===================== */

export type State = {
    triMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
    schukoMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
    doors: { count: number; cablePerDoorM: number; photoUrl?: string };
    gates: { count: number; cablePerGateM: number; photoUrl?: string };
    fridges: { count: number; photoUrl?: string };
    centralRooms: { count: number; photoUrl?: string };
    contact: { name: string; email: string; company?: string; message?: string; phone?: string; consent?: boolean };
};

const defaultState: State = {
    triMachines: {count: 0, cablePerUnitM: 10},
    schukoMachines: {count: 0, cablePerUnitM: 10},
    doors: {count: 0, cablePerDoorM: 15},
    gates: {count: 0, cablePerGateM: 20},
    fridges: {count: 0},
    centralRooms: {count: 0},
    contact: {name: "", email: "", company: "", message: "", phone: "", consent: false},
};

const STORAGE_KEY = "configurator-state";

/* ===================== Stepper-Definition ===================== */

const Wizard = defineStepper(
    {id: "tri", title: "Drehstrommaschinen"},
    {id: "schuko", title: "Schuko-Maschinen"},
    {id: "doors", title: "Eingangstüren"},
    {id: "gates", title: "Elektrische Tore"},
    {id: "fridges", title: "Getränkekühlschränke"},
    {id: "central", title: "Zentrales Freigabesystem"},
    {id: "summary", title: "Zusammenfassung"},
    {id: "contact", title: "Kontakt"},
);

/* ===================== Seite ===================== */

export default function ConfiguratorPageClient() {
    const [state, setState] = useState<State>(() => {
        if (typeof window !== "undefined") {
            const stored = window.sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    return JSON.parse(stored) as State;
                } catch {
                }
            }
        }
        return defaultState;
    });
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    }, [state]);
    const steps = useMemo(() => createSteps(state, setState), [state]);
    const executeRecaptcha = useRecaptcha();
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div
            className={cn(
                "md:min-h-screen",
                "flex items-start sm:items-center justify-center",
                "px-4 sm:px-6 lg:px-10",
                // verhindert Overlap mit transparentem Header + Notch-safe
                "pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10"
            )}
        >
            <Wizard.Scoped>
                <MainContent
                    steps={steps}
                    state={state}
                    onSubmit={async () => {
                        try {
                            setSubmitting(true);
                            setStatus("idle");
                            setErrorMessage(null);
                            const token = await executeRecaptcha("contact");
                            if (!token) throw new Error("reCAPTCHA failed");
                            const {contact, ...config} = state;
                            const validation = ContactSchema.safeParse(contact);
                            if (!validation.success)
                                throw new Error(validation.error.issues.map((i) => i.message).join(", "));
                            const res = await fetch("/api/contact", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({...contact, config, token, source: "wizard"}),
                            });
                            if (!res.ok) throw new Error("Request failed");
                            setStatus("success");
                            setState(defaultState);
                            if (typeof window !== "undefined") {
                                window.sessionStorage.removeItem(STORAGE_KEY);
                            }
                        } catch (e: unknown) {
                            console.error(e);
                            setStatus("error");
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
    status: "idle" | "success" | "error";
    submitting: boolean;
    errorMessage: string | null;
}) {
    const stepper = Wizard.useStepper({initialStep: "tri"});
    const idx = stepper.all.findIndex((s) => s.id === stepper.current.id);
    const isValid = steps[idx]?.valid?.(state);

    // Scroll to top on step changes (both directions, all layouts)
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({top: 0, behavior: "smooth"});
        }
    }, [idx]);

    // Stepper indicator replaces custom mobile/desktop steppers

    if (status === "success") {
        return (
            <main className="w-full max-w-4xl mx-auto px-0 sm:px-2 pb-24 mt-10 md:mt-0 text-center">
                <Alert className="mt-4 animate-fade-in" variant="default" role="status" aria-live="polite">
                    <AlertDescription>Danke! Anfrage versendet.</AlertDescription>
                </Alert>
                <Button asChild className="mt-6">
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
                    labels={steps.map((s) => (typeof s.title === "string" ? s.title : ""))}
                    showLabels={false}
                    onStepClick={(i) => stepper.goTo(stepper.all[i - 1]?.id)}
                    size="lg"
                />
            </div>

            {/* Titel + Responsive Help (Popover <sm, HoverCard >=sm) */}
            <div className="text-center">
                <ResponsiveHelp
                    title={steps[idx]?.title}
                    tip={steps[idx]?.tip ?? ""}
                    stepIndex={idx}
                    stepCount={steps.length}
                    image={steps[idx]?.hoverImg}
                />
            </div>

            {/* Aktueller Step-View */}
            <div className="mt-8">{steps[idx]?.view}</div>

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between gap-4">
                <Button
                    variant="outline"
                    onClick={() => stepper.prev()}
                    disabled={stepper.isFirst}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
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
                        className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {submitting && stepper.isLast && <Loader2 className="h-4 w-4 animate-spin"/>}
                        {stepper.isLast ? (submitting ? "Sende…" : "Angebot anfordern") : "Weiter"}
                    </Button>
                </div>
            </div>
            {status === "error" && (
                <Alert className="mt-4 animate-fade-in" variant="destructive" role="alert" aria-live="assertive">
                    <AlertDescription>
                        {errorMessage ?? "Etwas ist schiefgelaufen. Versuch es erneut."}
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
                            stepIndex,
                            stepCount,
                            image,
                        }: {
    title: React.ReactNode;
    tip: string;
    stepIndex: number;
    stepCount: number;
    image?: string;
}) {
    const Header = (
        <>
            <h1
                className="font-extrabold text-ink-500 leading-tight whitespace-pre-wrap
                   text-[clamp(1.125rem,3.2vw,2rem)] sm:text-3xl md:text-4xl"
            >
                {title}
                <span
                    className="ml-2 inline-flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold shadow-[0_0_0_0px_rgba(59,130,246,0.5)] animate-[shadowPulse_3s_ease-in-out_infinite]">
                    <PlusIcon className="h-4 w-4 items-center justify-center"/>
                </span>
            </h1>
        </>
    );

    // Mobile: Popover (tap)
    const PopBody = (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="group mx-auto block focus:outline-none min-h-[44px] px-2"
                    aria-haspopup="dialog"
                    aria-label="Weitere Informationen"
                >
                    {Header}
                </button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                side="bottom"
                sideOffset={8}
                className="w-[calc(100vw-1.5rem)] max-w-[420px] p-0 overflow-hidden rounded-2xl border shadow-md"
            >
                <HelpContent title={title} tip={tip} image={image}/>
            </PopoverContent>
        </Popover>
    );

    // Desktop: HoverCard (hover/focus)
    const HoverBody = (
        <HoverCard openDelay={80} closeDelay={120}>
            <HoverCardTrigger asChild>
                <button
                    className="group mx-auto block focus:outline-none min-h-[44px] px-2"
                    aria-label="Weitere Informationen">
                    {Header}
                </button>
            </HoverCardTrigger>
            <HoverCardContent
                side="bottom"
                align="center"
                sideOffset={8}
                className="w-[min(92vw,680px)] p-0 overflow-hidden rounded-2xl border shadow-md"
            >
                <HelpContent title={title} tip={tip} image={image}/>
            </HoverCardContent>
        </HoverCard>
    );

    return (
        <>
            <div className="sm:hidden">{PopBody}</div>
            <div className="hidden sm:block">{HoverBody}</div>
        </>
    );
}

function HelpContent({
                         title,
                         tip,
                         image,
                     }: {
    title: React.ReactNode;
    tip: string;
    image?: string;
}) {
    return (
        <>
            <div className="bg-gradient-to-r from-destructive/10 to-transparent px-5 py-4 border-b">
                <div className="flex items-center justify-between">
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-ink-800">{title}</h3>
                    </div>
                </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-3 text-left">
                    <p className="text-ink-700 leading-relaxed">{tip}</p>
                </div>
                {image && (
                    <div className="md:col-span-2">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-ink-50">
                            {image && (
                                <Image src={image} alt="Vorschau" fill className="object-cover" quality={30}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
