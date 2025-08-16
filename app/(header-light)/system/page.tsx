"use client";

import Image from "next/image";
import { useMemo } from "react";
import clsx from "clsx";

export type HeroProps = {
    leftSrc?: string;
    rightSrc?: string;
    leftAlt?: string;
    rightAlt?: string;
    heightClass?: string;
    stackOnMobile?: boolean;
    howItWorksHref?: string;
    productsHref?: string;
};

function HeroSystem({
                        leftSrc = "/_A7_8650.jpg",
                        rightSrc = "/_A7_9072_quer.jpg",
                        leftAlt = "Gateway – Zentrale Steuereinheit",
                        rightAlt = "Zutrittspunkt – Türmodul mit NFC",
                        heightClass = "h-[80vh]",
                        stackOnMobile = true,
                        howItWorksHref = "#so-funktionierts",
                        productsHref = "#produkte",
                    }: HeroProps) {
    const gridCols = useMemo(
        () => (stackOnMobile ? "grid-cols-1 md:grid-cols-2" : "grid-cols-2"),
        [stackOnMobile]
    );

    return (
        <section
            className="relative w-full text-white"
            aria-labelledby="system-heading"
            role="region"
        >
            {/* Bild-Layer */}
            <div className={clsx("grid", gridCols, heightClass)}>
                {/* Overlay für besseren Kontrast */}
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
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/40"
                    />
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
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/40"
                    />
                </div>
            </div>

            {/* Headline + CTAs */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col items-center px-4">
                <h1
                    id="system-heading"
                    className="pointer-events-auto select-none text-balance text-center font-black"
                >
                    <strong
                        className="
              bg-linear-to-r from-purple-500 to-purple-500
              bg-no-repeat
              bg-[length:100%_0.5em]
              bg-[position:0_95%]
              px-[10px]
              font-bold uppercase tracking-[0.4em]
              text-[clamp(40px,6vw,90px)] leading-[0.8]
            "
                    >
                        Das System
                    </strong>
                </h1>

                <div className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={howItWorksHref}
                        aria-label="Mehr erfahren: So funktioniert das System"
                        className="inline-flex items-center rounded-md bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        So funktioniert’s
                    </a>
                </div>
            </div>

            {/* Vertikale Linie + Glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-full w-px">
                    <div className="absolute inset-0 origin-top rounded-full opacity-90 bg-gradient-to-b from-[hsl(var(--brand-from,210_100%_60%))] via-[hsl(var(--brand-mid,190_100%_55%))] to-[hsl(var(--brand-to,25_100%_60%))] animate-grow-y" />
                    <div className="absolute -inset-x-3 inset-y-0 rounded-full bg-gradient-to-b from-[hsl(var(--brand-from,210_100%_60%))/12] via-[hsl(var(--brand-mid,190_100%_55%))/10] to-[hsl(var(--brand-to,25_100%_60%))/12] blur-2xl" />
                </div>
            </div>

            {/* Labels seitlich der Linie (nur Desktop, visuell) */}
            <div
                className="pointer-events-none absolute left-1/2 hidden -translate-x-[calc(100%+0.75rem)] text-right md:block top-[16%]"
                aria-hidden="true"
            >
                <strong className="px-[3px] font-bold uppercase text-[clamp(40px,6vw,90px)] leading-[0.8]">
                    Das Gateway
                </strong>
            </div>

            <div
                className="pointer-events-none absolute left-1/2 hidden text-left md:block bottom-[12%]"
                aria-hidden="true"
            >
                <strong className="px-[3px] font-bold uppercase text-[clamp(40px,6vw,90px)] leading-[0.8]">
                    Der Zutrittspunkt
                </strong>
            </div>

            {/* Mobile Labels (nur visuell) */}
            <div
                className="absolute left-4 top-3 text-xs tracking-wide text-white/80 md:hidden"
                aria-hidden="true"
            >
                Gateway
            </div>
            <div
                className="absolute right-4 bottom-3 text-xs tracking-wide text-white/80 md:hidden"
                aria-hidden="true"
            >
                Zutrittspunkt
            </div>
        </section>
    );
}

// Page-Komponente
export default function Page() {
    return (
        <main>
            <HeroSystem />
        </main>
    );
}