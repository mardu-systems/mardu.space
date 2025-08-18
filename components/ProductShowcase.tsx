"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Building, Shield, Wifi, Monitor} from "lucide-react";
import * as React from "react";

export type ProductAdvertisementProps = {
    leftImageSrc: string;
    leftImageAlt: string;
    topMiddleImageSrc: string;
    topMiddleImageAlt: string;
    topRightImageSrc: string;
    topRightImageAlt: string;
    title?: string;
    description?: string;
    price?: string;
    priceNote?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
    className?: string;
    variant?: 1 | 2;
};

const CLIP_PATHS = {
    1: {
        left: "0 0, 44% 0, 22% 100%, 0% 100%",
        middle: "22% 100%, 33% 50%, 52% 100%",
        right: "75% 100%, 100% 44%, 100% 100%",
    },
    2: {
        left: "0 0, 22% 0, 44% 100%, 0% 100%",
        middle: "22% 0, 33% 50%, 52% 0",
        right: "75% 0, 100% 44%, 100% 0",
    },
} as const;

const poly = (points: string) => ({
    clipPath: `polygon(${points})`,
    WebkitClipPath: `polygon(${points})`,
});
export default function ProductShowcase({
                                            leftImageSrc,
                                            leftImageAlt,
                                            topMiddleImageSrc,
                                            topMiddleImageAlt,
                                            topRightImageSrc,
                                            topRightImageAlt,
                                            title,
                                            description,
                                            price,
                                            priceNote,
                                            ctaLabel,
                                            onCtaClick,
                                            className,
                                            variant = 1,
                                        }: ProductAdvertisementProps) {
    const clip = CLIP_PATHS[variant];
    return (
        <section className={`relative mx-auto min-h-screen overflow-hidden ${className}`}>
            {/* ====== Decorative Layer (optional tint/gradient) ====== */}

            <div className="absolute inset-0 z-0 overflow-hidden" style={poly(clip.left)}>
                <Image
                    src={leftImageSrc}
                    alt={leftImageAlt}
                    fill
                    priority
                    className="object-cover opacity-80"
                    sizes="100vw"
                />
            </div>

            <div className="absolute inset-0 z-10 overflow-hidden" style={poly(clip.middle)}>
                <Image
                    src={topMiddleImageSrc}
                    alt={topMiddleImageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>

            <div className="absolute inset-0 z-10 overflow-hidden" style={poly(clip.right)}>
                <Image
                    src={topRightImageSrc}
                    alt={topRightImageAlt}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
            </div>


            {/* ====== Foreground Content ====== */}
            <div className="absolute inset-0 z-20 left-[33%] top-[10%] px-4 sm:px-6">
                <header className="mb-4 sm:mb-6 text-center translate-x-0 sm:-translate-x-[3%]">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-wide">
                        {title}
                    </h2>
                    <p className="mx-auto mt-2 sm:mt-4 max-w-[22ch] sm:max-w-[26ch] md:max-w-[30ch] lg:max-w-[34ch] xl:max-w-[60ch] text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-xl text-neutral-700">
                        {description}
                    </p>
                </header>

                <ul className="mx-auto mt-0 max-w-[32ch] sm:max-w-[40ch] md:max-w-[60ch] lg:max-w-[80ch] space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed list-none flex flex-col justify-center min-h-[50vh]">
                    <li className="flex items-start gap-3 sm:gap-4">
                        <Building className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#5e3aa6] shrink-0 mt-0.5"/>
                        <span>Pro Gebäude wird ein Gateway benötigt, um das lokale Funknetzwerk zu verwalten.</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                        <Shield className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#5e3aa6] shrink-0 mt-0.5"/>
                        <span>Das Gateway prüft die Kenntnisse der Nutzer über Open Educational Badges.</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                        <Wifi className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#5e3aa6] shrink-0 mt-0.5"/>
                        <span>Alle Berechtigungen sind offline gecached, um auch bei Internetausfall den Weiterbetrieb zu ermöglichen.</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4">
                        <Monitor className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-[#5e3aa6] shrink-0 mt-0.5"/>
                        <span>Für die genaue Überwachung und Verwaltung gibt es ein modernes Webinterface.</span>
                    </li>
                </ul>

                <div className="mt-8 sm:mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
                    <div className="text-center">
                        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">{price}</div>
                        <div className="text-xs sm:text-sm text-neutral-600">inkl. MwSt.</div>
                        <div className="mt-1 text-[10px] text-neutral-500">{priceNote}</div>
                    </div>
                    <Button
                        className="h-11 sm:h-12 rounded-lg px-6 sm:px-7 text-sm sm:text-base font-semibold"
                        onClick={onCtaClick}
                    >
                        {ctaLabel}
                    </Button>
                </div>
            </div>

            {/* ====== Mobile safety net: leichte Abdunklung für Lesbarkeit ====== */}
            <div
                className="absolute inset-0 z-[15] pointer-events-none md:hidden bg-gradient-to-b from-white/80 via-white/40 to-transparent"/>
        </section>
    );
}