"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { State } from "../page";

type BomRow = { item: string; qty: number; note?: string };

export default function SummaryStep({ state }: { state: State }) {
  const bom = React.useMemo(() => computeBOM(state), [state]);
  const [open, setOpen] = React.useState(false);
  const totalCable2core =
    state.triMachines.count * state.triMachines.cablePerUnitM +
    state.schukoMachines.count * state.schukoMachines.cablePerUnitM;
  const totalCable12core =
    state.doors.count * state.doors.cablePerDoorM +
    state.gates.count * state.gates.cablePerGateM;

  return (
    <section className="grid xl:grid-cols-2 gap-6">
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-ink-600 mb-2">Zusammenfassung</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <Field label="Drehstrom‑Maschinen" value={`${state.triMachines.count}`} />
            <Field label="Schuko‑Maschinen" value={`${state.schukoMachines.count}`} />
            <Field label="Eingangstüren" value={`${state.doors.count}`} />
            <Field label="Elektrische Tore" value={`${state.gates.count}`} />
            <Field label="Kühlschränke (Status)" value={state.fridges.enabled} />
            {state.fridges.enabled === "yes" && (
              <Field label="Kühlschränke (Anzahl)" value={`${state.fridges.count}`} />
            )}
            <Field label="Zentrale Räume" value={`${state.centralRooms.count}`} />
            <Field label="Kontakt" value={`${state.contact.name} · ${state.contact.email}`} />
          </div>

          <div className="mt-4 text-xs text-ink-400">
            <p>
              Zweiadriges Kabel gesamt (ca.): <strong className="text-ink-600">{totalCable2core} m</strong>
            </p>
            <p>
              12‑adriges Kabel gesamt (ca.): <strong className="text-ink-600">{totalCable12core} m</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-ink-600">
                Stückliste (automatisch berechnet)
              </h3>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {open ? "Ausblenden" : "Anzeigen"}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <div className="divide-y">
                {bom.map((row) => (
                  <div
                    key={row.item}
                    className="py-2 flex items-start justify-between gap-4 text-sm"
                  >
                    <span className="text-ink-600">
                      {row.item}
                      {row.note ? (
                        <span className="text-ink-400"> · {row.note}</span>
                      ) : null}
                    </span>
                    <span className="font-semibold text-ink-700">{row.qty}</span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </section>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
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
    if (qty > 0) rows.push({ item, qty, note });
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
    add(
      "Getränkekühlschrank mit Bezahlsystem – HINWEIS",
      state.fridges.count,
      "Integration in Vorbereitung"
    );
  }

  // Zentrale Räume (pro Raum)
  add("Elektronikgehäuse – Mainboard (zentral)", state.centralRooms.count);
  add("Mainboard ohne IO‑Board", state.centralRooms.count);

  return rows;
}

