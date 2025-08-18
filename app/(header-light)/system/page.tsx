"use client";

import Image from "next/image";
import {useMemo} from "react";
import clsx from "clsx";
import {Button} from "@/components/ui/button";
import {Building, Monitor, Shield, Wifi} from "lucide-react";

export type HeroProps = {
    leftSrc?: string;
    rightSrc?: string;
    leftAlt?: string;
    rightAlt?: string;
    heightClass?: string;
    stackOnMobile?: boolean;
    howItWorksHref?: string;
};

function HeroSystem({
                        leftSrc = "/_A7_8650.jpg",
                        rightSrc = "/_A7_9072_quer.jpg",
                        leftAlt = "Gateway – Zentrale Steuereinheit",
                        rightAlt = "Zutrittspunkt – Türmodul mit NFC",
                        heightClass = "h-[80vh] sm:h-[90vh] lg:h-[11/12]",
                        stackOnMobile = true,
                        howItWorksHref = "#so-funktionierts",
                    }: HeroProps) {
    const gridCols = useMemo(
        () => (stackOnMobile ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"),
        [stackOnMobile]
    );

    return (
        <main>
            <section
                className="relative w-full text-white"
                aria-labelledby="system-heading"
                role="region"
            >
                {/* Bild-Layer */}
                <div className={clsx("grid", gridCols, heightClass)}>
                    <div className="relative">
                        <Image
                            src={leftSrc}
                            alt={leftAlt}
                            role="img"
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover select-none"
                            draggable={false}
                            priority
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-black/40"/>
                    </div>
                    <div className="relative">
                        <Image
                            src={rightSrc}
                            alt={rightAlt}
                            role="img"
                            fill
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover select-none"
                            draggable={false}
                            priority
                        />
                        <div aria-hidden="true" className="absolute inset-0 bg-black/40"/>
                    </div>
                </div>

                {/* Headline + CTAs */}
                <div
                    className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4">
                    <h1
                        id="system-heading"
                        className="pointer-events-auto select-none text-balance text-center font-black"
                    >
                        <strong
                            className="
              bg-linear-to-r from-purple-500 to-purple-500
              bg-no-repeat
              bg-[length:96%_0.5em]
              bg-[position:0_95%]
              px-[10px]
              font-bold uppercase tracking-[0.3em]
              text-[clamp(22px,6vw,40px)] leading-[1.2]
              lg:text-[clamp(40px,6vw,80px)] lg:leading-[0.9]
            "
                        >
                            Das System
                        </strong>
                    </h1>

                    <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href={howItWorksHref}
                            aria-label="Mehr erfahren: So funktioniert das System"
                            className="inline-flex items-center rounded-md bg-white/10 px-6 py-4 sm:px-5 sm:py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            So funktioniert’s
                        </a>
                    </div>
                </div>

                {/* Linie */}
                {/* Vertikal ab md, horizontal auf Mobile */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    {/* Desktop: Vertikal */}
                    <div className="relative hidden h-full w-px md:block">
                        <div
                            className="absolute inset-0 origin-top rounded-full opacity-90 bg-gradient-to-b from-[#F133FF] via-[#7AFA27] to-[#FF7A11] animate-grow-y"/>
                    </div>
                    {/* Mobile: Horizontal */}
                    <div className="relative block h-px w-full md:hidden">
                        <div
                            className="absolute inset-0 origin-left rounded-full opacity-90 bg-gradient-to-r from-[#F133FF] via-[#7AFA27] to-[#FF7A11] animate-grow-x"/>
                    </div>
                </div>

                {/* Labels seitlich der Linie (nur Desktop, visuell) */}
                <div
                    className="pointer-events-none absolute left-1/2 -translate-x-[calc(100%+0.75rem)] text-right md:block top-[16%]"
                    aria-hidden="true"
                >
                    <strong className="px-[3px] font-bold uppercase text-[clamp(20px,4vw,64px)] leading-[0.9]">
                        Das Gateway
                    </strong>
                </div>

                <div
                    className="pointer-events-none absolute left-1/2 text-left md:block bottom-[12%]"
                    aria-hidden="true"
                >
                    <strong className="px-[3px] font-bold uppercase text-[clamp(20px,4vw,64px)] leading-[0.9]">
                        Der Zutrittspunkt
                    </strong>
                </div>
            </section>
            <GatewayFrame/>
        </main>
    );
}

/*
clip-path: polygon(0 0, 22% 0, 44% 100%, 0% 100%); Polygon Links
clip-path: polygon(22% 0, 33% 50%, 52% 0); Polygon Mitte
clip-path: polygon(75% 0, 100% 44%, 100% 0); Polygon Oben Rechts
 */
export function GatewayFrame() {
    return (
        <section className="relative mx-auto min-h-screen overflow-hidden">
            {/* ====== LAYER: Hintergrund-Fotos mit Clip-Paths ====== */}
            <div
                className="absolute inset-0 z-[1] [clip-path:polygon(53%_0,75%_0,100%_44%,100%_100%,44%_100%,33%_50%)]"/>


            {/* Links: großes Werkstattfoto – Polygon Links */}
            <div className="absolute inset-0 z-0 overflow-hidden [clip-path:polygon(0_0,22%_0,44%_100%,0%_100%)]">
                <Image
                    src="/_A7_8645.JPG"
                    alt="Gateway an zentraler Position in einer Werkstatt"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
            </div>

            {/* Mitte oben: Dashboard-Dreieck – Polygon Mitte */}
            <div className="absolute inset-0 z-10 overflow-hidden [clip-path:polygon(22%_0,33%_50%,52%_0)]">
                <Image
                    src="/_A7_8631.jpg"
                    alt="Verwaltungs-Webinterface"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 z-10 overflow-hidden [clip-path:polygon(75%_0,100%_44%,100%_0)]">
                <Image
                    src="/_A7_8631.jpg"
                    alt="Innenleben des Gateways"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="absolute inset-0 z-20 left-[33%] top-[10%] px-4 sm:px-6">
                <header className="mb-4 sm:mb-6 text-center translate-x-0 sm:translate-x-[-3%]">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-wide">
                        DAS GATEWAY
                    </h2>
                    <p className="mx-auto mt-2 sm:mt-4 max-w-[22ch] sm:max-w-[26ch] md:max-w-[30ch] lg:max-w-[34ch] xl:max-w-[60ch] text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-xl text-neutral-700">
                        Das Gateway [geɪtweɪ] empfängt die Zugriffsanfragen von den Readern und sendet die
                        entsprechenden Berechtigungen zurück.
                    </p>
                </header>

                <ul className="mx-auto mt-0 max-w-[80ch] space-y-3 sm:space-y-4 pl-5 text-lg sm:text-xl leading-relaxed list-none flex flex-col justify-center min-h-[50vh]">
                    <li className="flex items-center gap-3">
                        <Building className="h-6 w-6 text-[#5e3aa6] shrink-0"/>
                        <span>Pro Gebäude wird ein Gateway benötigt, um das lokale Funknetzwerk zu verwalten.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Shield className="h-6 w-6 text-[#5e3aa6] shrink-0"/>
                        <span>Das Gateway prüft die Kenntnisse der Nutzer über Open Educational Badges.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Wifi className="h-6 w-6 text-[#5e3aa6] shrink-0"/>
                        <span>Alle Berechtigungen sind offline gecached, um auch bei Internetausfall den Weiterbetrieb zu ermöglichen.</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <Monitor className="h-6 w-6 text-[#5e3aa6] shrink-0"/>
                        <span>Für die genaue Überwachung und Verwaltung gibt es ein modernes Webinterface.</span>
                    </li>
                </ul>

                <div
                    className="mt-8 sm:mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
                    <div className="text-center">
                        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">400,00€</div>
                        <div className="text-xs sm:text-sm text-neutral-600">inkl. MwSt.</div>
                        <div className="mt-1 text-[10px] text-neutral-500">
                            Vorläufiger Preis, Produkt in Kürze erhältlich
                        </div>
                    </div>
                    <Button className="h-11 sm:h-12 rounded-lg px-6 sm:px-7 text-sm sm:text-base font-semibold">
                        VORMERKEN
                    </Button>
                </div>
            </div>
        </section>
    );
}

// Page-Komponente
export default function Page() {
    return (
        <main>
            <HeroSystem/>
        </main>
    );
}