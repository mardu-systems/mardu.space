"use client";

import * as React from "react";
import Image from "next/image";
import {useMemo, useState} from "react";
import {defineStepper} from "@stepperize/react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {createSteps} from "./steps";
import {toast} from "sonner";

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

/* ===================== Stepper ===================== */

const Wizard = defineStepper(
    {id: "tri", title: "Drehstrommaschinen"},
    {id: "schuko", title: "Schuko-Maschinen"},
    {id: "doors", title: "Eingangstüren"},
    {id: "gates", title: "Elektrische Tore"},
    {id: "fridges", title: "Getränkekühlschränke"},
    {id: "central", title: "Zentrales Freigabesystem"},
    {id: "contact", title: "Kontakt"},
    {id: "summary", title: "Zusammenfassung"},
);

/* ===================== Seite ===================== */

export default function ConfiguratorPageClient() {
    const [state, setState] = useState<State>(defaultState);
    const steps = useMemo(() => createSteps(state, setState), [state]);

    return (
        <div
            className={cn(
                "min-h-screen",
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
                            const res = await fetch("/api/contact", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({...state.contact, config: state}),
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
    const total = Math.max(1, stepper.all.length - 1); // Guard gegen Division durch 0
    const progressPct = (idx / total) * 100;

    return (
        <main className="w-full max-w-4xl mx-auto px-0 sm:px-2 pb-24">
            {/* Progress */}
            <div className="relative mb-8 sm:mb-10">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 px-2 sm:px-3">
                    <div className="h-1 bg-gray-200 relative rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-red-500 transition-[width] duration-300"
                            style={{width: `${progressPct}%`}}
                        />
                    </div>
                </div>

                <div className="relative z-10 flex justify-between items-center gap-2 px-1 sm:px-2">
                    {stepper.all.map((s, i) => {
                        const isCompleted = i <= idx;
                        return (
                            <button
                                key={s.id}
                                onClick={() => stepper.goTo(s.id)}
                                aria-current={i === idx}
                                aria-label={`Schritt ${i + 1}: ${typeof s.title === "string" ? s.title : `#${i + 1}`}`}
                                className={cn(
                                    "flex-shrink-0 grid place-items-center rounded-full border-2 font-black tabular-nums",
                                    "transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-red-500/50",
                                    "size-[44px] sm:size-[52px]", // fixe Touch-Ziele
                                    isCompleted
                                        ? "bg-red-500 text-white border-red-500"
                                        : "bg-white text-red-500 border-red-500"
                                )}
                            >
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Titel + HoverCard (responsive) */}
            <div className="text-center">
                <HoverCard openDelay={80} closeDelay={120}>
                    <HoverCardTrigger asChild>
                        <button className="group mx-auto block focus:outline-none">
                            <h1 className="font-extrabold text-ink-500 leading-tight whitespace-pre-wrap
                              text-[clamp(1.125rem,3.2vw,2rem)] sm:text-3xl md:text-4xl">
                                {steps[idx]?.title}
                            </h1>
                            <p className="mt-2 inline-flex items-center gap-1 text-sm text-ink-300 group-hover:text-ink-400 transition">
                                Mehr Infos anzeigen
                                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                                    <path
                                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-1.25 7h2.5a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v5c0 .414.336.75.75.75Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </p>
                        </button>
                    </HoverCardTrigger>

                    <HoverCardContent
                        side="bottom"
                        align="center"
                        sideOffset={8}
                        className="w-[min(92vw,680px)] p-0 overflow-hidden rounded-2xl border shadow-md"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-50 to-transparent px-5 py-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <h3 className="text-lg font-bold text-ink-800">{steps[idx]?.title}</h3>
                                    <p className="text-sm text-ink-500">Kurze Hilfe</p>
                                </div>
                                <span
                                    className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-full">
                  Schritt {idx + 1}/{steps.length}
                </span>
                            </div>
                        </div>

                        {/* Inhalt */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-5 gap-5">
                            <div className="md:col-span-3 text-left">
                                <p className="text-ink-700 leading-relaxed">{steps[idx]?.tip}</p>
                            </div>

                            <div className="md:col-span-2">
                                <div
                                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-ink-50">
                                    {steps[idx]?.hoverImg ? (
                                        <Image src={steps[idx]!.hoverImg!} alt="Vorschau" fill
                                               className="object-cover"/>
                                    ) : (
                                        <div
                                            className="absolute inset-0 grid place-items-center text-ink-300 text-sm">Keine
                                            Vorschau</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {/* Aktueller Step-View */}
            <div className="mt-8">
                {steps[idx]?.view}
            </div>

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