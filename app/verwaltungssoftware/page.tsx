import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  KeyRound,
  Network,
  ScanLine,
  UsersRound,
} from 'lucide-react';

import CTASection from '@/components/utilities/cta-section';
import MediaPlaceholder from '@/components/utilities/media-placeholder';
import SplitContent from '@/components/utilities/split-content';
import { Button } from '@/components/ui/button';
import { NoiseAuroraBackground } from '@/components/ui/noise-aurora';
import { Overline } from '@/components/ui/typography';
import {
  administrationCta,
  administrationGrowthPillars,
  administrationGrowthSignals,
  administrationHero,
  administrationStorySections,
  type AdministrationStorySectionDto,
} from '@/data/administration-page';

export const metadata: Metadata = {
  title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln',
  description:
    'Externe Marketing-Seite für die Verwaltungssoftware von mardu.space: weniger Verwaltungsaufwand, mehr Kontrolle und klarere Prozesse für Nutzer, Standorte und Zutritte.',
  alternates: {
    canonical: '/verwaltungssoftware',
  },
  openGraph: {
    title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln | mardu.space',
    description:
      'Die zentrale Verwaltungsapp für Nutzer, Zutrittspunkte, Gruppen und Tags. Für Entscheider, die Prozesse vereinfachen und skalierbar aufstellen wollen.',
    url: '/verwaltungssoftware',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verwaltungssoftware für Nutzer, Gruppen und Zutrittsregeln | mardu.space',
    description: 'Die zentrale Verwaltungsapp für Nutzer, Zutrittspunkte, Gruppen und Tags.',
  },
};

function SoftwareHeroVisual() {
  return (
    <div className="relative overflow-hidden border border-black/12 bg-card p-5 md:p-6">
      <NoiseAuroraBackground tone="indigo-amber" intensity="soft" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3 border border-white/40 bg-white/85 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-foreground/45">WebQ Admin</p>
            <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
              Zentrale Verwaltungsapp
            </p>
          </div>
          <div className="inline-flex items-center gap-2 border border-emerald-600/15 bg-emerald-500/8 px-3 py-1 text-xs text-emerald-800">
            <span className="h-2 w-2 rounded-full bg-emerald-600" />
            Strukturen verbunden
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center border border-black/10 bg-card">
                    <UsersRound className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Benutzerverwaltung</p>
                    <p className="text-xs text-foreground/55">Aktive Nutzer, Status und Gruppen</p>
                  </div>
                </div>
                <div className="text-right text-xs text-foreground/55">
                  <p>1.284 Nutzer</p>
                  <p>24 neue heute</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Anna Keller', meta: 'Standort Karlsruhe', tag: 'Produktion' },
                  { name: 'Murat Demir', meta: 'Externer Dienstleister', tag: 'Besuch' },
                  { name: 'Team Labor Nord', meta: 'Gruppenzuordnung aktiv', tag: 'Labor' },
                ].map((entry) => (
                  <div
                    key={entry.name}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border border-black/8 bg-card/70 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{entry.name}</p>
                      <p className="text-xs text-foreground/55">{entry.meta}</p>
                    </div>
                    <span className="border border-black/10 bg-background px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-foreground/58">
                      {entry.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <HeroSignalCard
                icon={Network}
                eyebrow="Integrationen"
                title="Verzeichnisdienste eingebunden"
                description="Bestehende Quellen bleiben Teil des Prozesses statt Parallelwelt."
              />
              <HeroSignalCard
                icon={KeyRound}
                eyebrow="Zutrittsregeln"
                title="Präzise statt pauschal"
                description="Person, Bereich und Zeitfenster lassen sich kombiniert steuern."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center border border-black/10 bg-card">
                  <BadgeCheck className="h-4 w-4 text-foreground/70" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Regelstatus</p>
                  <p className="text-xs text-foreground/55">Freigaben für Personen und Bereiche</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  ['Nutzergruppe Werkstatt', 'Zugang Gebäude A', 'Mo-Fr 06:00-22:00'],
                  ['Lehrstuhl Metall', 'Labor Nord', 'nur mit aktiver Qualifikation'],
                  ['Service-Team', 'Tor 3', 'zeitgesteuerte Freigabe'],
                ].map(([actor, target, rule]) => (
                  <div key={`${actor}-${target}`} className="border border-black/8 bg-card/70 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">{actor}</p>
                      <ArrowRight className="h-4 w-4 text-foreground/35" aria-hidden="true" />
                      <p className="text-sm text-foreground/72">{target}</p>
                    </div>
                    <p className="mt-2 text-xs text-foreground/55">{rule}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-black/10 bg-background/92 p-4">
              <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">
                Gruppen & Tags
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div className="border border-black/8 bg-card/70 p-3">
                  <p className="text-sm font-medium text-foreground">9 Nutzergruppen</p>
                  <p className="mt-1 text-xs text-foreground/55">
                    Regeln zentral statt pro Einzelfall.
                  </p>
                </div>
                <div className="border border-black/8 bg-card/70 p-3">
                  <p className="text-sm font-medium text-foreground">Tag-Ausgabe in 3 Schritten</p>
                  <p className="mt-1 text-xs text-foreground/55">Anlegen, zuordnen, bestätigen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSignalCard({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-black/10 bg-background/92 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center border border-black/10 bg-card">
          <Icon className="h-4 w-4 text-foreground/70" aria-hidden="true" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/50">{eyebrow}</p>
      </div>
      <p className="mt-3 text-sm font-semibold tracking-[-0.01em] text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-foreground/60">{description}</p>
    </div>
  );
}

function StoryVisual({ section }: { section: AdministrationStorySectionDto }) {
  switch (section.media.kind) {
    case 'user-management':
      return <UserManagementVisual section={section} />;
    case 'integration-flow':
      return <IntegrationFlowVisual section={section} />;
    case 'access-rules':
      return <AccessRulesVisual section={section} />;
    case 'group-management':
      return <GroupManagementVisual section={section} />;
    case 'tag-enrollment':
      return <TagEnrollmentVisual section={section} />;
    default:
      return (
        <MediaPlaceholder
          badge={section.media.badge}
          title={section.media.title}
          description={section.media.description}
          className="min-h-[22rem]"
          aspectRatioClassName="aspect-[6/5]"
        />
      );
  }
}

function VisualFrame({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border border-black/10 bg-card">
      <div className="absolute inset-0 bg-linear-to-br from-background via-card to-muted/30" />
      <div className="relative p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex border border-black/10 bg-background px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-foreground/50">
              {badge}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-foreground">
              {title}
            </h3>
            <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-foreground/66">
              {description}
            </p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

function UserManagementVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/benutzerverwaltung.png"
      alt="Benutzerverwaltung mit Benutzerliste, Aktivstatus und Tag-Zuweisungen"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function IntegrationFlowVisual({ section }: { section: AdministrationStorySectionDto }) {
  const sources = ['HR-System', 'Directory', 'Campus-IT'];
  const targets = ['WebQ Verwaltung', 'Gruppenlogik', 'Zutrittsregeln'];

  return (
    <VisualFrame
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
    >
      <div className="grid gap-4 lg:grid-cols-[0.9fr_auto_1.1fr] lg:items-center">
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source} className="border border-black/8 bg-background px-4 py-3">
              <p className="text-sm font-medium text-foreground">{source}</p>
              <p className="text-xs text-foreground/55">Bestehende Nutzerquelle</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background">
            <Network className="h-5 w-5 text-foreground/65" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-3">
          {targets.map((target) => (
            <div key={target} className="border border-black/8 bg-background px-4 py-3">
              <p className="text-sm font-medium text-foreground">{target}</p>
              <p className="text-xs text-foreground/55">
                Direkt in operative Verwaltungslogik übersetzt
              </p>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function AccessRulesVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/zugriffsprotokolle.png"
      alt="Zugriffsprotokolle mit Entscheidungen, Verläufen und Zutrittspunkten"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function GroupManagementVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <ProductScreenshot
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
      src="/verwaltungssoftware/zutrittspunkte-und-geraete.png"
      alt="Verwaltung der Zutrittspunkte und Geräte als strukturierte Grundlage für Gruppen und Regeln"
      sizes="(max-width: 1024px) 100vw, 48vw"
    />
  );
}

function ProductScreenshot({
  badge,
  title,
  description,
  src,
  alt,
  sizes,
}: {
  badge: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <VisualFrame badge={badge} title={title} description={description}>
      <div className="overflow-hidden border border-black/8 bg-black">
        <div className="relative aspect-[16/10] w-full">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        </div>
      </div>
    </VisualFrame>
  );
}

function TagEnrollmentVisual({ section }: { section: AdministrationStorySectionDto }) {
  return (
    <VisualFrame
      badge={section.media.badge}
      title={section.media.title}
      description={section.media.description}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ['01', 'Tag erfassen', 'Neuen Zugangstag scannen oder anlegen.'],
          ['02', 'Person zuweisen', 'Direkt im Kontext der Nutzerverwaltung verknüpfen.'],
          ['03', 'Freigabe prüfen', 'Regeln bestätigen und Ausgabe dokumentieren.'],
        ].map(([step, title, description]) => (
          <div key={step} className="border border-black/8 bg-background p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-foreground/45">
                Step {step}
              </span>
              <ScanLine className="h-4 w-4 text-foreground/40" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/62">{description}</p>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}

function StorySection({
  section,
  reverse = false,
}: {
  section: AdministrationStorySectionDto;
  reverse?: boolean;
}) {
  return (
    <section className="section-hairline">
      <div className="mardu-container py-20 md:py-24">
        <div
          className={`grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,1.05fr)] lg:items-center ${reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}
        >
          <div className="space-y-6">
            <Overline>{section.eyebrow}</Overline>
            <h2 className="headline-balance max-w-3xl text-[clamp(1.9rem,4vw,3.35rem)] leading-[1.02] tracking-[-0.03em] text-foreground">
              {section.title}
            </h2>
            <div className="max-w-[62ch] space-y-4 text-base leading-relaxed text-foreground/74 md:text-lg">
              {section.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t border-black/8 pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-foreground/48">
                {section.benefitTitle}
              </p>
              <div className="mt-4 space-y-4">
                {section.benefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-foreground/62"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground md:text-base">
                        {benefit.title}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/64 md:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <StoryVisual section={section} />
        </div>
      </div>
    </section>
  );
}

export default function VerwaltungsoftwarePage() {
  const growthItems = administrationGrowthPillars.map((pillar) => ({
    title: pillar.title,
    icon: pillar.icon,
    description: (
      <>
        <p>{pillar.description}</p>
        <p className="mt-2 text-foreground/56">{pillar.proof}</p>
      </>
    ),
  }));

  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-black/8 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,170,98,0.16),transparent_28%),radial-gradient(circle_at_100%_20%,rgba(71,95,255,0.12),transparent_28%)]" />
        <div className="mardu-container relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="space-y-7">
            <Overline>{administrationHero.overline}</Overline>
            <h1 className="headline-balance max-w-4xl text-[clamp(2.35rem,5vw,4.9rem)] leading-[0.95] tracking-[-0.03em] text-foreground">
              {administrationHero.title}
            </h1>
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-foreground/75 md:text-lg">
              {administrationHero.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={administrationHero.primaryCtaHref}>
                  {administrationHero.primaryCtaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={administrationHero.secondaryCtaHref}>
                  {administrationHero.secondaryCtaLabel}
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 border-t border-black/8 pt-6 sm:grid-cols-3">
              {administrationHero.keyFigures.map((figure) => (
                <div key={figure.label} className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/46">
                    {figure.label}
                  </p>
                  <p className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
                    {figure.value}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/62">{figure.description}</p>
                </div>
              ))}
            </div>
          </div>

          <SoftwareHeroVisual />
        </div>
      </section>

      {administrationStorySections.map((section, index) => (
        <StorySection key={section.id} section={section} reverse={index % 2 === 1} />
      ))}

      <section className="section-hairline">
        <div className="mardu-container py-20 md:py-24">
          <SplitContent
            eyebrow="Heute stark, morgen ausbaufähig"
            title="Eine Verwaltungssoftware, die mit Anforderungen wachsen kann, ohne heute zu viel zu versprechen"
            description={
              <>
                <p className="text-balance">
                  Die Seite soll Zukunft nicht als Vision verkaufen, sondern als strategische
                  Anschlussfähigkeit. Entscheidend ist, dass die Lösung schon heute Ordnung schafft
                  und gleichzeitig Raum für größere Strukturen lässt.
                </p>
                <p className="mt-5">
                  Wenn Integrationen, Automatisierung oder mehrere Standorte später wichtiger
                  werden, muss die Verwaltungsbasis diese Entwicklung sauber aufnehmen können.
                </p>
              </>
            }
            sideTitle="Worauf die Lösung vorbereitet ist"
            items={growthItems}
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {administrationGrowthSignals.map((signal) => {
              const Icon = signal.icon;

              return (
                <article key={signal.title} className="border border-black/10 bg-card p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center border border-black/10 bg-background">
                      <Icon className="h-5 w-5 text-foreground/70" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                      {signal.title}
                    </h3>
                  </div>
                  <p className="mt-5 text-sm leading-relaxed text-foreground/68 md:text-base">
                    {signal.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title={administrationCta.title}
        description={administrationCta.description}
        primaryButtonText={administrationCta.primaryButtonText}
        primaryButtonHref={administrationCta.primaryButtonHref}
        secondaryButtonText={administrationCta.secondaryButtonText}
        secondaryButtonHref={administrationCta.secondaryButtonHref}
      />
    </main>
  );
}
