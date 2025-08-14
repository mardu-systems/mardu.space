"use client";

import Image from "next/image";
import {motion} from "framer-motion";
import WavyLinePinnedScroller from "@/app/home/SquiggleLanding";
import {Button} from "@/components/ui/button";

const HEADER_HEIGHT = 80;

// Hinweis: Tailwind v4 Utilitys verwendet; Farbtöne gern zentral in tokens.
export default function Home() {
    return (
        <main className="relative min-h-screen">
            {/* === HERO: Vollflächiges Video/Foto im Hintergrund =====================
         TODO (Design):
         - Lege ein dunkles Overlay über das Hero-Bild/Video, ~40–60% (AA-Kontrast).
         - Typo-Hierarchie: Headline groß (clamp), Subline/CTA klarer Fokus.
         TODO (Copy aus PDF):
         - H1: „Zugriffskontrollsysteme für Makerspaces, FabLabs und Schülerlabore“
           -> Quelle: PDF, Startseite Headline.
         - CTA 1: „Was braucht dein Space?“ (scrollt zur Needs-Sektion)
         - CTA 2: „Zum Konfigurator“ (Link auf /konfigurator)
      ======================================================================= */}
            <section className="relative w-full h-[calc(100vh-5rem)]">
                <Image
                    src="/_A7_9072_quer.jpg"
                    alt="Hero Image"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* Hero Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Zugriffskontrollsysteme
                        </h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                            für Makerspaces, FabLabs und Schülerlabore
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="px-8 bg-[#CA452A] hover:bg-[#B23A21]">
                                WAS BRAUCHT DEIN SPACE?
                            </Button>
                        </div>
                    </div>
                </div>
            </section>




            {/* === PINNED WIGGLY LINE ===============================================
         MUSS: Einzige scrol­lende Entität. Inhalt links/rechts bleibt gepinnt,
         wechselt nur per Fade/Slide, wenn Steps passieren.
         TODO (Integration):
         - Falls möglich, Marker/Breakpoints an die 6 Story-Schritte + 2 Kapitel
           (WHY + NEEDS) koppeln. So ergeben sich insgesamt 8 "Stops".
         - Mobile: dünnere Linie, kleinere Amplitude; Desktop: wie unten.
      ======================================================================= */}
            <section
                id="hero"
                className="sticky top-0 h-screen grid place-items-center px-6"
                aria-label="Einführung"
            >
                <div className="max-w-3xl text-center md:text-left md:ml-[min(14vw,200px)] space-y-6">
                    <h1 className="text-balance text-4xl md:text-6xl font-medium">
                        {/* TODO: setze den PDF-Text hier rein */}
                        Zugriffskontrollsysteme für Makerspaces, FabLabs und Schülerlabore
                    </h1>
                    <p className="text-pretty text-base md:text-lg text-white/80">
                        {/* TODO: Kurz-Subline (1–2 Sätze), Nutzenversprechen (Sicherheit, Freigaben, OEB). */}
                    </p>
                    <div className="flex gap-3 justify-center md:justify-start">
                        {/* TODO: shadcn Button-Komponenten verwenden */}
                        <a href="#needs" className="rounded-2xl px-5 py-2.5 bg-white text-black">
                            Was braucht dein Space?
                        </a>
                        <a href="/konfigurator" className="rounded-2xl px-5 py-2.5 border border-white/40">
                            Zum Konfigurator
                        </a>
                    </div>
                </div>
            </section>

            {/* === SECTION: WHY (WARUM BRAUCHST DU MARDU.SPACE?) =====================
         Inhalte laut PDF:
         - Überschrift: „WARUM BRAUCHST DU MARDU.SPACE?“
         - Schlagwort-Wolke (Abrechnung, Sicherheit, Zutritt, Kurse, ...).
         - Absatz: Risiken leistungsstarker Maschinen / Verantwortung / Lösung
           via eigene Hard-/Software + Open Education Badges.
         TODO (Design):
         - Erzeuge eine animierte Tag-Cloud: Keywords rotieren/leuchten
           subtil (z-index unter der Copy), reagieren auf Scroll progress.
         - Copy-Block rechts/links der Linie; Linie bleibt bewegte Referenz.
         - A11y: Tags als dekorativ kennzeichnen (aria-hidden), Copy ist lesbar.
      ======================================================================= */}
            <section
                id="why"
                className="sticky top-0 h-screen grid place-items-center px-6"
                aria-labelledby="why-title"
            >
                <div className="relative max-w-5xl md:ml-[min(24vw,280px)]">
                    <h2 id="why-title" className="text-3xl md:text-5xl font-semibold">
                        WARUM BRAUCHST DU MARDU.SPACE?
                    </h2>

                    {/* TODO: Word-Cloud-Hintergrund (dekorativ) */}
                    <div className="pointer-events-none absolute -inset-x-6 -top-10 -bottom-10 opacity-25"
                         aria-hidden="true">
                        {/* Idee: Flex/Wrap Grid mit variablen Sizes + motion-opacity on scroll */}
                        {/* Begriffe aus dem PDF: Abrechnung, Verletzung, Sicherheit, Grauzone,
                Zutritt, Gewissen, Protokollierung, Aufsicht, Kurse,
                Maschinenfreigabe, Berechtigungen, Zerstörung, Verantwortung, Entlastung */}
                    </div>

                    <motion.p
                        className="mt-6 text-white/85 text-pretty leading-relaxed"
                        initial={{opacity: 0, y: 8}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{amount: 0.6, once: true}}
                    >
                        {/* TODO: 3–5 Sätze, Zusammenfassung aus PDF:
               - Makerspaces eröffnen Chancen, aber bergen Risiken bei Maschinen.
               - Klare Verantwortung, v. a. bei Minderjährigen.
               - mardu.space = Hard-/Software + OEB (europaweit anerkannt) →
                 nur geschulte Nutzer freigeschaltet; Qualifikationen standortübergreifend nutzbar. */}
                    </motion.p>
                </div>
            </section>

            {/* === SECTION: NEEDS (WAS BRAUCHT DEIN SPACE?) ==========================
         TODO (Design):
         - 3–4 interaktive "Need"-Cards (z. B. Zutritt, Maschinenfreigabe,
           Zeiterfassung, Abrechnung/Protokollierung). Hover hebt Card hervor,
           Linie "pulsiert" synchron (kleiner amplitude-bump).
         - Klick scrollt später in Produkt-/Konfiguratorfluss.
         - Inhalte können mit PDF-Keywords beschriftet werden.
      ======================================================================= */}
            <section
                id="needs"
                className="sticky top-0 h-screen grid place-items-center px-6"
                aria-labelledby="needs-title"
            >
                <div className="max-w-5xl md:ml-[min(24vw,280px)] space-y-6">
                    <h2 id="needs-title" className="text-3xl md:text-5xl font-semibold">
                        WAS BRAUCHT DEIN SPACE?
                    </h2>

                    {/* TODO: shadcn Cards in responsiver Grid, 2x2 auf Desktop */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Beispiele (Platzhalter): */}
                        <div className="rounded-2xl border border-white/15 p-5">
                            <h3 className="text-xl font-medium">Zutritt & Aufsicht</h3>
                            <p className="text-white/75 text-sm mt-2">
                                Alters- & Rollenbasierte Zutrittsregeln, Protokollierung.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 p-5">
                            <h3 className="text-xl font-medium">Maschinenfreigabe</h3>
                            <p className="text-white/75 text-sm mt-2">
                                Freischaltung nur für geschulte Nutzer (Open Education Badges).
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 p-5">
                            <h3 className="text-xl font-medium">Zeiterfassung</h3>
                            <p className="text-white/75 text-sm mt-2">
                                Nutzungszeiten erfassen – Basis für Abrechnung & Verantwortung.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-white/15 p-5">
                            <h3 className="text-xl font-medium">Abrechnung & Protokolle</h3>
                            <p className="text-white/75 text-sm mt-2">
                                Transparenz & Entlastung durch automatische Reports.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* === SECTION: STORYLINE 1–6 (WIE KANN MARDU.SPACE DIR HELFEN?) =========
         Inhalte laut PDF (jeweils als Step-Card neben der Linie):
         1) Kurs bei Harald → Wissensweitergabe
         2) Jochen erhält Badge „Kenntnisse im Schweißen“
         3) Auth am vorgeschalteten mardu.space Gerät
         4) Funkvernetzte Geräte, hohe Ausfallsicherheit
         5) Gateway prüft OEB; Offline-Cache ermöglicht Betrieb ohne Internet
         6) Berechtigung vorhanden → Stromfreigabe → Nutzung
         TODO (Design/UX):
         - Nutze position: sticky für die Step-Liste. Pro Scrollabschnitt genau
           EINE Card prominent (opacity 1, scale 1), andere 0.4/0.96.
         - Jede Card enthält: Step-Nummer, Kurzheadline, 1–2 Sätze, kleines Icon.
         - Optional: Mikroverbindungen (dotted lines) von Card zur Wellenlinie.
         - Mobile: einspaltig, größere Tapp-Zonen; Desktop: Cards alternierend
           links/rechts der Linie.
      ======================================================================= */}
            <section
                id="story"
                className="sticky top-0 h-screen px-6"
                aria-labelledby="story-title"
            >
                <div className="max-w-5xl md:ml-[min(24vw,280px)]">
                    <h2 id="story-title" className="sr-only">
                        Wie kann mardu.space dir helfen?
                    </h2>

                    <ol className="relative space-y-4">
                        {/* TODO: Ersetze Platzhaltertexte mit PDF-Copy (paraphrasiert) */}
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">1</div>
                            <h3 className="text-lg font-medium">Wissensweitergabe durch Kurse</h3>
                            <p className="text-white/80 mt-1">
                                Jochen belegt bei Harald einen Schweißkurs im Makerspace.
                            </p>
                        </li>
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">2</div>
                            <h3 className="text-lg font-medium">Open Education Badge</h3>
                            <p className="text-white/80 mt-1">
                                Nach Bestehen erhält Jochen das digitale Badge „Kenntnisse im Schweißen“.
                            </p>
                        </li>
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">3</div>
                            <h3 className="text-lg font-medium">Authentifizierung am Gerät</h3>
                            <p className="text-white/80 mt-1">
                                Vor der Maschine authentifiziert er sich am mardu.space Gerät.
                            </p>
                        </li>
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">4</div>
                            <h3 className="text-lg font-medium">Funkvernetzung & Ausfallsicherheit</h3>
                            <p className="text-white/80 mt-1">
                                Alle Geräte sind funkvernetzt – Anfragen erreichen zuverlässig ihr Ziel.
                            </p>
                        </li>
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">5</div>
                            <h3 className="text-lg font-medium">Gateway prüft OEB & Offline-Cache</h3>
                            <p className="text-white/80 mt-1">
                                Das Gateway validiert die Berechtigungen; Offline-Cache sichert den Betrieb.
                            </p>
                        </li>
                        <li className="rounded-2xl border border-white/15 p-5 backdrop-blur-sm">
                            <div className="text-sm opacity-70">6</div>
                            <h3 className="text-lg font-medium">Freigabe & Nutzung</h3>
                            <p className="text-white/80 mt-1">
                                Berechtigung liegt vor → Strom wird freigegeben → Arbeiten kann beginnen.
                            </p>
                        </li>
                    </ol>
                </div>
            </section>

            <div className="h-[30vh]" aria-hidden/>
            {/* Spacer fürs natürliche Scroll-Ende */}
        </main>
    );
}
