"use client";

import {Button} from "@/components/ui/button";
import {Building, Shield, Wifi, Monitor} from "lucide-react";
import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

export type ProductAdvertisementProps = {
    leftImageSrc: string;
    leftImageAlt: string;
    topMiddleImageSrc: string;
    topMiddleImageAlt: string;
    topRightImageSrc: string;
    topRightImageAlt: string;
    leftImageClassName?: string;
    middleImageClassName?: string;
    rightImageClassName?: string;
    title?: string;
    description?: string;
    price?: string;
    priceNote?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
    className?: string;
    variant?: 1 | 2;
};

const AREAS = {
    1: {
        left: {frame: {left: "0%", top: "0%", width: "44%", height: "100%"}, poly: "0% 0%, 100% 0%, 50% 100%, 0% 100%"},
        middle: {frame: {left: "22%", top: "0%", width: "30%", height: "100%"}, poly: "0% 100%, 36.7% 50%, 100% 100%"},
        right: {frame: {left: "75%", top: "0%", width: "25%", height: "100%"}, poly: "0% 100%, 100% 44%, 100% 100%"}
    },
    2: {
        left: {frame: {left: "0%", top: "0%", width: "44%", height: "100%"}, poly: "0% 0%, 50% 0%, 100% 100%, 0% 100%"},
        middle: {frame: {left: "22%", top: "0%", width: "30%", height: "100%"}, poly: "0% 0%, 36.7% 50%, 100% 0%"},
        right: {frame: {left: "75%", top: "0%", width: "25%", height: "100%"}, poly: "0% 0%, 100% 44%, 100% 0%"}
    }
} as const;

type Area = { frame: { left: string; top: string; width: string; height: string }; poly: string };

/** ===== Desktop Poly Image ===== */
function PolyImage({
                       src,
                       alt,
                       area,
                       objectPosition,
                       z = 0,
                       className
                   }: {
    src: string;
    alt: string;
    area: Area;
    objectPosition?: string;
    z?: number;
    className?: string;
}) {
    const {frame, poly} = area;
    return (
        <div
            role="img"
            aria-label={alt}
            className={cn("absolute bg-no-repeat bg-cover", className)}
            style={{
                left: frame.left,
                top: frame.top,
                width: frame.width,
                height: frame.height,
                clipPath: `polygon(${poly})`,
                WebkitClipPath: `polygon(${poly})`,
                backgroundImage: `url(${src})`,
                backgroundPosition: objectPosition,
                zIndex: z
            }}
        />
    );
}

/** ===== Shared Feature List ===== */
function FeatureList() {
    return (
        <ul className="space-y-4 text-sm md:text-base leading-relaxed">
            <li className="flex items-start gap-3">
                <Building className="h-5 w-5 md:h-6 md:w-6 text-[#5e3aa6] shrink-0 mt-0.5"/>
                <span>Pro Gebäude wird ein Gateway benötigt, um das lokale Funknetzwerk zu verwalten.</span>
            </li>
            <li className="flex items-start gap-3">
                <Shield className="h-5 w-5 md:h-6 md:w-6 text-[#5e3aa6] shrink-0 mt-0.5"/>
                <span>Das Gateway prüft die Kenntnisse der Nutzer über Open Educational Badges.</span>
            </li>
            <li className="flex items-start gap-3">
                <Wifi className="h-5 w-5 md:h-6 md:w-6 text-[#5e3aa6] shrink-0 mt-0.5"/>
                <span>Alle Berechtigungen sind offline gecached, für Betrieb auch ohne Internet.</span>
            </li>
            <li className="flex items-start gap-3">
                <Monitor className="h-5 w-5 md:h-6 md:w-6 text-[#5e3aa6] shrink-0 mt-0.5"/>
                <span>Zur Überwachung & Verwaltung gibt es ein modernes Webinterface.</span>
            </li>
        </ul>
    );
}

/** ===== Mobile Layout (< md) ===== */
function MobileShowcase({
                            leftImageSrc,
                            leftImageAlt,
                            title,
                            description,
                            price,
                            priceNote,
                            ctaLabel,
                            onCtaClick
                        }: ProductAdvertisementProps) {
    return (
        <section className="md:hidden relative">

            <div className="relative w-full">
                <div className="max-w-[85%]">
                    <h2 className="text-3xl font-futura-bold tracking-tight text-neutral-900">
                        {title}
                    </h2>
                    <p className="mt-3 text-neutral-700 leading-snug font-futura-normal">
                        {description}
                    </p>
                </div>
                <Image
                    className=" [clip-path:polygon(0%_10%,100%_0%,100%_90%,0%_100%)]"
                    src={leftImageSrc}
                    alt={leftImageAlt}
                    width="1920"
                    height="1080"
                    aria-label={leftImageAlt}
                >
                    {/* Overlay für bessere Lesbarkeit */}
                </Image>
            </div>

            {/* Content */}
            <div className="px-4 py-6 space-y-6">
                <FeatureList/>
                {/* Preisbox (nicht sticky – die CTA-Leiste unten ist sticky) */}
                <div className="rounded-xl border p-4 text-center">
                    <div className="text-3xl font-extrabold tracking-tight">{price}</div>
                    <div className="text-xs text-neutral-600">inkl. MwSt.</div>
                    {priceNote && <div className="mt-1 text-[10px] text-neutral-500">{priceNote}</div>}
                </div>
            </div>

            {/* Sticky CTA unten */}
            <div
                className="sticky bottom-0 inset-x-0 z-30 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between gap-3">
                    <div className="leading-tight">
                        <div className="text-base font-semibold">{price}</div>
                        {priceNote && <div className="text-[10px] text-neutral-500">{priceNote}</div>}
                    </div>
                    <Button className="h-11 px-5 rounded-lg" onClick={onCtaClick}>
                        {ctaLabel}
                    </Button>
                </div>
            </div>
        </section>
    );
}

/** ===== Desktop Layout (>= md) – dein bisheriges Design ===== */
function DesktopShowcase(props: ProductAdvertisementProps) {
    const {
        leftImageSrc,
        leftImageAlt,
        topMiddleImageSrc,
        topMiddleImageAlt,
        leftImageClassName,
        middleImageClassName,
        title,
        description,
        price,
        priceNote,
        ctaLabel,
        onCtaClick,
        className,
        variant = 1
    } = props;

    const A = AREAS[variant];

    return (
        <section className={cn("relative mx-auto min-h-screen hidden md:block", className)}>
            <PolyImage src={leftImageSrc} alt={leftImageAlt} area={A.left} objectPosition="center" z={0}
                       className={leftImageClassName}/>
            <PolyImage
                src={topMiddleImageSrc}
                alt={topMiddleImageAlt}
                objectPosition="80% 10%"
                area={A.middle}
                z={10}
                className={middleImageClassName}
            />

            {/* Content */}
            <div className="absolute inset-0 z-20 left-[33%] top-[10%] px-6">
                <header className="mb-6 text-center -translate-x-[3%]">
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold tracking-wide">{title}</h2>
                    <p className="mx-auto mt-4 max-w-[60ch] text-base lg:text-xl 2xl:text-xl text-neutral-700">{description}</p>
                </header>

                <div className="mx-auto max-w-[80ch] min-h-[50vh] px-6">
                    <FeatureList/>
                </div>

                <div className="mt-10 flex items-center gap-8 justify-center">
                    <div className="text-center">
                        <div className="text-5xl font-extrabold tracking-tight">{price}</div>
                        <div className="text-sm text-neutral-600">inkl. MwSt.</div>
                        {priceNote && <div className="mt-1 text-[10px] text-neutral-500">{priceNote}</div>}
                    </div>
                    <Button className="h-12 rounded-lg px-7 text-base font-semibold" onClick={onCtaClick}>
                        {ctaLabel}
                    </Button>
                </div>
            </div>

            {/* leichte Abdunklung für Lesbarkeit in Zwischenbereichen */}
            <div
                className="absolute inset-0 z-[15] pointer-events-none bg-gradient-to-b from-white/40 via-transparent to-transparent"/>
        </section>
    );
}

export default function ProductShowcase(props: ProductAdvertisementProps) {
    return (
        <div className={cn("relative w-full", props.className)}>
            <MobileShowcase {...props} />
            <DesktopShowcase {...props} />
        </div>
    );
}
