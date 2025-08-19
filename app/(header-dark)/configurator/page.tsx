"use client";

import * as React from "react";
import Image from "next/image";
import {useEffect, useMemo, useState} from "react";
import {defineStepper} from "@stepperize/react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";

/* =====================================================
   mardu.space – Zugriffspunkte/Bedarf Konfigurator
   - Schrittbasiert mit @stepperize/react
   - Tailwind + shadcn/ui
   - Enthält: Maschinen (Drehstrom/Schuko), Türen, Tore,
              Kühlschränke (Bezahlsystem), Zentrales Freigabesystem
   - Dynamische Stückliste (BOM) mit Summen
   ===================================================== */

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

    const steps = useMemo(() => ([
        {
            id: "tri",
            title: "Wie viele Drehstrommaschinen sollen gesichert werden?",
            tip: "Viele große Werkzeugmaschinen – wie Sägen, Fräsen, Bohrmaschinen, Drehbänke oder einige Kompressoren – laufen mit Drehstrom. Das ist ein spezielles Stromsystem mit drei Leitungen (Phasen), wie es in Werkstätten, Industriehallen oder auch in manchen Haushalten zu finden ist. Leicht erkennen lassen sich diese an den roten Stecker wie Rechts im Bild.",
            view: (
                <NumberStep
                    value={state.triMachines.count}
                    onChange={(v) => setState(p => ({...p, triMachines: {...p.triMachines, count: v}}))}
                />
            ),
            valid: (s: State) => s.triMachines.count >= 0,
        },
        {
            id: "schuko",
            title: "Wie viele Maschinen sind an Schuko (einphasig) angeschlossen?",
            tip: "Eine Schukosteckdose ist die Standardsteckdose, die man aus jedem Haushalt kennt. Viele kleinere Maschinen und Werkzeuge – wie Handbohrmaschinen, Schleifer, Staubsauger oder mobile Geräte – laufen über Schuko. Diese Steckdosen liefern 230 Volt, was für Maschinen mit geringerem Strombedarf vollkommen ausreicht.",
            view: (
                <NumberStep
                    value={state.schukoMachines.count}
                    onChange={(v) => setState(p => ({...p, schukoMachines: {...p.schukoMachines, count: v}}))}
                />
            ),
            valid: (s: State) => s.schukoMachines.count >= 0,
        },
        {
            id: "doors",
            title: "Wie viele Eingangstüren sollen gesichert werden?",
            tip: "Eingangstüren sind Hauptzugänge in ein Gebäude. Damit nur berechtigte Personen eintreten können, und das auch möglicherweise außerhalb der offiziellen Öffnungszeiten, lassen sich auch normale Türen mit unserer Hardware ausstatten. Das Elektrische Türschloss oder der Elektrische Türöffner muss dabei aber passend für die Tür gekauft werden.",
            view: (
                <NumberStep
                    value={state.doors.count}
                    onChange={(v) => setState(p => ({...p, doors: {...p.doors, count: v}}))}
                />
            ),
            valid: (s: State) => s.doors.count >= 0 && s.doors.cablePerDoorM >= 0,
        },
        {
            id: "gates",
            title: "Gibt es elektrische Tore zum Gelände?",
            tip: "Elektrische Schiebetore schützen den äußeren Zugang zum Gelände. Um den Zugang zum Gelände für jeden Berechtigten gewährleisten zu können kann das mardu.space System auch mit diesen Verbunden werden. Hierzu muss in die Torsteuerung eingegriffen werden.",
            view: (
                <NumberStep
                    value={state.gates.count}
                    onChange={(v) => setState(p => ({...p, gates: {...p.gates, count: v}}))}
                />
            ),
            valid: (s: State) => s.gates.count >= 0 && s.gates.cablePerGateM >= 0,
        },
        {
            id: "fridges",
            title: "Sollen Getränkekühlschränke mit Bezahlsystem ausgestattet werden?",
            tip: "Getränkekühlschränke lassen sich mit einem elektronischen Bezahlsystem kombinieren. Nutzer können dann Getränke nur gegen genügend Geld auf dem eigenen Ausweis entnehmen.",
            view: (
                <NumberStep
                    value={state.fridges.count}
                    onChange={(v) => setState(p => ({...p, fridges: {...p.fridges, count: v}}))}
                    note="Hinweis: Die Geräte-Integration ist aktuell noch nicht vollständig realisiert."
                />
            ),
            valid: (s: State) => (s.fridges.count >= 0),
        },
        {
            id: "central",
            title: "Wie viele Räume brauchen ein zentrales Freigabesystem?",
            tip: "In manchen Fällen dürfen gewisse Maschinen nur unter Aufsicht bedient werden. Hierzu kann in der Nähe der Tür ein zentrales Gerät installiert werden, dass die untergeordneten Zugriffspunkte an den einzelnen Maschinen Freigegeben werden. Anwendung kann ein solches verhalten in einem Schülerlabor an einer Schule oder bei einem Kurs finden, bei dem die Schüler nur unter aufsicht eines Lehrers die Maschinen bedienen dürfen.",
            view: (
                <NumberStep
                    value={state.centralRooms.count}
                    onChange={(v) => setState(p => ({...p, centralRooms: {...p.centralRooms, count: v}}))}
                />
            ),
            valid: (s: State) => s.centralRooms.count >= 0,
        },
        {
            id: "contact",
            title: "Kontaktdaten für Angebot",
            tip: "Wir verwenden die Daten ausschließlich zur Angebotserstellung.",
            view: (
                <ContactStep
                    name={state.contact.name}
                    email={state.contact.email}
                    company={state.contact.company || ""}
                    message={state.contact.message || ""}
                    onChange={(patch) => setState(p => ({...p, contact: {...p.contact, ...patch}}))}
                />
            ),
            valid: (s: State) => /\S/.test(s.contact.name) && /^\S+@\S+\.\S+$/.test(s.contact.email),
        },
        {
            id: "summary",
            title: "Zusammenfassung & Stückliste",
            tip: "Bitte prüfen, dann absenden.",
            view: <Summary state={state}/>,
            valid: () => true,
        },
    ]), [state]);

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
    steps: { id: string; title: React.ReactNode; tip: string; view: React.ReactNode; valid: (s: State) => boolean }[];
    state: State;
    onSubmit: () => void;
}) {
    const stepper = Wizard.useStepper({initialStep: "tri"});
    const idx = stepper.all.findIndex(s => s.id === stepper.current.id);
    const isValid = steps[idx].valid(state);

    const [useDialog, setUseDialog] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(hover: none), (pointer: coarse)");
        setUseDialog(mq.matches);
        const onChange = (e: MediaQueryListEvent) => setUseDialog(e.matches);
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

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
                                    {"hoverImg" in steps[idx] && (steps[idx] as any).hoverImg ? (
                                        <Image
                                            src={(steps[idx] as any).hoverImg}
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

/* ========================= STEPS ========================= */

function NumberStep({value, onChange, note}: {
    value: number;
    onChange: (v: number) => void
    note?: string
}) {
    const clamp = (v: number) => Math.max(0, Math.min(999, v));
    return (
        <>
            {note &&
                <div
                    className="text-sm text-ink-700 bg-amber-50 border border-amber-200 mx-auto w-fit p-3 rounded-xl mb-4">
                    {note}
                </div>
            }
            <div className="mx-auto w-full max-w-sm">
                <div className="flex flex-col items-stretch justify-center gap-4">
                    <div className="flex-1 rounded-2xl border-2 bg-white text-ink-600">
                        <Input
                            type="number"
                            value={value}
                            onChange={(e) => onChange(clamp(Number(e.target.value || 0)))}
                            className="h-20 text-center text-4xl font-extrabold border-0 focus-visible:ring-0"
                        />
                    </div>
                </div>
                <p className="mt-3 text-center text-xs text-ink-400">Tipp: ↑/↓ ändern ebenfalls den Wert.</p>
            </div>
        </>
    );
}

function ContactStep({name, email, company, message, onChange}: {
    name: string; email: string; company?: string; message?: string;
    onChange: (patch: Partial<State["contact"]>) => void;
}) {
    return (
        <Card className="rounded-2xl border border-ink-100 bg-white/60">
            <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="Name*" value={name} onChange={e => onChange({name: e.target.value})}/>
                    <Input placeholder="E‑Mail*" type="email" value={email}
                           onChange={e => onChange({email: e.target.value})}/>
                    <Input className="sm:col-span-2" placeholder="Firma (optional)" value={company}
                           onChange={e => onChange({company: e.target.value})}/>
                    <Textarea className="sm:col-span-2" rows={3} placeholder="Nachricht (optional)" value={message}
                              onChange={e => onChange({message: e.target.value})}/>
                </div>
            </CardContent>
        </Card>
    );
}

/* ====================== SUMMARY & BOM ====================== */

type BomRow = { item: string; qty: number; note?: string };

function Summary({state}: { state: State }) {
    const bom = computeBOM(state);
    const totalCable2core = state.triMachines.count * state.triMachines.cablePerUnitM + state.schukoMachines.count * state.schukoMachines.cablePerUnitM;
    const totalCable12core = state.doors.count * state.doors.cablePerDoorM + state.gates.count * state.gates.cablePerGateM;

    return (
        <section className="grid xl:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-ink-600 mb-2">Zusammenfassung</h3>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <Field label="Drehstrom‑Maschinen" value={`${state.triMachines.count}`}/>
                        <Field label="Schuko‑Maschinen" value={`${state.schukoMachines.count}`}/>
                        <Field label="Eingangstüren" value={`${state.doors.count}`}/>
                        <Field label="Elektrische Tore" value={`${state.gates.count}`}/>
                        <Field label="Kühlschränke (Status)" value={state.fridges.enabled}/>
                        {state.fridges.enabled === "yes" &&
                            <Field label="Kühlschränke (Anzahl)" value={`${state.fridges.count}`}/>}
                        <Field label="Zentrale Räume" value={`${state.centralRooms.count}`}/>
                        <Field label="Kontakt" value={`${state.contact.name} · ${state.contact.email}`}/>
                    </div>

                    <div className="mt-4 text-xs text-ink-400">
                        <p>Zweiadriges Kabel gesamt (ca.): <strong className="text-ink-600">{totalCable2core} m</strong>
                        </p>
                        <p>12‑adriges Kabel gesamt (ca.): <strong className="text-ink-600">{totalCable12core} m</strong>
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-ink-600 mb-2">Stückliste (automatisch berechnet)</h3>
                    <div className="divide-y">
                        {bom.map((row) => (
                            <div key={row.item} className="py-2 flex items-start justify-between gap-4 text-sm">
                                <span className="text-ink-600">{row.item}{row.note ?
                                    <span className="text-ink-400"> · {row.note}</span> : null}</span>
                                <span className="font-semibold text-ink-700">{row.qty}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

function Field({label, value}: { label: string; value: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-ink-100 p-4 bg-white/70">
            <div className="text-ink-400 text-xs mb-1">{label}</div>
            <div className="font-semibold break-words text-ink-700">{value}</div>
        </div>
    );
}

function computeBOM(state: State): BomRow[] {
    const rows: BomRow[] = [];
    const add = (item: string, qty: number, note?: string) => {
        if (qty > 0) rows.push({item, qty, note});
    };

    // Drehstrommaschinen (pro Maschine)
    add("Schützgehäuse (3~)", state.triMachines.count);
    add("Schütz dreiphasig 24V", state.triMachines.count);
    add("Mainboard Standard (3~)", state.triMachines.count);
    add("Elektronikgehäuse (Maschine)", state.triMachines.count);
    add("Verbindungskabel zweiadrig (m)", state.triMachines.count * state.triMachines.cablePerUnitM);

    // Schuko‑Maschinen (pro Maschine)
    add("Schützgehäuse einphasig", state.schukoMachines.count);
    add("Schütz einphasig 24V", state.schukoMachines.count);
    add("Mainboard Standard (1~)", state.schukoMachines.count);
    add("Elektronikgehäuse (Maschine)", state.schukoMachines.count);
    add("Verbindungskabel zweiadrig (m)", state.schukoMachines.count * state.schukoMachines.cablePerUnitM);

    // Türen (pro Tür)
    add("Elektronikgehäuse – Mainboard & USV", state.doors.count * 2);
    add("Elektronikgehäuse – Readerboard", state.doors.count);
    add("12‑adriges Kabel (m)", state.doors.count * state.doors.cablePerDoorM);
    add("Mainboard mit Normboard", state.doors.count);
    add("USV‑Board mit Powerboard", state.doors.count);
    add("Readerboard", state.doors.count);
    add("Hinweis: 18500‑Zelle", state.doors.count, "pro Tür");
    add("Hinweis: Elektroschloss passend zur Tür", state.doors.count, "separat beschaffen");

    // Tore (pro Tor)
    add("Elektronikgehäuse – Readerboard", state.gates.count);
    add("Elektronikgehäuse – Mainboard & USV", state.gates.count * 2);
    add("12‑adriges Kabel (m)", state.gates.count * state.gates.cablePerGateM);
    add("Schalter", state.gates.count * 2);
    add("Schaltergehäuse", state.gates.count * 2);
    add("Mainboard mit Normboard", state.gates.count);
    add("USV‑Board mit Powerboard", state.gates.count);
    add("Readerboard", state.gates.count);

    // Kühlschränke – keine BOM, nur Hinweis
    if (state.fridges.enabled === "yes" && state.fridges.count > 0) {
        add("Getränkekühlschrank mit Bezahlsystem – HINWEIS", state.fridges.count, "Integration in Vorbereitung");
    }

    // Zentrale Räume (pro Raum)
    add("Elektronikgehäuse – Mainboard (zentral)", state.centralRooms.count);
    add("Mainboard ohne IO‑Board", state.centralRooms.count);

    return rows;
}