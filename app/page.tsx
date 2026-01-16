'use client';

import {
  Activity,
  AlertTriangle,
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
import ScenarioGrid from '@/components/utilities/scenario-grid';

import WhitepaperTeaser from '@/components/utilities/whitepaper-teaser';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* 1. Hero Header Section */}
      <HeroSection
        title="Digitale Zutritts- und Maschinenfreigabe"
        description={
          <>
            <p className="mb-4 text-lg font-medium">
              Für Unternehmenswerkstätten, Hochschulen, Makerspaces und private Werkstätten.
            </p>
            <p>
              mardu.space ersetzt Schlüssel und Listen durch ein konsistentes Berechtigungsmodell
              für Räume und Maschinen – skalierbar von der privaten Werkstatt bis zum Campus oder
              Produktionsstandort.
            </p>
          </>
        }
        buttonText="Jetzt Demo vereinbaren"
        imageSrc="/_A7_9072_quer.jpg"
        imageAlt="mardu.space System in einer Werkstatt"
      />

      {/* 2. Management Summary */}
      <SplitContent
        className="text-white"
        title="Management Summary"
        description={
          <>
            <p>
              In Unternehmenswerkstätten, Hochschulen und Makerspaces treffen wechselnde Rollen auf
              Bereiche mit erhöhtem Gefahrenpotenzial. Sicherheits- und Compliance-Lücken entstehen
              oft nicht durch fehlende Regeln, sondern durch mangelnde Durchsetzung.
            </p>
            <p>
              mardu.space verknüpft Türzugang und Maschinenfreigabe in einem System. Berechtigungen
              werden rollenbasiert und zeitlich definiert. Maschinen lassen sich so steuern, dass
              eine Bedienung nur mit gültiger Qualifikation möglich ist.
            </p>
            <p>
              Ereignisprotokolle unterstützen die Vorfallklärung und den Nachweis, dass
              organisatorische Vorgaben umgesetzt sind.
            </p>
          </>
        }
        sideTitle="Mehrwert aus Betreibersicht"
        sideIcon={CheckCircle}
        items={[
          {
            title: 'Sicherheit & Nachvollziehbarkeit',
            description:
              'Personenbezogene, zeitlich definierte Berechtigungen und lückenlose Ereignisprotokolle.',
            icon: ShieldCheck,
          },
          {
            title: 'Reduzierter Verwaltungsaufwand',
            description:
              'Digitale Vergabe, Anpassung und sofortiger Entzug von Rechten ohne Schlüsselmanagement.',
            icon: Settings,
          },
          {
            title: 'Flexibler Betrieb',
            description:
              'Lokal oder zentral administrierbar, passend zu Ihrer Infrastruktur und IT-Vorgaben.',
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
                  <span>Einweisungen oft nicht gekoppelt</span>
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
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full -mt-6 mb-20">
        <div className="border-l-4 border-yellow-400 bg-yellow-50/50 p-8 rounded-r-2xl shadow-sm">
          <h3 className="font-bold text-yellow-800 flex items-center gap-3 mb-3 text-lg">
            <AlertTriangle className="w-6 h-6" />
            Konkrete Probleme
          </h3>
          <p className="text-yellow-900/80 leading-relaxed">
            Schlüsselweitergabe ist schwer kontrollierbar. Einweisungen sind oft nicht mit der
            technischen Freigabe gekoppelt. Es herrscht Unklarheit darüber, wer wann welche Maschine
            genutzt hat. Unternehmen müssen Audit- und Nachweispflichten erfüllen.
          </p>
        </div>
      </div>

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
                description: 'Regeln nach Zeit, Wochentag & Feiertag.',
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
                description: 'IP500-Mesh-Netzwerke via MQTT & LAN/WLAN.',
              },
            ],
          },
          {
            title: 'Monitoring',
            icon: Activity,
            features: [
              { label: 'Access Logs', description: 'Wer, Wann, Wo, Ergebnis.' },
              {
                label: 'Reason Codes',
                description: 'Details bei Ablehnung (z.B. "Qualifikation fehlt").',
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
              { label: 'API-First', description: 'REST-API mit OpenAPI-Spezifikation.' },
              {
                label: 'Kryptografie',
                description: 'Ende-zu-Ende (AES, ECDSA, TLS/DTLS).',
              },
              {
                label: 'Container-basiert',
                description: 'Docker für Edge (Raspberry Pi) oder Server.',
              },
            ],
          },
        ]}
      />

      {/* 5. Einsatzszenarien */}
      <ScenarioGrid
        title="Einsatzszenarien"
        leftTitle="Funktionsblöcke"
        leftBlocks={[
          {
            title: 'Benutzer & Rollen',
            description:
              'Rollen (Mitglied, Trainer, EHS, Gast) definieren. Rechte sofort zuweisen oder entziehen. Identifikationsmittel (Karte, Chip, App) zuordnen.',
          },
          {
            title: 'Maschinenfreigabe',
            description:
              'Maschinen einzeln oder als Gruppen verwalten. Qualifikation als zwingende Voraussetzung für die technische Freigabe (Strom/Logik).',
          },
          {
            title: 'Zutritt & Zonen',
            description:
              'Türen zu Zonen zusammenfassen (Holz, Metall, Chemie). Zeitfenster für Schichtbetrieb oder Kurse abbilden.',
          },
        ]}
        rightHighlights={[
          {
            title: 'Gebäude- & Bereichszutritt',
            description:
              'Geregelter Zutritt statt Schlüsseltresor. Zonensteuerung für Werkstattbereiche, Lager und Rüstbereiche.',
          },
          {
            title: 'Unternehmensspezifisch',
            description:
              'Ausbildungswerkstatt (Trennung nach Stand), Instandhaltung (Zeitfenster), Fremdfirmen (zweckgebunden).',
          },
          {
            title: 'Prototyping & Labore',
            description: 'Projektbezogene Berechtigungen und optionale Kostenstellenlogik.',
          },
        ]}
      />

      {/* 6. Umsetzung & Praxis */}
      <ProcessSteps
        title="Umsetzung in der Praxis"
        steps={[
          {
            title: 'Analyse',
            description:
              'Welche Türen, Maschinen, Rollen und Zeitmodelle sind vorhanden? Welche Qualifikationen sind nötig?',
          },
          {
            title: 'Installation',
            description:
              'Anschluss der Endgeräte an Strom und Schaltpunkte. Integration in die Kommunikationsstruktur (Netzwerk/Mesh).',
          },
          {
            title: 'Konfiguration',
            description:
              'Einrichtung von Rollen, Zonen, Zeitfenstern und Maschinenrechten. Definition der Delegationslogik.',
          },
          {
            title: 'Betrieb & Übergabe',
            description:
              'Testbetrieb im Alltag. Festlegung von Verantwortlichkeiten, Supportprozessen und Eskalationswegen.',
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
                  mardu.space unterstützt die operative Umsetzung: Qualifikationen werden technische
                  Voraussetzung für Zutritt und Freigabe. Ereignisse werden nachvollziehbar
                  protokolliert.
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
                  Ereignisprotokolle sind personenbezogene Daten. Es gelten Zweckbindung und
                  Datenminimierung.
                </p>
                <p>
                  <strong>Empfohlene Governance:</strong> Zweck der Protokollierung klar definieren
                  (Sicherheit, Vorfallklärung), Zugriff restriktiv regeln, Löschfristen einhalten
                  und Transparenz gegenüber Nutzern sicherstellen.
                </p>
              </div>
            ),
          },
        ]}
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

      {/* Whitepaper Teaser */}
      <WhitepaperTeaser className="bg-muted/30" />

      {/* CTA Section */}
      <CTASection
        title="Sichere Werkstätten beginnen mit klaren Standards."
        description="Erfahren Sie, wie mardu.space Ihre Verantwortung technisch unterstützt und administrative Lasten reduziert."
        primaryButtonText="Beratung Vereinbaren"
        secondaryButtonText="Mehr zum System"
      />
    </main>
  );
}
