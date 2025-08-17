"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";

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

/* ------ Gemeinsamer, stabiler Step-Wrapper ------ */
function StepRow({
                     number,
                     orient = "left",
                     media,
                     children,
                     className = "",
                 }: {
    number: number;
    orient?: "left" | "right";
    media: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}) {
    const left = orient === "left";
    return (
        <section className={`py-16 md:py-24 ${className}`}>
            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="grid grid-cols-12 gap-x-10 gap-y-10 items-start">
                    {/* Rail für die Nummer (1 Spalte) */}
                    <div
                        className={`${left ? "col-span-1 order-1" : "col-span-1 order-3"} hidden md:flex justify-center`}>
                        <CircleNumber number={number} className="mt-1"/>
                    </div>

                    {/* Media (5 Spalten) */}
                    <div
                        className={`${left ? "col-span-12 md:col-span-5 order-2" : "col-span-12 md:col-span-5 md:order-2 order-1"} flex justify-center md:justify-start`}>
                        {media}
                    </div>

                    {/* Text (6 Spalten) */}
                    <div
                        className={`${left ? "col-span-12 md:col-span-6 order-3" : "col-span-12 md:col-span-6 order-3"}`}>
                        {/* Nummer mobil oben vor dem Text */}
                        <div className="md:hidden mb-4">
                            <CircleNumber number={number}/>
                        </div>
                        <div
                            className="text-[#CA452A] leading-7 tracking-[0.005em] text-[clamp(16px,1.05vw,19px)] max-w-[56ch] text-pretty">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Step3_Auth() {
    return (
        <StepRow
            number={3}
            orient="right"
            media={
                <div className="relative w-full max-w-[580px]">
                    <Image
                        src="/landing/person_schweiss_nfc.svg"
                        alt="NFC-Authentifizierung am Gerät"
                        width={820}
                        height={820}
                        className="w-full h-auto object-contain"
                        priority
                    />
                    {/* Overlay nur im Bild – keine Dopplung im Seitentext */}
                    <p className="absolute left-[clamp(10px,2vw,28px)] top-[clamp(10px,2vw,28px)] max-w-[32ch] text-[#CA452A] text-[clamp(14px,2.1vw,22px)] leading-snug whitespace-pre-line pointer-events-none select-none">
                        {`Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen.

Hierzu authentifiziert er sich an dem mardu.space Gerät, welches dem Schweißgerät vorgeschaltet ist.`}
                    </p>
                </div>
            }
        >
            <p>
                Authentifizierung direkt am <span className="underline">mardu.space</span> Gerät – sicher und
                nachvollziehbar.
            </p>
        </StepRow>
    );
}

export function Step5_GatewayOEB() {
    return (
        <StepRow
            number={5}
            orient="left"
            media={
                <div className="relative w-full max-w-[580px]">
                    <Image
                        src="/landing/open_badge_mardu_cloud.svg"
                        alt="Open Educational Badges Cloud"
                        width={820}
                        height={820}
                        className="w-full h-auto object-contain"
                    />
                    <div
                        className="absolute right-[clamp(10px,2vw,28px)] bottom-[clamp(10px,3vw,36px)] max-w-[30ch] text-[#CA452A] text-[clamp(14px,2.1vw,22px)] leading-snug select-none">
                        <p>
                            Das Gateway von{" "}
                            <a href="https://mardu.space" target="_blank" rel="noopener noreferrer"
                               className="underline pointer-events-auto">
                                mardu.space
                            </a>{" "}
                            empfängt die Daten und fragt bei Open Education Badges an, ob die erforderlichen Kenntnisse
                            vorliegen.
                        </p>
                        <p className="mt-5">
                            Ein Offline-Cache sorgt für einen Betrieb auch bei einem <span
                            className="underline">Internetausfall</span>.
                        </p>
                    </div>
                </div>
            }
        >
            <p>Zuverlässige Prüfung der Berechtigungen – auch bei temporären Verbindungsproblemen dank
                Offline-Cache.</p>
        </StepRow>
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
                        <div className="flex justify-center order-1">
                            <Image
                                src="/landing/words.svg"
                                alt="Wortwolke"
                                width={900}
                                height={900}
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
                                <div className=" text-sm sm:text-base leading-relaxed">
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
                                <div className=" text-sm sm:text-base leading-relaxed">
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

                <Step3_Auth/>
                <Step5_GatewayOEB/>
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

            const path = buildSmoothPath(points, offsetBeforePoint);
            const p = svgRef.current?.querySelector("path");
            if (p) p.setAttribute("d", path);
        };

        const buildSmoothPath = (pts: { x: number; y: number }[], offset: number) => {
            if (pts.length < 2) return "";

            const startPoint = {
                x: pts[0].x,
                y: pts[0].y + offset
            };

            let d = `M ${startPoint.x},${startPoint.y}`;

            for (let i = 1; i < pts.length; i++) {
                const prev = i === 1 ? startPoint : {
                    x: pts[i - 1].x,
                    y: pts[i - 1].y + offset
                };

                const cur = {
                    x: pts[i].x,
                    y: pts[i].y - offset
                };

                const midY = (prev.y + cur.y) / 2;
                d += ` C ${prev.x},${midY} ${cur.x},${midY} ${cur.x},${cur.y}`;
            }
            return d;
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
        >
            <path
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeDasharray={dash}
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
}