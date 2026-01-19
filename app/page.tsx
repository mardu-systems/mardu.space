'use client';

import {
  Activity,
  Briefcase,
  CheckCircle,
  Cpu,
  Key,
  Lock,
  Server,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';

import HeroSection from '@/components/utilities/hero-section';
import CTASection from '@/components/utilities/cta-section';
import Foerderung from '@/components/utilities/foerderung';
import SplitContent from '@/components/utilities/split-content';
import CardGrid from '@/components/utilities/card-grid';
import InfoGrid from '@/components/utilities/info-grid';
import ProcessSteps from '@/components/utilities/process-steps';
import SecurityAccordion from '@/components/utilities/security-accordion';
import ConfiguratorTeaser from '@/components/utilities/configurator-teaser';

import WhitepaperTeaser from '@/components/utilities/whitepaper-teaser';
import ScenarioShowcase from '@/components/utilities/scenario-showcase';

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-background flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Zum Inhalt springen
      </a>
      {/* 1. Hero Header Section */}
      <HeroSection
        title="Digitale Zutritts- und Maschinenfreigabe"
        description={
          <>
            <p className="mb-4 text-lg font-medium">
              Für Unternehmenswerkstätten, Hochschulen, Makerspaces und private Werkstätten.
            </p>
            <p>
              mardu.space organisiert Zutritt, Maschinenfreigaben und Unterweisungen zuverlässig.
              Statt Schlüssel, Codes oder manueller Listen erhalten Betreiber ein konsistentes
              Berechtigungsmodell für Räume und Maschinen und technisch durchgesetzte Regeln.
            </p>
          </>
        }
        buttonText="Jetzt Demo vereinbaren"
        imageSrc="/_A7_9094_quer.jpg"
        imageAlt="mardu.space-System in einer Werkstatt"
      />

      {/* 2. Management Summary */}
      <SplitContent
        className="text-white"
        title="Das Wichtigste auf einen Blick"
        eyebrow="Kurzfassung"
        description={
          <>
            <p>
              In Unternehmenswerkstätten, Hochschulen und Makerspaces treffen wechselnde Rollen auf
              Bereiche mit erhöhtem Gefahrenpotenzial. Lücken entstehen selten durch fehlende
              Regeln, sondern durch fehlende technische Durchsetzung.
            </p>
            <p>
              mardu.space verbindet Türzugang, Maschinenfreigabe und Qualifikationen. Berechtigungen
              sind rollenbasiert und zeitlich gesteuert. Maschinen lassen sich so schalten, dass
              eine Bedienung nur mit gültiger Qualifikation möglich ist.
            </p>
            <p>
              Ereignisprotokolle liefern Nachweise für Vorfallklärung und Compliance, inklusive
              Zeitpunkt, Ort und Ergebnis.
            </p>
          </>
        }
        sideTitle="Mehrwert aus Betreibersicht"
        sideIcon={CheckCircle}
        items={[
          {
            title: 'Sicherheit & Nachvollziehbarkeit',
            description:
              'Personenbezogene, zeitlich definierte Berechtigungen und Ereignisprotokolle.',
            icon: ShieldCheck,
          },
          {
            title: 'Reduzierter Verwaltungsaufwand',
            description: 'Digitale Vergabe, Anpassung und Entzug von Rechten im Alltag.',
            icon: Settings,
          },
          {
            title: 'Flexibler Betrieb',
            description:
              'Lokal oder zentral, passend zu Infrastruktur, IT-Vorgaben und Verfügbarkeitsanforderungen.',
            icon: Server,
          },
        ]}
      />

      {/* 3. Ausgangslage & Herausforderungen */}
      <CardGrid
        title="Ausgangslage & Herausforderungen"
        variant="muted"
        items={[
          {
            title: 'Unternehmen & Hochschulen',
            description: (
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Zahlreiche Türen, Zonen & Maschinen</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Hohe Gefährdungspotenziale</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Strenge Nachweispflichten</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Diverse Nutzergruppen</span>
                </li>
              </ul>
            ),
            icon: Briefcase,
            className: 'bg-card',
          },
          {
            title: 'Makerspaces',
            description: (
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Wenig Personal, hohe Fluktuation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Maschinen mit hohem Risiko</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Einweisungen sind oft nicht gekoppelt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Unterschiedliche Schutzzonen</span>
                </li>
              </ul>
            ),
            icon: Users,
            className: 'bg-card',
          },
          {
            title: 'Private Werkstätten',
            description: (
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Fokus auf Komfort & Sicherheit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Schutz vor unbefugtem Zugriff</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Einfache Verwaltung gewünscht</span>
                </li>
              </ul>
            ),
            icon: Wrench,
            className: 'bg-card',
          },
        ]}
      />

      {/* Configurator Teaser */}
      <ConfiguratorTeaser />

      {/* 5. Einsatzszenarien */}
      <ScenarioShowcase
        eyebrow="Produkte"
        heading="Einsatzszenarien"
        subheading="Sichern Sie Türen, Tore und Maschinen – von Schuko‑Geräten (1‑phasig) bis zu Drehstrom‑Maschinen (3‑phasig)."
        features={[
          {
            id: 'doors',
            title: 'Türen & Zugangssysteme',
            description: 'Elektrische Türöffner und Zutrittspunkte sicher schalten.',
          },
          {
            id: 'gates',
            title: 'Tore & Schranken',
            description: 'Anbindung an Außen- und Einfahrtstore.',
          },
          {
            id: 'schuko',
            title: 'Schuko‑Maschinen (1‑phasig)',
            description: 'Freigabe für 230‑V‑Geräte und mobile Tools.',
          },
          {
            id: 'drehstrom',
            title: 'Drehstrom‑Maschinen (3‑phasig)',
            description: 'Für leistungsstarke Maschinen mit höherem Strombedarf.',
          },
          {
            id: 'central-release',
            title: 'Zentrale Freigabe',
            description: 'Aufsichtsschaltung für Räume und Anlagen.',
          },
          {
            id: 'credentials',
            title: 'Karte, Chip, App',
            description: 'Identifikation pro Nutzer und Gerät.',
          },
          {
            id: 'qualifications',
            title: 'Unterweisungen',
            description: 'Freigabe nur mit gültiger Qualifikation.',
          },
          {
            id: 'time-rules',
            title: 'Zeitsteuerung',
            description: 'Regeln nach Schicht, Kurs oder Feiertag.',
          },
          {
            id: 'audit-logs',
            title: 'Ereignisprotokolle',
            description: 'wer, wann, wo, Ergebnis — für Nachweise & Analyse.',
          },
          {
            id: 'integrations',
            title: 'API & Integrationen',
            description: 'REST/OpenAPI, Anbindung an bestehende Systeme.',
          },
          {
            id: 'emergency',
            title: 'Notfall-Modus',
            description: 'Definierte Ausnahmen für Einsatz-/Störfälle.',
          },
          {
            id: 'reporting',
            title: 'Reports & Export',
            description: 'Auswertungen für Betrieb, Compliance und Vorfälle.',
          },
        ]}
        scenarios={[
          {
            id: 'doors-gates',
            label: 'Türen & Tore',
            teaser:
              'Zutritt für Eingänge, Werkstatt- und Außentore – regelbasiert und nachvollziehbar.',
            imageSrc: '/configurator/tor.jpg',
            imageAlt: 'Elektrische Eingangstür',
            featureIds: [
              'doors',
              'gates',
              'credentials',
              'audit-logs',
              'reporting',
              'integrations',
              'emergency',
              'time-rules',
            ],
          },
          {
            id: 'schuko-machines',
            label: 'Schuko‑Maschinen (1‑phasig)',
            teaser:
              'Kleinere Maschinen und mobile Geräte sicher freigeben – flexibel und nachvollziehbar.',
            imageSrc: '/configurator/schuko.jpg',
            imageAlt: 'Schuko‑Stecker',
            featureIds: [
              'schuko',
              'qualifications',
              'time-rules',
              'audit-logs',
              'reporting',
              'credentials',
              'integrations',
              'emergency',
            ],
          },
          {
            id: 'drehstrom-machines',
            label: 'Drehstrom‑Maschinen (3‑phasig)',
            teaser:
              'Leistungsstarke Maschinen kontrolliert schalten – auch mit zentraler Freigabe.',
            imageSrc: '/configurator/32a.jpg',
            imageAlt: 'Drehstrom‑Stecker',
            featureIds: [
              'drehstrom',
              'central-release',
              'qualifications',
              'time-rules',
              'audit-logs',
              'reporting',
              'integrations',
              'emergency',
            ],
          },
        ]}
      />

      {/* 4. Spezifikation & Funktionsumfang */}
      <InfoGrid
        title="Spezifikation & Funktionsumfang"
        items={[
          {
            title: 'Identität & Zugang',
            icon: Key,
            features: [
              { label: 'RBAC', description: 'Granulare Rechte für Benutzer, Gruppen & Admins.' },
              {
                label: 'Auth',
                description: 'Passwortloser Login, Passkeys (FIDO2), NFC & App.',
              },
              {
                label: 'Zeitsteuerung',
                description: 'Regeln nach Zeit, Wochentagen und Feiertagen.',
              },
            ],
          },
          {
            title: 'Geräte & Maschinen',
            icon: Cpu,
            features: [
              {
                label: 'Sicheres Provisioning',
                description: 'Automatischer Schlüsselaustausch (ECC).',
              },
              {
                label: 'Maschinenfreigabe',
                description: 'Steuerung basierend auf Qualifikation.',
              },
              {
                label: 'Vernetzung',
                description: 'IP500 Mesh-Netzwerke via MQTT und LAN oder WLAN.',
              },
            ],
          },
          {
            title: 'Monitoring',
            icon: Activity,
            features: [
              { label: 'Access Logs', description: 'wer, wann, wo, Ergebnis.' },
              {
                label: 'Reason Codes',
                description: 'Details bei Ablehnung (z. B. "Qualifikation fehlt").',
              },
              {
                label: 'Audit Trail',
                description: 'Nachvollziehbarkeit aller Änderungen.',
              },
            ],
          },
          {
            title: 'System & Sicherheit',
            icon: Lock,
            features: [
              { label: 'API-first', description: 'REST-API mit OpenAPI-Spezifikation.' },
              {
                label: 'Kryptografie',
                description: 'Ende-zu-Ende (AES, ECDSA, TLS und DTLS).',
              },
              {
                label: 'Container-basiert',
                description: 'Docker für Edge (Raspberry Pi) oder Server.',
              },
            ],
          },
        ]}
      />

      {/* Whitepaper Teaser */}
      <WhitepaperTeaser />

      {/* 6. Umsetzung & Praxis */}
      <ProcessSteps
        title="Projektablauf"
        steps={[
          {
            title: 'Erstgespräch',
            description:
              'Zielsetzung, Umfang, Zonen, Maschinen, Rollen und Betriebsmodell werden gemeinsam geklärt.',
          },
          {
            title: 'Begehung oder Remote-Review',
            description:
              'Prüfung von Türen, Maschinen, Strom, Netzwerk, Identifikation und Sicherheitsanforderungen.',
          },
          {
            title: 'Angebot',
            description:
              'Transparente Positionen für Hardware, Montage, Inbetriebnahme, Schulung und optionalen Support.',
          },
          {
            title: 'Installation und Inbetriebnahme',
            description:
              'Montage der Komponenten, Systemkonfiguration, Tests im Alltag und Übergabe an Verantwortliche.',
          },
          {
            title: 'Pilot und Rollout',
            description:
              'Klein starten, Wirkung messen, Regeln nachschärfen und anschließend schrittweise erweitern.',
          },
        ]}
      />

      {/* 7. Sicherheit, Datenschutz & Normen */}
      <SecurityAccordion
        title="Sicherheit, Datenschutz & Normen"
        items={[
          {
            id: 'compliance-1',
            title: 'Arbeitsschutz & Nachweise (DGUV / TRBS)',
            content: (
              <div className="space-y-4">
                <p>
                  Unterweisungen müssen dokumentiert werden (DGUV Vorschrift 1). Für Arbeitsmittel
                  ist eine Gefährdungsbeurteilung Pflicht (TRBS 1111).
                </p>
                <p>
                  mardu.space unterstützt die operative Umsetzung: Qualifikationen werden zur
                  technischen Voraussetzung für Zutritt und Freigabe. Ereignisse werden
                  nachvollziehbar protokolliert.
                </p>
              </div>
            ),
          },
          {
            id: 'compliance-2',
            title: 'Maschinensicherheit & Schutzkonzepte',
            content: (
              <div className="space-y-4">
                <p>
                  Technische Zugangskontrolle ist Teil eines Schutzkonzepts (TRBS 1111). Für
                  Verriegelungen gelten Normen wie ISO 14119.
                </p>
                <p>
                  Das System unterstützt diese Konzepte durch flexible Sperrlogiken und
                  qualifikationsbasierte Freigaben.
                </p>
              </div>
            ),
          },
          {
            id: 'compliance-3',
            title: 'Datenschutz & Governance (DSGVO)',
            content: (
              <div className="space-y-4">
                <p>
                  Zutritts- und Nutzungsereignisse sind in der Regel personenbezogene Daten.
                  mardu.space setzt Privacy by Design um: Protokolle werden nur zu klar definierten
                  Zwecken geführt, insbesondere Betriebssicherheit, Vorfallklärung und
                  Nachweisführung.
                </p>
                <p>
                  Es gilt Datenminimierung: Es werden nur Ereignisse erfasst, die für diese Zwecke
                  erforderlich sind. Ergänzend unterstützt das System Löschkonzepte über
                  konfigurierbare Aufbewahrungsfristen für Logdaten, damit Retention-Policies
                  nachvollziehbar umgesetzt und an interne Vorgaben angepasst werden können.
                </p>
              </div>
            ),
          },
        ]}
      />

      {/* CTA Section */}
      <CTASection
        title="Sichere Werkstätten beginnen mit klaren Standards."
        description="Erfahren Sie, wie mardu.space Ihre Verantwortung technisch unterstützt und administrative Lasten reduziert."
        primaryButtonText="Newsletter abonnieren"
        secondaryButtonText="Mehr zum System"
      />

      <Foerderung
        items={[
          {
            href: 'https://www.bmwk.de/',
            src: '/logos/bmwk.svg',
            alt: 'Bundesministerium für Wirtschaft und Klimaschutz',
          },
          {
            href: 'https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Liste-der-Vorhaben/inhalt.html',
            src: '/logos/eu_esf.svg',
            alt: 'Europäische Union – Europäischer Sozialfonds Plus (ESF Plus)',
          },
          {
            href: 'https://www.exist.de/',
            src: '/logos/exist.svg',
            alt: 'EXIST – Existenzgründungen aus der Wissenschaft',
          },
        ]}
        description={
          <>
            Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und
            Klimaschutz über den Europäischen Sozialfonds Plus (ESF Plus) das Programm{' '}
            <em>Existenzgründungen aus der Wissenschaft (EXIST)</em> in Deutschland.
          </>
        }
      />
    </main>
  );
}
