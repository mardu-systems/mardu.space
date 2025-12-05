'use client';

import Image from 'next/image';
import { useState } from 'react';
import ProductShowcase from '@/features/product/product-showcase';
import FeatureList from '@/features/product/feature-list';
import { Building, Monitor, Shield, Wifi } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Faq from '@/components/faq';
import { faqItems } from '@/data/faq-items';
import HeroSection from '@/components/layout/hero-section';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

function SystemPageContent() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    setLoading(true);
    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Request failed');
      toast.success('Danke! Vormerkung erfolgreich.');
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Etwas ist schiefgelaufen. Versuch es erneut.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section id="products" className="scroll-mt-24">
        {/*
                Texte für den Zugriffspunkt
                Der Zugriffspunkt [ˈtsuːɡrɪfsˌpʊŋkt] liest die Schlüsselkarten der Benutzer und fragt die Berechtigung bei dem Gateway an.

                Für jede freischaltbare Strombetriebene Maschine wird ein Zutrittspunkt benötigt.
                Ein Zutrittspunkt besteht aus einem Lesegerät und einem Schützgerät.
                Das Schütz schaltet den Strom für Maschinen mit bis zu 3 Phasen und 32A frei.
                Das Lesegerät liest NFC Schlüsselkarten und kommuniziert über Funk mit dem Gateway
                Alle Lesegeräte und das Gateway sind über Funk untereinander vermascht um höchste ausfallsicherheit zu gewährleisten
                */}
        <ProductShowcase
          variant={1}
          leftImageSrc="/_A7_9072_quer.jpg"
          leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
          topMiddleImageSrc="/device/tor-2.jpg"
          topMiddleImageAlt="Innenleben des Gateways"
          textImageSrc="/device/render.png"
          textImageAlt="Weboberfläche des Gateways"
          title="DER ZUGRIFFSPUNKT"
          description="Der Zugriffspunkt [ˈtsuːɡrɪfsˌpʊŋkt] kombiniert Lesegerät und Schützmodul. Er liest die Schlüsselkarten der Nutzer, fragt beim Gateway die Berechtigung an und schaltet Maschinen zuverlässig frei."
          price="TBA"
          priceNote="Preis wird noch bekannt gegeben"
          ctaLabel="Vormerken"
          onCtaClick={() => setOpen(true)}
        >
          <>
            <FeatureList size="lg" columns={1}>
              <FeatureList.Item size="lg" icon={Shield}>
                Schützmodul schaltet Strom für Maschinen mit bis zu 32A / 3 Phasen sicher frei.
              </FeatureList.Item>
              <FeatureList.Item size="lg" icon={Wifi}>
                NFC-Lesegerät kommuniziert drahtlos mit dem Gateway im vermaschten Funknetz.
              </FeatureList.Item>
              <FeatureList.Item size="lg" icon={Monitor}>
                Vernetzte Zugriffspunkte sorgen für maximale Ausfallsicherheit.
              </FeatureList.Item>
            </FeatureList>
          </>
        </ProductShowcase>

        {/*
                Text für das Gateway
                Das Gateway [geɪtweɪ] empfängt die Zugriffsanfragen von den Readern und sendet die entsprechenden Berechtigungen zurück.

                Pro Gebäude wird ein Gateway benötigt, um das Lokale Funknetzwerk zu verwalten.
                Das Gateway fragt die Kenntnisse der nutzer bei Open Educational Badges.
                Alle Berechtigungen sind offline gecached um auch bei Internetausfall einen weiterbetrieb zu ermöglichen
                Für die genaue überwachung und Verwaltung gibt es ein modernes Webinterface


Das Produkt ist in kürze erhältlich, es handelt sich um einen Vorläufigen Preis
                */}
        <ProductShowcase
          variant={2}
          leftImageSrc="/gateway/mounted.jpg"
          leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
          topMiddleImageSrc="/gateway/inside.jpg"
          topMiddleImageAlt="Innenleben des Gateways"
          textImageSrc="/gateway/cutout.png"
          textImageAlt="Gateways Coutout"
          title="Das Gateway"
          description="Das Gateway [ˈɡeɪtweɪ] koordiniert das Funknetzwerk, prüft Zugriffsberechtigungen anhand der Open Badges und sendet Freigaben an die Zugriffspunkte."
          price="TBA"
          priceNote="Preis wird noch bekannt gegeben"
          ctaLabel="Vormerken"
          onCtaClick={() => setOpen(true)}
        >
          <FeatureList size="lg" columns={1}>
            <FeatureList.Item size="lg" icon={Building}>
              Pro Gebäude wird mindestens ein Gateway benötigt, um das lokale Funknetzwerk zu
              koordinieren.
            </FeatureList.Item>
            <FeatureList.Item size="lg" icon={Shield}>
              Prüft Berechtigungen anhand der Open Badges und sorgt für regelkonformen Zugang.
            </FeatureList.Item>
            <FeatureList.Item size="lg" icon={Wifi}>
              Offline-Caching aller Berechtigungen ermöglicht Betrieb auch bei Internetausfall.
            </FeatureList.Item>
            <FeatureList.Item size="lg" icon={Monitor}>
              Intuitives Webinterface zur Verwaltung, Überwachung und Auswertung.
            </FeatureList.Item>
          </FeatureList>
        </ProductShowcase>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Produkt vormerken</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? 'Sende...' : 'Absenden'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function Page() {
  return (
    <>
      <main>
        <HeroSection
          title="Das System"
          description={
            <>
              <p className="mb-4">
                Intelligente Zugriffskontrolle für Makerspaces – sicher, zuverlässig und einfach zu verwalten.
              </p>
              <p>
                Entdecken Sie unsere Hard- und Software-Lösung für maximale Sicherheit und Ausfallsicherheit in Ihrer Werkstatt.
              </p>
            </>
          }
          buttonText='Jetzt Demo vereinbaren'
          imageSrc="/gateway/mounted.jpg"
          imageAlt="Gateway und Zugriffspunkt in der Werkstatt"
        />
        <SystemPageContent />
        <section className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">FAQ</h2>
          <Faq items={faqItems} />
        </section>
      </main>
      <Toaster position="top-center" richColors />
    </>
  );
}
