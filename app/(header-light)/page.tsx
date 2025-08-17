"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import React, {useEffect, useRef, useState} from "react";

/* ------ Kreisnummer (dein Component, minimal getuned) ------ */
export function CircleNumber({
                                 number,
                                 size = "w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
                                 borderWidth = "border-[3px] sm:border-[4px] lg:border-[6px]",
                                 textSize = "text-xl sm:text-3xl lg:text-4xl",
                                 color = "border-[#CA452A] text-[#CA452A]",
                                 className = "",
                                 anchor = false,
                             }: {
    number: string | number;
    size?: string;
    borderWidth?: string;
    textSize?: string;
    color?: string;
    className?: string;
    anchor?: boolean;
}) {
    return (
        <div
            data-timeline-anchor={anchor ? "true" : undefined}
            className={`${size} ${borderWidth} rounded-full ${color} flex items-center justify-center ${className}`}>
            <span className={`${textSize} font-black leading-none tracking-tight`}>{number}</span>
        </div>
    );
}

/* ===================== Seite ===================== */

export default function HomePage() {
    const timelineRef = useRef<HTMLDivElement>(null);

    return (
        <main className="relative min-h-screen">
            {/* Hero */}
            <section className="relative w-full h-[calc(100vh-5rem)]">
                <Image src="/_A7_9072_quer.jpg" alt="Hero Image" fill priority sizes="100vw" className="object-cover"/>
                <div className="absolute inset-0 bg-black/50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center text-white">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">Zugriffskontrollsysteme</h1>
                        <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">für Makerspaces, FabLabs
                            und Schülerlabore</p>
                        <Button size="lg" className="px-8 bg-[#CA452A] hover:bg-[#B23A21]">Was braucht dein
                            Space?</Button>
                    </div>
                </div>
            </section>

            <section className="relative w-full">
                <div className="flex items-end justify-center">
                    <div className="text-center">
                        <strong
                            className="uppercase font-futura-normal text-[clamp(20px,4vw,80px)] text-[#8D69C0] md:leading-[0.9]">
                            Warum brauchst du Mardu.space?
                        </strong>
                    </div>
                </div>
            </section>

            <section className="relative w-full py-25">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    {/* Linke Seite: Großes Warnsymbol */}
                    <div className="flex items-center justify-center order-2 md:order-1">
                        <Image
                            src="/landing/warning.svg"
                            alt="Warnsymbol Verletzungsgefahr"
                            width={1200}
                            height={1200}
                            className="w-1/2 h-auto md:w-full md:max-w-2xl drop-shadow-2xl"
                        />
                    </div>

                    {/* Rechte Seite: Text */}
                    <div className="flex flex-col space-y-8 order-1 md:order-2">

                        {/* Wortwolke */}
                        <div className="flex justify-center order-1 md:translate-y-[-25%] md:translate-x-[-30%]">
                            <Image
                                src="/landing/words.svg"
                                alt="Wortwolke"
                                width={1000}
                                height={1000}
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>

                        {/* Fließtext */}
                        <div
                            className="space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base md:text-lg order-3 hidden md:block">
                            <p>
                                Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen
                                aber auch Risiken durch leistungsstarke Maschinen mit sich.
                                Besonders beim Zugang für Minderjährige ist klare Verantwortung
                                gefragt.
                            </p>
                            <p>
                                Das mardu.space System sorgt mit eigener Hard- und Software sowie
                                einer europaweit anerkannten Kenntnisdatenbank (Open Education
                                Badges) für sichere Zutritts- und Zugriffskontrollen. So werden nur
                                geschulte Nutzer freigeschaltet – und ihre Qualifikationen lassen
                                sich standortübergreifend einsetzen.
                            </p>
                        </div>

                    </div>
                    {/* Fließtext */}
                    <div
                        className="space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base md:text-lg order-3 md:hidden">
                        <p>
                            Makerspaces und FabLabs eröffnen kreative Möglichkeiten, bringen
                            aber auch Risiken durch leistungsstarke Maschinen mit sich.
                            Besonders beim Zugang für Minderjährige ist klare Verantwortung
                            gefragt.
                        </p>
                        <p>
                            Das mardu.space System sorgt mit eigener Hard- und Software sowie
                            einer europaweit anerkannten Kenntnisdatenbank (Open Education
                            Badges) für sichere Zutritts- und Zugriffskontrollen. So werden nur
                            geschulte Nutzer freigeschaltet – und ihre Qualifikationen lassen
                            sich standortübergreifend einsetzen.
                        </p>
                    </div>
                </div>
            </section>

            <div ref={timelineRef} className="relative">
                <DashedConnector rootRef={timelineRef} offsetBeforePoint={50} strokeWidth={5}/>
                <section className="w-full py-10 md:py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                            <div className="col-span-2 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person.svg"
                                    alt="Person"
                                    width={192}
                                    height={192}
                                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                />
                            </div>

                            <div className="col-span-7 md:col-span-4">
                                <div className="text-[#CA452A] text-base md:text-lg leading-snug tracking-[0.005em]">
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

                            <div className="col-span-12 md:col-span-4 md:col-start-9 translate-y-[-40%]">
                                <h2 className="font-display text-[#8D69C0] whitespace-pre-line uppercase text-3xl sm:text-4xl md:text-6xl leading-tight text-right ">
                                    {`WIE KANN
                                MARDU.SPACE
                                DIR HELFEN?`}
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-10 md:py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
                            <div className="col-span-2 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person_happy.svg"
                                    alt="Person freut sich"
                                    width={192}
                                    height={192}
                                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                />
                            </div>

                            <div className="col-span-10 md:col-span-3">
                                <div className="text-[#CA452A] text-base md:text-lg leading-snug tracking-[0.005em]">
                                    <p>
                                        Jochen hat erfolgreich an dem Schweißkurs teilgenommen und weiß nun, welche
                                        Gefahren
                                        von einem
                                        Schweißgerät ausgehen und wie man dieses fachgerecht verwendet.
                                    </p>
                                    <p className="mt-4">
                                        Harald hat ihm dafür das Open-Educational-Badge „Kenntnisse im Schweißen"
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
                                    <Image src="/landing/HaraldundJochen.jpg" alt="Harald und Jochen" width={1200}
                                           height={1200} className="w-full h-auto drop-shadow-2xl"/>
                                    <p className="text-sm sm:text-lg text-center">
                                        Wissensweitergabe durch Kurse
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full pt-10 md:pt-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                            <div className="col-span-12 md:col-span-6 flex flex-col items-center md:items-start">
                                <div
                                    className="w-full max-w-[720px] rounded-xl border border-[#8D69C0]/30 shadow-[0_10px_40px_rgba(141,105,192,.15)] bg-white overflow-hidden">
                                    <Image
                                        src="/landing/open_badge.png"
                                        alt="Badge erstellen – Webplattform Open Educational Badges"
                                        width={1440}
                                        height={890}
                                        className="w-full h-auto object-contain"
                                        priority
                                    />
                                </div>

                                <p className="mt-6 text-center md:text-left text-xl leading-snug">
                                    <span className="block">Webplattform Open Educational Badges</span>
                                    <span className="block text-zinc-600">Zur Ausstellung der Berechtigungen</span>
                                </p>
                            </div>

                            <div className="col-span-12 md:col-span-6 grid grid-rows-[auto_auto_1fr]">
                                <div className="flex items-start gap-4
">
                                    <CircleNumber number={3} className="mt-1" anchor/>
                                    <div
                                        className="mt-4 max-w-[40ch] text-[#CA452A] text-sm sm:text-base leading-relaxed tracking-[0.005em]">
                                        <p>Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen.</p>
                                        <p className="mt-4">
                                            Hierzu authentifiziert er sich an dem <span
                                            className="whitespace-nowrap">mardu.space</span> Gerät,
                                            welches dem Schweißgerät vorgeschaltet ist.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative mt-8 md:mt-10 flex items-end justify-end translate-y-[-35%]">
                                    <Image
                                        src="/landing/person_schweiss_nfc.svg"
                                        alt="NFC-Authentifizierung am Gerät"
                                        width={1100}
                                        height={900}
                                        className="w-[88%] md:w-[84%] h-auto object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <div className="max-w-7xl mx-auto">
                        <div className="w-3/5 justify-self-left">

                            <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">

                                {/* LINKS: Icon/Illustration */}
                                <div className="col-span-3 md:col-span-2 flex justify-center md:justify-start">
                                    <Image
                                        src="/landing/mesh.png"
                                        alt="Netzwerk Illustration"
                                        width={220}
                                        height={220}
                                        className="w-24 h-24 md:w-32 md:h-32 object-contain"
                                    />
                                </div>

                                {/* MITTE: Text */}
                                <div className="col-span-7 md:col-span-7">
                                    <p className="text-[#CA452A] text-sm sm:text-base leading-relaxed">
                                        Alle Geräte von <span className="whitespace-nowrap">mardu.space</span> in einem
                                        Gebäude sind untereinander funkvernetzt, um höchste Ausfallsicherheit zu
                                        gewährleisten.
                                        Dadurch erreicht jede Anfrage immer ihr Ziel.
                                    </p>
                                </div>

                                {/* RECHTS: Nummer-Kreis */}
                                <div className="col-span-2 flex justify-center md:justify-start">
                                    <CircleNumber number={4} className="mt-1" anchor/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
                            <div className="col-span-11 md:col-span-6 relative">
                                <Image
                                    src="/landing/open_badge_mardu_cloud.svg"
                                    alt="Open Educational Badges – Cloud / Gateway"
                                    width={1200}
                                    height={900}
                                    className="w-full max-w-[600px] h-auto object-contain"
                                    priority
                                />

                                <div
                                    className="absolute text-[#CA452A] text-sm md:text-base leading-snug flex items-start gap-4 max-w-[280px] md:max-w-[340px] left-[45%] bottom-[5%]">
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
                                    <CircleNumber number={5} className="shrink-0 translate-y-[100%] translate-x-[20%]" anchor/>
                                </div>
                            </div>

                            {/* RECHTS: Gerät-Kachel + Caption */}
                            <figure className="col-span-12 md:col-span-5 flex flex-col items-center md:items-start md:self-end">
                                <Image
                                    src="/landing/blende.svg"
                                    alt="mardu.space Gerät – Freischaltung"
                                    width={1200}
                                    height={1200}
                                    className="w-[82%] md:w-[88%] lg:w-[80%] h-auto object-contain rounded-2xl drop-shadow-xl"
                                />
                                <figcaption className="mt-3 text-base md:text-lg text-center md:text-left">
                                    Gerät zur Freischaltung der Maschinen
                                </figcaption>
                            </figure>
                        </div>
                    </div>
                </section>
                <section className="w-full py-10 md:py-14">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">

                            {/* LINKS: Illustration Person + Schweißgerät */}
                            <div className="col-span-12 md:col-span-6 flex justify-center md:justify-start">
                                <Image
                                    src="/landing/person_schweiss.svg"
                                    alt="Jochen schweißt mit freigeschaltetem Gerät"
                                    width={1000}
                                    height={800}
                                    className="w-[90%] md:w-full max-w-[580px] h-auto object-contain"
                                />
                            </div>

                            {/* RECHTS: Kreisnummer + Text */}
                            <div className="col-span-12 md:col-span-6 flex items-start gap-4">
                                <CircleNumber number={6} className="mt-1 shrink-0 " anchor />
                                <div className="text-[#CA452A] text-sm sm:text-base md:text-lg leading-relaxed tracking-[0.005em] max-w-[56ch]">
                                    <p>
                                        Da die Berechtigung vorliegt, schaltet das <span className="whitespace-nowrap">mardu.space</span> Gerät
                                        den Strom für das Schweißgerät frei und Jochen kann seinen Wohnzimmertisch zusammenschweißen. *
                                    </p>
                                    <p className="mt-4">
                                        Dank des Kurses von Harald weiß er auch, wie man den Verzug beim Schweißen gering hält.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}


function DashedConnector({
                             rootRef,
                             anchorSelector = "[data-timeline-anchor]",
                             stroke = "#CA452A",
                             strokeWidth = 2,
                             dash = "6 8",
                             offsetBeforePoint = 16,
                         }: {
    rootRef: React.RefObject<HTMLElement | null>;
    anchorSelector?: string;
    stroke?: string;
    strokeWidth?: number;
    dash?: string;
    offsetBeforePoint?: number;
}) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [box, setBox] = useState<{ w: number; h: number }>({w: 0, h: 0});

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const getAnchors = () =>
            Array.from(root.querySelectorAll(anchorSelector)) as HTMLElement[];

        const update = () => {
            const r = root.getBoundingClientRect();
            setBox({w: r.width, h: r.height});

            const points = getAnchors()
                // nur sichtbare (Desktop)
                .filter(el => getComputedStyle(el).display !== "none")
                .map(el => {
                    const b = el.getBoundingClientRect();
                    return {
                        x: b.left + b.width / 2 - r.left + root.scrollLeft,
                        y: b.top + b.height / 2 - r.top + root.scrollTop,
                    };
                })
                .sort((a, b) => a.y - b.y);

            const pathSegments = buildIndividualConnections(points, offsetBeforePoint);

            // Entferne alle bestehenden Pfade
            const svg = svgRef.current;
            if (svg) {
                svg.querySelectorAll("path").forEach(path => path.remove());

                // Füge neue Pfad-Segmente hinzu
                pathSegments.forEach(pathData => {
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", pathData);
                    path.setAttribute("fill", "none");
                    path.setAttribute("stroke", stroke);
                    path.setAttribute("stroke-width", strokeWidth.toString());
                    path.setAttribute("stroke-dasharray", dash);
                    path.setAttribute("vector-effect", "non-scaling-stroke");
                    svg.appendChild(path);
                });
            }
        };

        const buildIndividualConnections = (pts: { x: number; y: number }[], offset: number) => {
            if (pts.length < 2) return [];

            const segments: string[] = [];

            // Erstelle separate Verbindungen zwischen jeweils zwei aufeinanderfolgenden Punkten
            for (let i = 0; i < pts.length - 1; i++) {
                const startPoint = {
                    x: pts[i].x,
                    y: pts[i].y + offset
                };

                const endPoint = {
                    x: pts[i + 1].x,
                    y: pts[i + 1].y - offset
                };

                // Erstelle eine glatte Kurve zwischen den beiden Punkten
                const midY = (startPoint.y + endPoint.y) / 2;
                const pathData = `M ${startPoint.x},${startPoint.y} C ${startPoint.x},${midY} ${endPoint.x},${midY} ${endPoint.x},${endPoint.y}`;

                segments.push(pathData);
            }

            return segments;
        };

        // Reagiert auf Größenänderungen
        const rootRO = new ResizeObserver(update);
        rootRO.observe(root);

        const anchorROs: ResizeObserver[] = [];
        const anchorsNow = getAnchors();
        anchorsNow.forEach(el => {
            const ro = new ResizeObserver(update);
            ro.observe(el);
            anchorROs.push(ro);
        });

        window.addEventListener("resize", update);
        window.addEventListener("load", update);
        update();

        return () => {
            window.removeEventListener("resize", update);
            window.removeEventListener("load", update);
            rootRO.disconnect();
            anchorROs.forEach(ro => ro.disconnect());
        };
    }, [rootRef, anchorSelector]);

    return (
        <svg
            ref={svgRef}
            className="absolute inset-0 pointer-events-none hidden md:block"
            width="100%"
            height="100%"
            viewBox={`0 0 ${Math.max(1, box.w)} ${Math.max(1, box.h)}`}
            preserveAspectRatio="none"
        />
    );
}