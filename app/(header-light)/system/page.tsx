"use client";

import Image from "next/image";
import {useMemo} from "react";
import clsx from "clsx";
import ProductShowcase from "@/components/ProductShowcase";

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
                        leftSrc = "/mounted.jpg",
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
            </section>
            <ProductShowcase
                variant={1}
                leftImageSrc="/gateway/mounted.jpg"
                leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
                leftImageClassName="object-[80%_right]"
                topMiddleImageSrc="/gateway/inside.jpg"
                topMiddleImageAlt="Innenleben des Gateways"
                middleImageClassName="object-bottom"
                topRightImageSrc="/gateway/webinterface.jpeg"
                topRightImageAlt="Verwaltungs-Webinterface"
                title="Das Gateway"
                description="Das Gateway empfängt die Zugriffsanfragen von den Readern und sendet die entsprechenden Berechtigungen zurück."
                price="400,00 €"
                priceNote="Vorläufiger Preis – Produkt in Kürze erhältlich"
                ctaLabel="Vormerken"
                onCtaClick={() => console.log("Gateway vorgemerkt")}
            />
            <ProductShowcase
                variant={2}
                leftImageSrc="/gateway/mounted.jpg"
                leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
                leftImageClassName="object-[80%_right]"
                topMiddleImageSrc="/gateway/inside.jpg"
                topMiddleImageAlt="Innenleben des Gateways"
                middleImageClassName="object-bottom"
                topRightImageSrc="/gateway/webinterface.jpeg"
                topRightImageAlt="Verwaltungs-Webinterface"
                title="Das Gateway"
                description="Das Gateway empfängt die Zugriffsanfragen von den Readern und sendet die entsprechenden Berechtigungen zurück."
                price="400,00 €"
                priceNote="Vorläufiger Preis – Produkt in Kürze erhältlich"
                ctaLabel="Vormerken"
                onCtaClick={() => console.log("Gateway vorgemerkt")}
            />
        </main>
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