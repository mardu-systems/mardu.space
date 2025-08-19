"use client";

import * as React from "react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { defineStepper } from "@stepperize/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { createSteps } from "./steps";

export type State = {
    triMachines: {
        count: number;
        cablePerUnitM: number; // zweiadrig
        photoUrl?: string;
    };
    schukoMachines: {
        count: number;
        cablePerUnitM: number; // zweiadrig
        photoUrl?: string;
    };
    doors: {
        count: number;
        cablePerDoorM: number; // 12-adrig zwischen Readerboard und Mainboard
        photoUrl?: string;
    };
    gates: {
        count: number;
        cablePerGateM: number; // 12-adrig
        photoUrl?: string;
    };
    fridges: {
        enabled: "yes" | "no" | "later";
        count: number;
        photoUrl?: string;
    };
    centralRooms: {
        count: number;
        photoUrl?: string;
    };
    contact: {
        name: string;
        email: string;
        company?: string;
        message?: string;
    };
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

const Wizard = defineStepper(
    {id: "tri", title: "Drehstrommaschinen"},
    {id: "schuko", title: "Schuko‑Maschinen"},
    {id: "doors", title: "Eingangstüren"},
    {id: "gates", title: "Elektrische Tore"},
    {id: "fridges", title: "Getränkekühlschränke"},
    {id: "central", title: "Zentrales Freigabesystem"},
    {id: "contact", title: "Kontakt"},
    {id: "summary", title: "Zusammenfassung"},
);

export default function MarduConfigurator() {
    const [state, setState] = useState<State>(defaultState);

    const steps = useMemo(() => createSteps(state, setState), [state]);

    return (
        <header className="max-w-6xl mx-auto px-6 sm:px-10 pt-30 pb-6">
            <Wizard.Scoped>
                <MainContent steps={steps} state={state} onSubmit={() => {
                    console.log("SUBMIT", state);
                    alert("Danke! Anfrage versendet (Demo). Siehe Console für Payload.");
                }}/>
            </Wizard.Scoped>
        </header>
    );
}

function MainContent({
                         steps,
                         state,
                         onSubmit,
                     }: {
    steps: { id: string; title: React.ReactNode; tip: string; view: React.ReactNode; valid: (s: State) => boolean; hoverImg?: string }[];
    state: State;
    onSubmit: () => void;
}) {
    const stepper = Wizard.useStepper({initialStep: "tri"});
    const idx = stepper.all.findIndex(s => s.id === stepper.current.id);
    const isValid = steps[idx].valid(state);

    return (
        <main className="max-w-6xl mx-auto px-6 sm:px-10 pb-24">
            {/* Progress Bar */}
            <div className="relative mb-10">
                <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 flex items-center px-6 sm:px-7">
                    <div className="flex-1 h-1 bg-gray-200 relative">
                        <div className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-300"
                             style={{width: `${(idx / (stepper.all.length - 1)) * 100}%`}}/>
                    </div>
                </div>
                <div className="relative z-10 flex justify-between items-center">
                    {stepper.all.map((s, i) => {
                        const isCompleted = i <= idx;
                        return (
                            <div key={s.id} className="flex justify-center">
                                <button onClick={() => stepper.goTo(s.id)}
                                        className={cn(
                                            "w-12 h-12 sm:w-14 sm:h-14 rounded-full font-extrabold transition-all duration-200 border-2",
                                            isCompleted ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-red-500"
                                        )}>
                                    {i + 1}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Title + Tip */}
            {/* Title + Tip */}
            <div className="text-center">
                <HoverCard openDelay={80} closeDelay={120}>
                    <HoverCardTrigger asChild>
                        <button className="group mx-auto block focus:outline-none">
                            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-ink-500 leading-tight whitespace-pre-wrap">
                                {steps[idx].title}
                            </h1>
                            <p className="mt-2 inline-flex items-center gap-1 text-sm text-ink-300 group-hover:text-ink-400 transition">
                                Mehr Infos anzeigen
                                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                                    <path
                                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-11.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-1.25 7h2.5a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v5c0 .414.336.75.75.75Z"
                                        fill="currentColor"/>
                                </svg>
                            </p>
                        </button>
                    </HoverCardTrigger>

                    <HoverCardContent className="w-[680px] p-0 overflow-hidden rounded-2xl border shadow-md">
                        {/* Header mit sanftem Verlauf */}
                        <div className="bg-gradient-to-r from-red-50 to-transparent px-5 py-4 border-b">
                            <div className="flex items-center justify-between">
                                <div className="text-left">
                                    <h3 className="text-lg font-bold text-ink-800">{steps[idx].title}</h3>
                                    <p className="text-sm text-ink-500">Kurze Hilfe</p>
                                </div>
                                <span
                                    className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-full">
            Schritt {idx + 1}/{steps.length}
          </span>
                            </div>
                        </div>

                        <div className="p-5 grid grid-cols-5 gap-5">
                            <div className="col-span-3 text-left">
                                <p className="text-ink-700 leading-relaxed">
                                    {steps[idx].tip}
                                </p>
                            </div>

                            {/* Bildseite */}
                            <div className="col-span-2">
                                <div
                                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border bg-ink-50">
                                    {steps[idx].hoverImg ? (
                                        <Image
                                            src={steps[idx].hoverImg}
                                            alt="Vorschau"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 grid place-items-center text-ink-300 text-sm">
                                            Keine Vorschau
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {/* View */}
            <div className="mt-8">{steps[idx].view}</div>

            {/* Nav */}
            <div className="mt-12 flex items-center justify-between gap-4">
                <Button variant="outline" onClick={() => stepper.prev()} disabled={stepper.isFirst}>Zurück</Button>
                <div className="flex items-center gap-4">
                    {!isValid && <span className="text-sm text-rose-600">Bitte gültige Eingabe.</span>}
                    <Button
                        onClick={() => {
                            stepper.beforeNext(() => isValid);
                            if (!stepper.isLast) stepper.next();
                            else onSubmit();
                        }}
                    >
                        {stepper.isLast ? "Angebot anfordern" : "Weiter"}
                    </Button>
                </div>
            </div>
        </main>
    );
}