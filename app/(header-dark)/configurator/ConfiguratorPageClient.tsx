"use client";

import * as React from "react";
import Image from "next/image";
import {useMemo, useState} from "react";
import {defineStepper} from "@stepperize/react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {createSteps} from "./steps";
import {toast} from "sonner";
import {useRecaptcha} from "@/lib/recaptcha";

/* ===================== Typen & Defaults ===================== */

export type State = {
    triMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
    schukoMachines: { count: number; cablePerUnitM: number; photoUrl?: string };
    doors: { count: number; cablePerDoorM: number; photoUrl?: string };
    gates: { count: number; cablePerGateM: number; photoUrl?: string };
    fridges: { enabled: "yes" | "no" | "later"; count: number; photoUrl?: string };
    centralRooms: { count: number; photoUrl?: string };
    contact: { name: string; email: string; company?: string; message?: string };
};

const defaultState: State = {
    triMachines: {count: 0, cablePerUnitM: 10},
    schukoMachines: {count: 0, cablePerUnitM: 10},
    doors: {count: 0, cablePerDoorM: 15},
    gates: {count: 0, cablePerGateM: 20},
    fridges: {enabled: "later", count: 0},
    centralRooms: {count: 0},
    contact: {name: "", email: "", company: "", message: ""},
};

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
    const [state, setState] = useState<State>(defaultState);
    const steps = useMemo(() => createSteps(state, setState), [state]);
    const executeRecaptcha = useRecaptcha();

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
                            const token = await executeRecaptcha("contact");
                            if (!token) throw new Error("reCAPTCHA failed");
                            const res = await fetch("/api/contact", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({...state.contact, config: state, token}),
                            });
                            if (!res.ok) throw new Error("Request failed");
                            toast.success("Danke! Anfrage versendet.");
                        } catch (e) {
                            console.error(e);
                            toast.error("Etwas ist schiefgelaufen. Versuch es erneut.");
                        }
                    }}
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
}) {
    const stepper = Wizard.useStepper({initialStep: "tri"});
    const idx = stepper.all.findIndex((s) => s.id === stepper.current.id);
    const isValid = steps[idx]?.valid?.(state);
    const total = Math.max(1, stepper.all.length - 1); // Guard
    const progressPct = (idx / total) * 100;

    return (
        <main className="w-full max-w-4xl mx-auto px-0 sm:px-2 pb-24 mt-10 md:mt-0">
            {/* Progress + Stepper */}
            <div className="relative mb-8 sm:mb-10">

                {/* Stepper */}
                <div className="relative mt-6 sm:mt-8 mb-8 sm:mb-10">
                    {/* MOBILE: horizontal scroll mit Connectors */}
                    <div
                        className="
      sm:hidden
      -mx-4
      px-[calc(env(safe-area-inset-left)+16px)]
      pr-[calc(env(safe-area-inset-right)+16px)]
      overflow-x-auto no-scrollbar
      scroll-px-4 snap-x snap-mandatory
    "
                    >
                        <div className="flex items-center">
                            {stepper.all.map((s, i) => {
                                const isCompleted = i <= idx;
                                const isCurrent = i === idx;
                                return (
                                    <div key={s.id} className="flex items-center snap-start">
                                        {/* Dot */}
                                        <button
                                            onClick={() => stepper.goTo(s.id)}
                                            aria-current={isCurrent}
                                            aria-label={`Schritt ${i + 1}`}
                                            className={cn(
                                                "flex-shrink-0 grid place-items-center rounded-full border-2 font-black tabular-nums",
                                                "transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50",
                                                "size-11", // 44px mobil
                                                isCompleted
                                                    ? "bg-red-500 text-white border-red-500"
                                                    : "bg-white text-red-500 border-red-500"
                                            )}
                                        >
                                            {i + 1}
                                        </button>

                                        {/* Connector (nicht nach letztem Punkt) */}
                                        {i < stepper.all.length - 1 && (
                                            <div
                                                className="relative mx-2 h-[6px] w-8 rounded-full bg-red-200 overflow-hidden"
                                                aria-hidden>
                                                <div
                                                    className={cn(
                                                        "absolute inset-y-0 left-0 h-full bg-red-500 transition-all duration-500 ease-out",
                                                        i < idx ? "w-full" : "w-0"
                                                    )}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* DESKTOP: gleichmäßig verteilt mit Connectors */}
                    <div className="hidden sm:flex items-center justify-between gap-2 px-2">
                        {stepper.all.map((s, i) => {
                            const isCompleted = i <= idx;
                            const isCurrent = i === idx;
                            return (
                                <div key={s.id} className="flex items-center flex-1">
                                    {/* Dot (zentriert in seinem Segment) */}
                                    <div className="flex-1 flex items-center">
                                        <button
                                            onClick={() => stepper.goTo(s.id)}
                                            aria-current={isCurrent}
                                            aria-label={`Schritt ${i + 1}`}
                                            className={cn(
                                                "mx-auto flex-shrink-0 grid place-items-center rounded-full border-2 font-black tabular-nums",
                                                "transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50",
                                                "size-[52px]", // Desktop
                                                isCompleted
                                                    ? "bg-red-500 text-white border-red-500"
                                                    : "bg-white text-red-500 border-red-500"
                                            )}
                                        >
                                            {i + 1}
                                        </button>
                                    </div>

                                    {/* Connector bis zum nächsten Punkt (nicht nach letztem) */}
                                    {i < stepper.all.length - 1 ? (
                                        <div
                                            className="relative flex-1 h-[6px] mx-2 rounded-full bg-red-200 overflow-hidden"
                                            aria-hidden>
                                            <div
                                                className={cn(
                                                    "absolute inset-y-0 left-0 h-full bg-red-500 transition-all duration-500 ease-out",
                                                    i < idx ? "w-full" : "w-0"
                                                )}
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex-1 h-[6px] mx-2 opacity-0" aria-hidden/>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
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
                    {!isValid && <span className="text-sm text-rose-600">Bitte gültige Eingabe.</span>}
                    <Button
                        onClick={async () => {
                            stepper.beforeNext(() => !!isValid);
                            if (!stepper.isLast) stepper.next();
                            else await onSubmit();
                        }}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {stepper.isLast ? "Angebot anfordern" : "Weiter"}
                    </Button>
                </div>
            </div>
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
            </h1>
            <span className="mt-2 inline-flex items-center gap-1 text-sm text-ink-400">
        Mehr Infos anzeigen
        <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70" aria-hidden="true">
          <path
              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-1.25 7h2.5a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v5c0 .414.336.75.75.75Z"
              fill="currentColor"
          />
        </svg>
      </span>
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
                <HelpContent title={title} tip={tip} stepIndex={stepIndex} stepCount={stepCount} image={image}/>
            </PopoverContent>
        </Popover>
    );

    // Desktop: HoverCard (hover/focus)
    const HoverBody = (
        <HoverCard openDelay={80} closeDelay={120}>
            <HoverCardTrigger asChild>
                <button className="group mx-auto block focus:outline-none min-h-[44px] px-2"
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
                <HelpContent title={title} tip={tip} stepIndex={stepIndex} stepCount={stepCount} image={image}/>
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
    return (
        <>
            <div className="bg-gradient-to-r from-red-50 to-transparent px-5 py-4 border-b">
                <div className="flex items-center justify-between">
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-ink-800">{title}</h3>
                        <p className="text-sm text-ink-500">Kurze Hilfe</p>
                    </div>
                    <span
                        className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-full">
            Schritt {stepIndex + 1}/{stepCount}
          </span>
                </div>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="md:col-span-3 text-left">
                    <p className="text-ink-700 leading-relaxed">{tip}</p>
                </div>

                <div className="md:col-span-2">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-ink-50">
                        {image ? (
                            <Image src={image} alt="Vorschau" fill className="object-cover"/>
                        ) : (
                            <div className="absolute inset-0 grid place-items-center text-ink-300 text-sm">Keine
                                Vorschau</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}