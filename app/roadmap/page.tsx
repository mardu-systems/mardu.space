import RoadmapTimeline, { RoadmapMilestone } from '@/components/utilities/roadmap-timeline';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap & Ausblick',
  description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
};

export default function RoadmapPage() {
  const items: RoadmapMilestone[] = [
    {
      title: 'Phase 1: Erweiterte Maschinensteuerung & Logik',
      time: 'Q2 2026',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Erweiterte Regel-Engine:</strong> Implementierung komplexer
                Freigabe-Szenarien, wie z.B. das "Vier-Augen-Prinzip" (Freigabe nur durch zwei
                autorisierte Personen).
              </li>
              <li>
                <strong>First Run Wizard:</strong> Ein web-basierter Einrichtungsassistent führt durch die Erstinstallation
                (Datenbank, Admin-User), um die Inbetriebnahme ohne Konfigurationsdateien zu
                ermöglichen. Einrichtung ohne Hilfe von mardu.
              </li>
              <li>
                <strong>Qualifikations-Management:</strong> Tiefere Integration von Zertifikaten und
                Unterweisungen mit automatischem Ablaufdatum und Benachrichtigungen.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Phase 2: User Experience & Self-Service',
      time: 'Q2-3 2026',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Dynamische Konfigurations-UI:</strong> Administratoren können
                Systemeinstellungen direkt über die Weboberfläche anpassen, ohne Neustarts oder Serverzugriff.
              </li>
              <li>
                <strong>Interlock-Zwang:</strong> Technische Kopplung von Maschinenbedingungen, z.B. "Maschine
                startet nur, wenn die Absaugung aktiv ist" oder "Kühlmittel läuft".
              </li>
              <li>
                <strong>Self-Onboarding:</strong> Neue Nutzer können sich selbst registrieren und Freigaben
                beantragen, die durch Administratoren genehmigt werden (Approval-Flow).
              </li>
              <li>
                <strong>Energie-Monitoring:</strong> Erfassung und Auswertung von Verbrauchsdaten
                direkt an den Maschinen zur Optimierung der Energiekosten.
              </li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Phase 3: Ökosystem & Integration',
      time: 'Q3 2026 - Q2 2027',
      cards: [
        {
          description: (
            <ul className="space-y-3">
              <li>
                <strong>Plugin-Marktplatz:</strong> Module von Drittanbietern für Raumbuchung,
                Bezahlsysteme oder LMS (Moodle, ILIAS, Uni-Now).
              </li>
              <li>
                <strong>Hardware-backed Keystore:</strong> Unterstützung spezieller Sicherheits-Chips
                für maximalen Schutzbedarf.
              </li>
            </ul>
          ),
        },
      ],
    },
  ];

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="sr-only">Roadmap & Ausblick</h1>
        <RoadmapTimeline
          title="Roadmap und Ausblick"
          items={items}
        />
      </section>
    </main>
  );
}
