"use client";

import {Button} from "@/components/ui/button";
import * as React from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";

export type ProductAdvertisementProps = {
    leftImageSrc: string;
    leftImageAlt: string;
    topMiddleImageSrc: string;
    topMiddleImageAlt: string;
    textImageSrc: string;
    textImageAlt: string;
    title?: string;
    description?: string;
    price?: string;
    priceNote?: string;
    ctaLabel?: string;
    onCtaClick?: () => void;
    className?: string;
    variant?: 1 | 2;

    /** <- Neu: beliebige Inhalte wie FeatureList, Badges, FAQs etc. */
    children?: React.ReactNode;
};

const AREAS = {
    1: {
        left: {frame: {left: "0%", top: "0%", width: "44%", height: "100%"}, poly: "0% 0%, 100% 0%, 50% 100%, 0% 100%"},
        middle: {frame: {left: "22%", top: "0%", width: "30%", height: "100%"}, poly: "0% 100%, 36.7% 50%, 100% 100%"},
        right: {frame: {left: "75%", top: "0%", width: "25%", height: "100%"}, poly: "0% 100%, 100% 44%, 100% 100%"},
        mobileHero: {
            frame: {left: "0%", top: "0%", width: "100%", height: "100%"},
            poly: "0% 10%, 100% 0%, 100% 90%, 0% 100%",
        },
    },
    2: {
        left: {frame: {left: "0%", top: "0%", width: "44%", height: "100%"}, poly: "0% 0%, 50% 0%, 100% 100%, 0% 100%"},
        middle: {frame: {left: "22%", top: "0%", width: "30%", height: "100%"}, poly: "0% 0%, 36.7% 50%, 100% 0%"},
        right: {frame: {left: "75%", top: "0%", width: "25%", height: "100%"}, poly: "0% 0%, 100% 44%, 100% 0%"},
        mobileHero: {
            frame: {left: "0%", top: "0%", width: "100%", height: "100%"},
            poly: "0% 0%, 90% 0%, 100% 100%, 10% 100%",
        },
    },
} as const;

type Area = { frame: { left: string; top: string; width: string; height: string }; poly: string };

/** ===== Desktop Poly Image ===== */
function PolyImage({
                       src,
                       alt,
                       area,
                       objectPosition,
                       z = 0,
                       className,
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
                zIndex: z,
            }}
        />
    );
}

/** ===== Mobile Layout (< md) ===== */
function MobileShowcase({
                            leftImageSrc,
                            leftImageAlt,
                            topMiddleImageSrc,
                            topMiddleImageAlt,
                            textImageSrc,
                            textImageAlt,
                            title,
                            description,
                            price,
                            priceNote,
                            ctaLabel,
                            onCtaClick,
                            children,
                            variant = 1,
                        }: ProductAdvertisementProps) {
    const A = AREAS[variant];
    const {frame, poly} = A.mobileHero;

    return (
        <section className="lg:hidden relative mt-10">
            <div className="relative w-full space-y-6">
                <div className="relative z-10 max-w-[40ch] mx-6">
                    <h2 className="text-3xl leading-tight text-neutral-900 font-futura-bold uppercase tracking-wide">
                        {title}
                    </h2>
                    <p className="mt-3 text-lg leading-snug text-neutral-800 font-futura-normal">
                        {description}
                    </p>
                </div>

                {/* Hintergrund Hero-Image */}
                <Image
                    src={leftImageSrc}
                    alt={leftImageAlt}
                    width={1920}
                    height={1080}
                    aria-label={leftImageAlt}
                    style={{
                        left: frame.left,
                        top: frame.top,
                        clipPath: `polygon(${poly})`,
                        WebkitClipPath: `polygon(${poly})`,
                    }}
                />
            </div>
            {/* Content-Slot (mobil) */}
            <div className="px-4 py-6">
                {children}
            </div>

            {/* Produktbild-Ausschnitt */}
            <div className="relative my-6 w-full h-40 overflow-hidden rounded-xl">
                <Image
                    src={textImageSrc}
                    alt={textImageAlt}
                    fill
                    className="object-contain object-center"
                    aria-label={textImageAlt}
                />
            </div>

            {/* Zweites Bild (nur 1/8 Screenhöhe) */}
            <div className="relative w-full h-[16.5vh] overflow-hidden">
                <Image
                    src={topMiddleImageSrc}
                    alt={topMiddleImageAlt}
                    fill
                    className="object-cover object-center"
                    aria-label={topMiddleImageAlt}
                />
            </div>

            {/* Sticky CTA unten */}
            <div
                className="sticky bottom-0 inset-x-0 z-30 border-t backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="mx-auto max-w-screen-sm px-4 py-3 flex items-center justify-between gap-3">
                    <div className="leading-tight">
                        <div className="text-base font-semibold">{price}</div>
                        {priceNote && <div className="text-[10px] text-neutral-500">{priceNote}</div>}
                    </div>
                    {ctaLabel ? (
                        <Button className="h-11 px-5 rounded-lg" onClick={onCtaClick}>
                            {ctaLabel}
                        </Button>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

/** ===== Desktop Layout (>= md) ===== */
function DesktopShowcase(props: ProductAdvertisementProps) {
    const {
        leftImageSrc,
        leftImageAlt,
        topMiddleImageSrc,
        topMiddleImageAlt,
        textImageSrc,
        textImageAlt,
        title,
        description,
        price,
        priceNote,
        ctaLabel,
        onCtaClick,
        className,
        variant = 1,
        children,
    } = props;

    const A = AREAS[variant];

    return (
        <section
            className={cn(
                "relative mx-auto hidden min-h-screen lg:block",
                className
            )}
        >
            {/* Hintergrundbilder */}
            <PolyImage
                src={leftImageSrc}
                alt={leftImageAlt}
                area={A.left}
                objectPosition="center"
                z={0}
            />
            <PolyImage
                src={topMiddleImageSrc}
                alt={topMiddleImageAlt}
                objectPosition="80% 10%"
                area={A.middle}
                z={0}
            />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col px-6 left-[40%]">
                <header className="mt-[10%] text-center">
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-futura-heavy uppercase tracking-wide">
                        {title}
                    </h2>
                    <p className="mx-auto mt-4 max-w-[65ch] text-lg text-neutral-700 leading-snug">
                        {description}
                    </p>
                </header>

                <div className="flex-1 flex flex-col items-center justify-center gap-12">
                    {/* Optionaler Content (z.B. FeatureList) */}
                    {children && <div className="max-w-[80ch]">{children}</div>}

                    {/* Produktbild */}
                    <div className="relative w-full max-w-[600px] aspect-[4/3]">
                        <Image
                            src={textImageSrc}
                            alt={textImageAlt}
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Preis & CTA am unteren Ende */}
                <div className="mb-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <div>
                            <div className="text-5xl font-extrabold tracking-tight">{price}</div>
                            <div className="text-sm text-neutral-600">inkl. MwSt.</div>
                            {priceNote && (<div className="mt-1 text-xs text-neutral-500">{priceNote}</div>)}
                        </div>
                        {ctaLabel && (
                            <Button
                                className="h-12 rounded-lg px-7 text-base font-semibold"
                                onClick={onCtaClick}
                            >
                                {ctaLabel}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
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
