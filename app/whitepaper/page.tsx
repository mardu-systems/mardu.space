import SiteShell from '@/components/layout/site-shell';
import WhitepaperSection from '@/components/utilities/whitepaper-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Whitepaper Download | Mardu',
  description: 'Laden Sie unser exklusives Whitepaper herunter und erhalten Sie wertvolle Einblicke in die Zukunft des Marktes.',
};

export default function WhitepaperPage() {
  return (
    <SiteShell>
      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Wissen, das Sie weiterbringt
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unsere Analysen und Strategien kompakt für Sie zusammengefasst. 
            Sichern Sie sich Ihren Wissensvorsprung.
          </p>
        </div>

        <WhitepaperSection 
          title="Whitepaper: Die Zukunft der Konfiguration"
          description="In diesem umfassenden Report beleuchten wir die Trends 2026, geben Handlungsempfehlungen für Hersteller und zeigen auf, wie visuelle Konfiguration den Vertrieb revolutioniert."
          benefits={[
            "Trendanalyse 2026: Was Kunden wirklich wollen",
            "ROI-Kalkulation: Visuelle Konfiguration vs. Standard-Katalog",
            "Best Practices: So optimieren Sie Ihre Conversion Rate",
            "Checkliste: Ist Ihr Produkt bereit für 3D?",
            "Exklusiver Einblick in kommende Mardu-Features"
          ]}
          // coverImageSrc="/path/to/image.jpg" // Optional: Add a real path if you have one later
        />
        
        <div className="max-w-3xl mx-auto mt-16 text-center px-4">
          <h3 className="text-lg font-semibold text-primary mb-2">Bereits für den Newsletter angemeldet?</h3>
          <p className="text-muted-foreground">
            Kein Problem! Geben Sie einfach erneut Ihre E-Mail-Adresse im Formular oben ein. 
            Unser System erkennt Sie und sendet Ihnen den aktuellen Download-Link direkt zu, 
            ohne dass Sie sich erneut bestätigen müssen.
          </p>
        </div>
      </div>
    </SiteShell>
  );
}
