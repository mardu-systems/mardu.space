"use client";

import Image from "next/image";
import {useMemo} from "react";
import clsx from "clsx";
import ProductShowcase from "@/components/product/ProductShowcase";
import FeatureList from "@/components/product/FeatureList";
import {Building, Monitor, Shield, Wifi} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import Faq, {FaqItem} from "@/components/Faq";

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
                    <Link href="/#products">
                        <Button size="lg"
                                className="px-8 mt-10 md:px-12 md:py-8 text-xl md:text-4xl font-futura-bold tracking-wider uppercase bg-[#CA452A] hover:bg-[#B23A21] rounded-full cursor-pointer">
                            Zu den Produkten
                        </Button>
                    </Link>
                </div>
            </section>

            <section id="products">
                <ProductShowcase
                    variant={1}
                    leftImageSrc="/gateway/mounted.jpg"
                    leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
                    topMiddleImageSrc="/gateway/inside.jpg"
                    topMiddleImageAlt="Innenleben des Gateways"
                    textImageSrc="/gateway/webinterface.jpeg"
                    textImageAlt="Webinterface des Gateways"
                    title="DER ZUGRIFFSPUNKT"
                    description="Der Zugriffspunkt [ˈtsuːɡrɪfsˌpʊŋkt] liest die Schlüsselkarten der Benutzer und fragt die Berechtigung bei dem Gateway an."
                    price="200,00 €"
                    priceNote="Vorläufiger Preis – Produkt in Kürze erhältlich"
                    ctaLabel="Vormerken"
                    onCtaClick={() => console.log("Gateway vorgemerkt")}
                >
                    <FeatureList size="lg" columns={1}>
                        <FeatureList.Item size="lg" icon={Building}>Pro Gebäude wird ein Gateway benötigt, um das lokale
                            Funknetzwerk zu verwalten.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Shield}>Das Gateway prüft die Kenntnisse der Nutzer über Open
                            Educational Badges.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Wifi}>Alle Berechtigungen sind offline gecached, für Betrieb
                            auch ohne Internet.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Monitor}>Zur Überwachung & Verwaltung gibt es ein modernes
                            Webinterface.</FeatureList.Item>
                    </FeatureList>
                </ProductShowcase>
                <ProductShowcase
                    variant={2}
                    leftImageSrc="/gateway/mounted.jpg"
                    leftImageAlt="Gateway an zentraler Position in einer Werkstatt"
                    topMiddleImageSrc="/gateway/inside.jpg"
                    topMiddleImageAlt="Innenleben des Gateways"
                    textImageSrc="/gateway/webinterface.jpeg"
                    textImageAlt="Webinterface des Gateways"
                    title="Das Gateway"
                    description="Das Gateway [geɪtweɪ] empfängt die Zugriffsanfragen von den Readern und sendet die entsprechenden Berechtigungen zurück."
                    price="400,00 €"
                    priceNote="Vorläufiger Preis – Produkt in Kürze erhältlich"
                    ctaLabel="Vormerken"
                    onCtaClick={() => console.log("Gateway vorgemerkt")}
                >
                    <FeatureList size="lg" columns={1}>
                        <FeatureList.Item size="lg" icon={Building}>Pro Gebäude wird ein Gateway benötigt, um das lokale
                            Funknetzwerk zu verwalten.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Shield}>Das Gateway prüft die Kenntnisse der Nutzer über Open
                            Educational Badges.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Wifi}>Alle Berechtigungen sind offline gecached, für Betrieb
                            auch ohne Internet.</FeatureList.Item>
                        <FeatureList.Item size="lg" icon={Monitor}>Zur Überwachung & Verwaltung gibt es ein modernes
                            Webinterface.</FeatureList.Item>
                    </FeatureList>
                </ProductShowcase>
            </section>
        </main>
    );
}

// Page-Komponente
export default function Page() {
    const faqItems: FaqItem[] = [
        {
            question: "Welche Komponenten umfasst das System?",
            answer: "Zum System gehören ein Gateway und mehrere Zugriffspunkte.",
        },
        {
            question: "Funktioniert das System ohne Internetverbindung?",
            answer: "Ja, alle Berechtigungen werden offline im Gateway gespeichert.",
        },
        {
            question: "Wann sind die Produkte verfügbar?",
            answer: "Die ersten Produkte sind demnächst erhältlich und können vorgemerkt werden.",
        },
    ];

    return (
        <main>
            <HeroSystem/>
            <section className="max-w-4xl mx-auto px-4 py-16">
                <h2 className="mb-8 text-center text-3xl font-bold">FAQ</h2>
                <Faq items={faqItems}/>
            </section>
        </main>
    );
}