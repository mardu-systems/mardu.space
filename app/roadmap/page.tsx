import RoadmapTimeline, { RoadmapMilestone } from '@/components/utilities/roadmap-timeline';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roadmap & Ausblick',
  description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
};

export default function RoadmapPage() {
  const items: RoadmapMilestone[] = [
    {
      title: 'Erweiterte Maschinensteuerung',
      time: 'Q4 2025',
      cards: [
        {
          title: 'Geplante Erweiterungen',
          description: (
            <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
              <li>Erweiterte Regel Engine zum Beispiel Vier Augen Prinzip</li>
              <li>Interlock Zwang zum Beispiel Absaugung muss laufen</li>
              <li>Qualifikations Management mit Ablaufdatum</li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'UX und Self Service',
      time: 'Kurzfristig',
      cards: [
        {
          title: 'Ziel',
          description: (
            <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
              <li>First Run Wizard für einfache Einrichtung</li>
              <li>Dynamische Konfigurations UI ohne Neustarts</li>
              <li>Self Onboarding und Approval Flows</li>
            </ul>
          ),
        },
      ],
    },
    {
      title: 'Ökosystem',
      time: 'Langfristig',
      cards: [
        {
          title: 'Erweiterungen',
          description: (
            <ul className="space-y-2 list-disc list-inside text-sm md:text-base">
              <li>Plugin Marktplatz zum Beispiel LMS und Raumbuchung</li>
              <li>Energie Monitoring an Maschinen</li>
              <li>Hardware backed Keystore</li>
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
          compact
        />
      </section>
    </main>
  );
}
