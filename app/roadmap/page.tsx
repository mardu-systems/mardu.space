import type { Metadata } from 'next';
import CardGrid from '@/components/utilities/card-grid';

export const metadata: Metadata = {
  title: 'Roadmap & Ausblick',
  description: 'Unsere geplanten Features und Entwicklungsziele für mardu.space.',
};

export default function RoadmapPage() {
  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="sr-only">Roadmap & Ausblick</h1>
        <CardGrid
            title="Roadmap & Ausblick"
            variant="outline"
            items={[
            {
                title: 'Erweiterte Maschinensteuerung',
                badge: 'Q4 2025',
                description: '',
                list: [
                'Erweiterte Regel-Engine (z.B. Vier-Augen-Prinzip)',
                'Interlock-Zwang (z.B. Absaugung muss laufen)',
                'Qualifikations-Management mit Ablaufdatum',
                ],
                className: 'border-primary/20 bg-card',
            },
            {
                title: 'UX & Self-Service',
                description: '',
                list: [
                'First Run Wizard für einfache Einrichtung',
                'Dynamische Konfigurations-UI ohne Neustarts',
                'Self-Onboarding & Approval-Flows',
                ],
            },
            {
                title: 'Ökosystem (Langfristig)',
                description: '',
                list: [
                'Plugin-Marktplatz (LMS, Raumbuchung)',
                'Energie-Monitoring an Maschinen',
                'Hardware-backed Keystore',
                ],
            },
            ]}
        />
      </section>
    </main>
  );
}
