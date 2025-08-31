"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRef} from "react";
import CircleNumber from "@/components/circle-number";
import DashedConnector from "@/components/dashed-connector";
import Link from "next/link";

/* ===================== Seite ===================== */

export default function HomePage() {
    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <main className="relative min-h-screen bg-background text-foreground">
            {/* Hero */}
            <section className="relative w-full h-[calc(100vh-8rem)]" data-theme="dark" style={{colorScheme: "dark"}}>
                <Image src="/_A7_9072_quer.jpg" alt="Zugriffskontrollsysteme im Makerspace" fill priority sizes="100vw"
                       className="object-cover"/>
                <div className="absolute inset-0 bg-black/50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Zugriffskontrollsysteme für Makerspaces, FabLabs und Schülerlabore
                        </h1>
                        <p className="text-lg sm:text-xl text-foreground/90 mb-8 leading-relaxed">
                            Entdecke in wenigen Schritten, welche Lösungen dein Space wirklich braucht.
                        </p>
                        <Link href="/configurator">
                            <Button size="lg"
                                    className="px-8 md:px-12 md:py-8 text-xl md:text-4xl font-futura-bold tracking-wider uppercase bg-accent hover:bg-accent/90 text-accent-foreground rounded-full cursor-pointer">
                                Konfigurator starten
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative w-full">
                <div className="flex items-end justify-center">
                    <div className="text-center">
                        <h2
                            className="uppercase font-futura-heavy text-[clamp(20px,4vw,80px)] text-primary md:leading-[0.9] animate-in fade-in slide-in-from-bottom-4 duration-700 pt-11">
                            Warum brauchst du Mardu.space?
                        </h2>
                    </div>
                </div>
            </section>

            <section id="info"
                     className="relative w-full py-14 md:py-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-8">
                    {/* 1–Spalte mobil, 2–Spalten ab md */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 md:gap-x-12 items-center">

                        {/* Linke Seite: Warnsymbol */}
                        <div className="order-2 md:order-1 flex items-center justify-center">
                            <Image
                                src="/landing/warning.svg"
                                alt="Warnsymbol Verletzungsgefahr"
                                width={1200}
                                height={1200}
                                sizes="(min-width: 768px) 32rem, 80vw"
                                className="w-1/2 h-auto md:w-full md:max-w-2xl drop-shadow-2xl"
                                loading="lazy"
                            />
                        </div>

                        {/* Rechte Seite: Wortwolke + Text */}
                        <div className="order-1 md:order-2 flex flex-col items-center md:items-start gap-8 md:gap-6">
                            {/* Wortwolke */}
                            <div className="flex justify-center md:translate-y-[-20%] md:translate-x-[-18%]">
                                <Image
                                    src="/landing/words.svg"
                                    alt="Wortwolke zu Themen wie Sicherheit, Verantwortung, Zutritt"
                                    width={1000}
                                    height={1000}
                                    sizes="(min-width: 768px) 36rem, 90vw"
                                    className="w-[clamp(260px,86vw,540px)] h-auto "
                                    loading="lazy"
                                />
                            </div>

                            {/* Fließtext – ein Block für alle Breakpoints */}
                            <div
                                className="font-futura-normal space-y-4 leading-snug text-[15px] sm:text-base md:text-lg max-w-prose text-center md:text-left">
                                <p>
                                    Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen aber auch Risiken
                                    durch
                                    leistungsstarke Maschinen mit sich. Besonders beim Zugang für Minderjährige ist
                                    klare
                                    Verantwortung gefragt.
                                </p>
                                <p>
                                    Das mardu.space System sorgt mit eigener Hard- und Software sowie einer europaweit
                                    anerkannten Kenntnisdatenbank (Open Education Badges) für sichere Zutritts- und
                                    Zugriffskontrollen. So werden nur geschulte Nutzer freigeschaltet – und ihre
                                    Qualifikationen lassen sich standortübergreifend einsetzen.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <div ref={timelineRef} className="relative">
                <DashedConnector rootRef={timelineRef} offsetBeforePoint={50} strokeWidth={5}/>
                <section className="w-full py-8 md:py-10 z-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                            <div className="col-span-2 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person.svg"
                                    alt="Person"
                                    width={192}
                                    height={192}
                                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            <div className="col-span-7 md:col-span-4">
                                <div
                                    className="font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                                    <p>
                                        Jochen macht bei Harald einen Schweißkurs. Dieser findet in seinem heimischen
                                        Makerspace statt.
                                    </p>
                                    <p className="mt-4">
                                        Harald ist ein im Ruhestand befindlicher professioneller Schweißer, der sein
                                        Wissen
                                        und seine Erfahrung
                                        als Ausbilder im Makerspace gerne weitergibt.
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-3 md:col-span-2 flex justify-top">
                                <CircleNumber number={1} className="mt-1" anchor/>
                            </div>

                            <div className="col-span-12 md:col-span-4 md:col-start-9 md:translate-y-[-40%] text-right">
                                <h2 className="font-futura-heavy text-primary whitespace-pre-line uppercase text-3xl sm:text-4xl md:text-6xl text-right">
                                    {`WIE KANN
                                    MARDU.SPACE
                                    DIR HELFEN?`}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-10 md:py-14 z-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                            <div className="col-span-2 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person_happy.svg"
                                    alt="Person freut sich"
                                    width={192}
                                    height={192}
                                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            <div className="col-span-10 md:col-span-3">
                                <div
                                    className="font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                                    <p>
                                        Jochen hat erfolgreich an dem Schweißkurs teilgenommen und weiß nun, welche
                                        Gefahren
                                        von einem
                                        Schweißgerät ausgehen und wie man dieses fachgerecht verwendet.
                                    </p>
                                    <p className="mt-4">
                                        Harald hat ihm dafür das Open-Educational-Badge „Kenntnisse im Schweißen“
                                        digital
                                        verliehen.
                                    </p>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-2 flex justify-center md:justify-start">
                                <CircleNumber number={2} className="mt-1" anchor/>
                            </div>

                            <div className="col-span-12 md:col-span-4">
                                <div className="space-y-2">
                                    <Image src="/landing/HaraldundJochen.jpg" alt="Harald zeigt Jochen das Schweißen"
                                           width={1200}
                                           height={1200} className="w-full h-auto drop-shadow-2xl" loading="lazy"/>
                                    <p className="font-futura-normal mt-3 text-center md:text-left text-xl leading-snug">
                                        Wissensweitergabe durch Kurse
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full pt-6 md:pt-8 z-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                            <div className="col-span-12 md:col-span-6 flex flex-col items-center md:items-start">
                                <div
                                    className="w-full max-w-[720px] rounded-xl border border-primary/30 shadow-[0_10px_40px_color-mix(in_oklch,var(--primary)_15%,transparent)] overflow-hidden">
                                    <Image
                                        src="/landing/open_badge.png"
                                        alt="Badge erstellen – Webplattform Open Educational Badges"
                                        width={1440}
                                        height={890}
                                        className="w-full h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                <p className="font-futura-normal mt-3 text-center md:text-left text-xl leading-snug">
                                    <span className="block">Webplattform Open Educational Badges</span>
                                    <span className="block text-zinc-600">Zur Ausstellung der Berechtigungen</span>
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-6 grid grid-rows-[auto_auto_1fr]">
                                <div className="flex items-start gap-4">
                                    <CircleNumber number={3} className="mt-1 shrink-0" anchor/>
                                    <div
                                        className="mt-4 max-w-[40ch] font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                                        <p>Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen.</p>
                                        <p className="mt-4">
                                            Hierzu authentifiziert er sich an dem <span
                                            className="whitespace-nowrap">mardu.space</span> Gerät,
                                            welches dem Schweißgerät vorgeschaltet ist.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative mt-6 md:-mt-20 md:mb-[-16px] flex items-end justify-end">
                                    <Image
                                        src="/landing/person_schweiss_nfc.svg"
                                        alt="Illustration einer Person, die sich per NFC am Gerät authentifiziert"
                                        width={1100}
                                        height={900}
                                        className="w-[88%] md:w-[84%] h-auto object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full z-20 md:-mt-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="w-full md:w-4/6">
                            <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">

                                {/* LINKS: Icon/Illustration */}
                                <div className="col-span-3 md:col-span-2 flex justify-center md:justify-start">
                                    <Image
                                        src="/landing/mesh.png"
                                        alt="Illustration eines Funknetzwerks"
                                        width={220}
                                        height={220}
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                {/* MITTE: Text */}
                                <div className="col-span-7 md:col-span-7">
                                    <p className="font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em]">
                                        Alle Geräte von <span className="whitespace-nowrap">mardu.space</span> in einem
                                        Gebäude sind untereinander funkvernetzt, um höchste Ausfallsicherheit zu
                                        gewährleisten.
                                        Dadurch erreicht jede Anfrage immer ihr Ziel.
                                    </p>
                                </div>

                                {/* RECHTS: Nummer-Kreis */}
                                <div className="col-span-2 flex justify-center md:justify-start">
                                    <CircleNumber number={4} className="mt-1 shrink-0" anchor/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full z-20 -mt-8 md:-mt-12">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                            <div className="col-span-11 md:col-span-6 relative">
                                <Image
                                    src="/landing/open_badge_mardu_cloud.svg"
                                    alt="Open Educational Badges – Cloud / Gateway"
                                    width={1200}
                                    height={900}
                                    className="w-full max-w-[600px] h-auto object-contain"
                                    loading="lazy"
                                />

                                <div
                                    className="md:absolute relative font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em] flex items-start gap-4 max-w-[280px] md:max-w-[340px] md:left-[45%] md:bottom-[7%] mt-6 md:mt-0 pointer-events-none">
                                    <div className="flex-1">
                                        <p>
                                            Das Gateway von <span
                                            className="whitespace-nowrap">mardu.space</span> empfängt die
                                            Daten und fragt bei Open Education Badges an, ob die erforderlichen
                                            Kenntnisse vorliegen.
                                        </p>
                                        <p className="mt-4">
                                            Ein Offline-Cache sorgt für einen Betrieb auch bei einem Internetausfall.
                                        </p>
                                    </div>
                                    <CircleNumber number={5} className="shrink-0 translate-y-[100%] translate-x-[20%]"
                                                  anchor/>
                                </div>
                            </div>

                            {/* RECHTS: Gerät-Kachel + Caption */}
                            <figure
                                className="col-span-12 md:col-span-5 flex flex-col items-center md:items-end md:self-end">
                                <Image
                                    src="/landing/blende.svg"
                                    alt="mardu.space Gerät zur Freischaltung der Maschinen"
                                    width={1200}
                                    height={1200}
                                    className="w-[82%] md:w-[88%] lg:w-[80%] h-auto object-contain rounded-2xl drop-shadow-xl"
                                    loading="lazy"
                                />
                                <figcaption
                                    className="font-futura-normal mt-3 text-center md:text-left text-xl leading-snug">
                                    Gerät zur Freischaltung der Maschinen
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>
                <section className="w-full py-10 md:py-14 z-20">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">

                            {/* LINKS: Illustration Person + Schweißgerät */}
                            <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person_schweiss.svg"
                                    alt="Jochen schweißt mit freigeschaltetem Gerät"
                                    width={1000}
                                    height={800}
                                    className="w-[90%] md:w-full max-w-[580px] h-auto object-contain z-20"
                                    loading="lazy"
                                />
                            </div>

                            {/* RECHTS: Kreisnummer + Text */}
                            <div className="col-span-12 md:col-span-6 flex items-start gap-4">
                                <CircleNumber number={6} className="mt-1 shrink-0 " anchor/>
                                <div
                                    className="font-futura-normal text-accent text-sm sm:text-base leading-snug tracking-[0.005em] max-w-[56ch]">
                                    <p>
                                        Da die Berechtigung vorliegt, schaltet das <span
                                        className="whitespace-nowrap">mardu.space</span> Gerät
                                        den Strom für das Schweißgerät frei und Jochen kann seinen Wohnzimmertisch
                                        zusammenschweißen.<sup>*</sup>
                                    </p>
                                    <p className="mt-4">
                                        Dank des Kurses von Harald weiß er auch, wie man den Verzug beim Schweißen
                                        gering hält.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <section id="foerderung" className="w-full py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">

                        <header className="mb-8">
                            <h2 className="font-futura-heavy text-lg md:text-xl">Gefördert durch:</h2>
                        </header>

                        {/* Logos in einer Reihe */}
                        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">

                            {/* BMWK */}
                            <a
                                href="https://www.bmwk.de/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block w-40 md:w-48"
                            >
                                <Image
                                    src="/logos/bmwk.svg"
                                    alt="Bundesministerium für Wirtschaft und Klimaschutz"
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </a>

                            {/* EU / ESF Plus */}
                            <a
                                href="https://www.esf.de/portal/DE/ESF-Plus-2021-2027/Liste-der-Vorhaben/inhalt.html"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block w-40 md:w-48"
                            >
                                <Image
                                    src="/logos/eu_esf.svg"
                                    alt="Europäische Union – Europäischer Sozialfonds Plus (ESF Plus)"
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </a>

                            {/* EXIST */}
                            <a
                                href="https://www.exist.de/"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="block w-40 md:w-48"
                            >
                                <Image
                                    src="/logos/exist.svg"
                                    alt="EXIST – Existenzgründungen aus der Wissenschaft"
                                    width={400}
                                    height={200}
                                    className="w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </a>
                        </div>

                        {/* Förderhinweis-Text */}
                        <p className="font-futura-normal mt-10 text-sm md:text-base leading-snug text-muted-foreground max-w-4xl text-center mx-auto">
                            Die Europäische Union fördert zusammen mit dem Bundesministerium für Wirtschaft und
                            Klimaschutz
                            über den Europäischen Sozialfonds Plus (ESF Plus) das Programm <em>Existenzgründungen aus
                            der
                            Wissenschaft (EXIST)</em> in Deutschland.
                        </p>
                    </div>
                </section>
            </div>
            <small
                className="font-futura-normal block mt-6 text-center text-xs text-muted-foreground"
            >
                * Schweißen in Wohnräumen ist nicht empfohlen. Nutze eine geeignete Werkstatt
                mit ausreichender Belüftung.
            </small>
        </main>
    );
}
