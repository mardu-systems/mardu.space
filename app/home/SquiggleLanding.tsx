"use client";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ArrowRight, Mail, ShoppingCart, BookOpenCheck, ShieldCheck, Radio, Network, Database} from "lucide-react";
import {motion, AnimatePresence, useReducedMotion} from "framer-motion";

// Konstanten für bessere Wartbarkeit
const CANVAS_CONFIG = {
    MAX_DEVICE_PIXEL_RATIO: 2,
    LINE_WIDTH: 6, // Etwas dicker für den Neon-Effekt
    ANTI_ALIASING_QUALITY: "high" as const,
    STEP_SIZE_DIVISOR: 400,
    MIN_STEP_SIZE: 1.5,
    MARGIN: 48,
    WAVE_FREQUENCY: 0.0045,
    CORRIDOR_MAX_WIDTH: 560,
    CORRIDOR_WIDTH_RATIO: 0.7,
} as const;

const WAVE_COMPONENTS = [
    {frequency: 1, phase: 0, amplitude: 0.36},
    {frequency: 0.57, phase: 1.7, amplitude: 0.2},
    {frequency: 1.31, phase: 5.3, amplitude: 0.1},
    {frequency: 0.21, phase: 0.9, amplitude: 0.08},
] as const;

const LAYOUT_CONFIG = {
    MIN_TOTAL_HEIGHT: 2000,
    VIEWPORT_CENTER_OFFSET: 0.5,
} as const;

// Typen für bessere Typsicherheit
interface Section {
    id: number;
    title: string;
    text: string;
}

interface LayoutState {
    viewportHeight: number;
    totalHeight: number;
}

type DockItem = {
    kind?: "card" | "cta" | "list" | "quote";
    title?: string;
    body?: string;
    bullets?: string[];
    y: "top" | "center" | "bottom";
    offset?: number;
    w?: number; // max Breite
    badges?: string[];
    cta?: { href: string; label: string; icon?: React.ReactNode; variant?: "default" | "secondary" | "outline" }[];
    icon?: React.ReactNode;
};

interface CanvasRefs {
    canvas: React.RefObject<HTMLCanvasElement | null>;
    animationFrame: React.MutableRefObject<number | null>;
    scrollY: React.MutableRefObject<number>;
    devicePixelRatio: React.MutableRefObject<number>;
}

export default function SquiggleLanding() {
    const prefersReduced = useReducedMotion();

    // Abschnitte werden aus dem Layout abgeleitet (für Scroll-Höhe)
    const sections = useMemo<Section[]>(() => [
        {id: 0, title: "Wie kann mardu.space dir helfen?", text: "Übersicht"},
        {id: 1, title: "Kurse & Wissen", text: "Harald schult Jochen im Makerspace"},
        {id: 2, title: "Open‑Educational‑Badges", text: "Badge: Kenntnisse im Schweißen"},
        {id: 3, title: "Authentifizierung", text: "Login am mardu.space Gerät"},
        {id: 4, title: "Funkvernetzung", text: "Alle Geräte sind vernetzt"},
        {id: 5, title: "Gateway & Offline‑Cache", text: "Prüfung der Rechte"},
        {id: 6, title: "Freigabe", text: "Strom frei – sicher schweißen"},
    ], []);

    // Alternierende Blöcke (nur EINE Seite pro Abschnitt) – Inhalte aus dem PDF übernommen
    const layouts: { left: DockItem[]; right: DockItem[] }[] = useMemo(
        () => [
            // 0: HERO (links)
            {
                left: [
                    {
                        kind: "quote",
                        title: "WIE KANN MARDU.SPACE DIR HELFEN?",
                        body: "",
                        y: "center",
                        offset: -40,
                        w: 520
                    },
                ],
                right: [],
            },
            // 1: Kurs & Wissen (links)
            {
                left: [
                    {
                        kind: "card",
                        icon: <BookOpenCheck className="h-5 w-5"/>,
                        badges: ["Wissensweitergabe durch Kurse"],
                        title: "Harald & Jochen",
                        body:
                            "Jochen macht bei Harald einen Schweißkurs im heimischen Makerspace. Harald ist ein im Ruhestand befindlicher professioneller Schweißer, der sein Wissen als Ausbilder gerne weitergibt.",
                        y: "center",
                        offset: -40,
                        w: 520,
                    },
                ],
                right: [],
            },
            // 2: OEB (rechts)
            {
                left: [],
                right: [
                    {
                        kind: "list",
                        icon: <ShieldCheck className="h-5 w-5"/>,
                        title: "Open‑Educational‑Badges",
                        bullets: [
                            "Jochen hat den Schweißkurs erfolgreich abgeschlossen.",
                            "Harald verleiht das OEB ‚Kenntnisse im Schweißen‘ digital.",
                            "Webplattform: Open Educational Badges zur Ausstellung der Berechtigungen.",
                        ],
                        y: "center",
                        offset: 0,
                        w: 520,
                    },
                ],
            },
            // 3: Auth am Gerät (links)
            {
                left: [
                    {
                        kind: "card",
                        icon: <ShieldCheck className="h-5 w-5"/>,
                        title: "Authentifizierung am Gerät",
                        body:
                            "Jochen möchte nun ein Gestell für einen Wohnzimmertisch schweißen. Hierzu authentifiziert er sich am vorgeschalteten mardu.space Gerät.",
                        y: "center",
                        offset: -20,
                        w: 520,
                    },
                ],
                right: [],
            },
            // 4: Funkvernetzung (rechts)
            {
                left: [],
                right: [
                    {
                        kind: "card",
                        icon: <Network className="h-5 w-5"/>,
                        title: "Funkvernetzung & Ausfallsicherheit",
                        body:
                            "Alle mardu.space Geräte in einem Gebäude sind untereinander funkvernetzt. Dadurch erreicht jede Anfrage immer ihr Ziel – höchste Ausfallsicherheit.",
                        y: "center",
                        offset: 0,
                        w: 520,
                    },
                ],
            },
            // 5: Gateway & Offline‑Cache (links)
            {
                left: [
                    {
                        kind: "list",
                        icon: <Database className="h-5 w-5"/>,
                        title: "Gateway‑Prüfung",
                        bullets: [
                            "Gateway empfängt die Daten.",
                            "Prüft bei Open Education Badges, ob die erforderlichen Kenntnisse vorliegen.",
                            "Offline‑Cache sorgt für Betrieb auch bei Internetausfall.",
                        ],
                        y: "center",
                        offset: -10,
                        w: 520,
                    },
                ],
                right: [],
            },
            // 6: Freigabe (rechts)
            {
                left: [],
                right: [
                    {
                        kind: "card",
                        icon: <ShieldCheck className="h-5 w-5"/>,
                        title: "Freigabe & Nutzung",
                        body:
                            "Liegt die Berechtigung vor, schaltet das mardu.space Gerät den Strom für das Schweißgerät frei und Jochen kann seinen Tisch zusammen­schweißen. Dank des Kurses weiß er, wie man Verzug gering hält.",
                        y: "center",
                        offset: 20,
                        w: 520,
                    },
                ],
            },
        ],
        []
    );

    const canvasRefs: CanvasRefs = {
        canvas: useRef<HTMLCanvasElement | null>(null),
        animationFrame: useRef<number | null>(null),
        scrollY: useRef(0),
        devicePixelRatio: useRef(1),
    };

    const [activeSection, setActiveSection] = useState(0);
    const [layout, setLayout] = useState<LayoutState>(() => ({
        viewportHeight: 0,
        totalHeight: LAYOUT_CONFIG.MIN_TOTAL_HEIGHT,
    }));

    const calculateWaveX = (yWorld: number, canvasWidth: number): number => {
        const xCenter = Math.floor(canvasWidth / 2);
        const corridor = Math.min(
            Math.floor(canvasWidth * CANVAS_CONFIG.CORRIDOR_WIDTH_RATIO),
            CANVAS_CONFIG.CORRIDOR_MAX_WIDTH
        );
        const t = yWorld * CANVAS_CONFIG.WAVE_FREQUENCY;

        return (
            xCenter +
            WAVE_COMPONENTS.reduce(
                (sum, {frequency, phase, amplitude}) =>
                    sum + Math.sin(t * frequency + phase) * corridor * amplitude,
                0
            )
        );
    };

    const setupCanvasContext = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const dpr = canvasRefs.devicePixelRatio.current;

        ctx.clearRect(0, 0, width, height);
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = CANVAS_CONFIG.ANTI_ALIASING_QUALITY;

        // Neon-Orange Gradient für die Hauptlinie
        const neonGradient = ctx.createLinearGradient(0, 0, 0, height / dpr);
        neonGradient.addColorStop(0, "#FF6B00"); // Intensives Orange oben
        neonGradient.addColorStop(0.5, "#FF8533"); // Mittleres Orange
        neonGradient.addColorStop(1, "#FF4D00"); // Dunkleres Orange unten

        // Setup für den Schatten-Effekt (Orange Glow)
        ctx.shadowColor = "#FF6B00";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        ctx.lineWidth = CANVAS_CONFIG.LINE_WIDTH;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = neonGradient;
    };

    const drawWavePath = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
        const dpr = canvasRefs.devicePixelRatio.current;
        const adjustedWidth = canvasWidth / dpr;
        const adjustedHeight = canvasHeight / dpr;
        const offsetY = canvasRefs.scrollY.current;
        const step = Math.max(
            CANVAS_CONFIG.MIN_STEP_SIZE,
            Math.floor(adjustedHeight / CANVAS_CONFIG.STEP_SIZE_DIVISOR)
        );

        // 1. Äußerer Glow
        ctx.shadowBlur = 25;
        ctx.shadowColor = "rgba(255, 107, 0, 0.4)";
        ctx.lineWidth = CANVAS_CONFIG.LINE_WIDTH + 2;

        ctx.beginPath();
        let y = -CANVAS_CONFIG.MARGIN;
        ctx.moveTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        for (; y <= adjustedHeight + CANVAS_CONFIG.MARGIN; y += step) {
            ctx.lineTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        }
        ctx.stroke();

        // 2. Innerer Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(255, 107, 0, 0.8)";
        ctx.lineWidth = CANVAS_CONFIG.LINE_WIDTH;

        ctx.beginPath();
        y = -CANVAS_CONFIG.MARGIN;
        ctx.moveTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        for (; y <= adjustedHeight + CANVAS_CONFIG.MARGIN; y += step) {
            ctx.lineTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        }
        ctx.stroke();

        // 3. Hauptlinie
        ctx.shadowBlur = 0;
        ctx.lineWidth = CANVAS_CONFIG.LINE_WIDTH - 1;

        ctx.beginPath();
        y = -CANVAS_CONFIG.MARGIN;
        ctx.moveTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        for (; y <= adjustedHeight + CANVAS_CONFIG.MARGIN; y += step) {
            ctx.lineTo(calculateWaveX(y + offsetY, adjustedWidth), y);
        }
        ctx.stroke();

        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    const renderCanvas = () => {
        canvasRefs.animationFrame.current = null;
        const canvas = canvasRefs.canvas.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        setupCanvasContext(ctx, canvas.width, canvas.height);
        drawWavePath(ctx, canvas.width, canvas.height);
    };

    const scheduleCanvasRender = () => {
        if (canvasRefs.animationFrame.current != null) return;
        canvasRefs.animationFrame.current = requestAnimationFrame(renderCanvas);
    };

    const updateCanvasSize = () => {
        const canvas = canvasRefs.canvas.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(
            window.devicePixelRatio || 1,
            CANVAS_CONFIG.MAX_DEVICE_PIXEL_RATIO
        );
        canvasRefs.devicePixelRatio.current = dpr;

        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
        scheduleCanvasRender();
    };

    const calculateActiveSection = (scrollY: number): number => {
        const sectionIndex = Math.max(
            0,
            Math.min(
                sections.length - 1,
                Math.floor(
                    (scrollY + layout.viewportHeight * LAYOUT_CONFIG.VIEWPORT_CENTER_OFFSET) /
                    Math.max(layout.viewportHeight, 1)
                )
            )
        );
        return sectionIndex;
    };

    useEffect(() => {
        const handleResize = () => {
            const viewportHeight = window.innerHeight || 0;
            const totalHeight = Math.max(
                viewportHeight * sections.length,
                LAYOUT_CONFIG.MIN_TOTAL_HEIGHT
            );
            setLayout({viewportHeight, totalHeight});
            updateCanvasSize();
        };

        handleResize();
        window.addEventListener("resize", handleResize, {passive: true});
        return () => window.removeEventListener("resize", handleResize);
    }, [sections.length]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || 0;
            canvasRefs.scrollY.current = scrollY;

            const newActiveSection = calculateActiveSection(scrollY);
            setActiveSection((prev) => (prev === newActiveSection ? prev : newActiveSection));
            scheduleCanvasRender();
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections.length, layout.viewportHeight]);

    // Animations: Container- und Item-Varianten (links/rechts leicht unterschiedliche Einflüge)
    const containerVariants = (align: "left" | "right") => ({
        hidden: {opacity: 0, x: align === "left" ? -12 : 12},
        show: {
            opacity: 1,
            x: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: prefersReduced ? 0 : 0.08,
                delayChildren: prefersReduced ? 0 : 0.02,
                duration: prefersReduced ? 0 : 0.18,
            },
        },
        exit: {opacity: 0, x: align === "left" ? -12 : 12, transition: {duration: prefersReduced ? 0 : 0.18}},
    });

    const itemVariants = {
        hidden: {opacity: 0, y: 10, scale: 0.98, filter: "blur(2px)"},
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: prefersReduced
                ? {duration: 0}
                : {type: "spring", stiffness: 380, damping: 32, mass: 0.6},
        },
        exit: {opacity: 0, y: -8, scale: 0.98, filter: "blur(2px)", transition: {duration: prefersReduced ? 0 : 0.18}},
    } as const;

    return (
        <main className="squiggle-shell relative min-h-[100vh] bg-neutral-950 text-neutral-100">
            <div style={{height: layout.totalHeight}} aria-hidden/>

            <canvas
                ref={canvasRefs.canvas}
                className="pointer-events-none fixed inset-y-0 left-1/2 h-screen -translate-x-1/2"
                role="img"
                aria-label="Dekorative, vertikale Neon-Orange Linie"
                style={{width: "var(--rail)"}}
            />

            <div className="pointer-events-none fixed inset-0">
                <div className="mx-auto h-full w-full max-w-6xl px-4">
                    <div
                        className="grid h-full items-center gap-6"
                        style={{gridTemplateColumns: "1fr var(--railcol) 1fr"}}
                    >
                        {/* Links: SideDock mit hübschen Cards */}
                        <div className="relative pointer-events-auto">
                            <AnimatePresence mode="wait">
                                <SideDock key={`L-${activeSection}`} items={layouts[activeSection].left} align="left"
                                          containerVariants={containerVariants} itemVariants={itemVariants}/>
                            </AnimatePresence>
                        </div>

                        {/* Mitte: Rail-Hilfslinie */}
                        <div className="relative hidden sm:block">
                            <div className="absolute inset-y-0 left-1/2 h-full w-px -translate-x-1/2 bg-orange-500/20"/>
                        </div>

                        {/* Rechts: SideDock */}
                        <div className="relative pointer-events-auto hidden md:block">
                            <AnimatePresence mode="wait">
                                <SideDock key={`R-${activeSection}`} items={layouts[activeSection].right} align="right"
                                          containerVariants={containerVariants} itemVariants={itemVariants}/>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            <SquiggleStyles/>
        </main>
    );
}

function SideDock({items, align, containerVariants, itemVariants}: {
    items: DockItem[];
    align: "left" | "right";
    containerVariants: (a: "left" | "right") => any;
    itemVariants: any;
}) {
    return (
        <motion.div
            className="relative h-full"
            variants={containerVariants(align)}
            initial="hidden"
            animate="show"
            exit="exit"
            layout
        >
            {items.map((item, i) => (
                <DockCard key={`${align}-${item.title ?? item.kind}-${i}`} item={item} align={align}
                          variants={itemVariants}/>
            ))}
        </motion.div>
    );
}

function DockCard({item, align, variants}: { item: DockItem; align: "left" | "right"; variants: any }) {
    const {kind = "card", title, body, bullets, y, offset = 0, w = 420, badges, cta, icon} = item;

    let posStyle: React.CSSProperties = {};
    if (y === "top") posStyle = {top: `calc(var(--gut) + ${offset}px)`};
    if (y === "center") posStyle = {top: `calc(50% + ${offset}px)`, transform: "translateY(-50%)"};
    if (y === "bottom") posStyle = {bottom: `calc(var(--gut) + ${offset}px)`};

    return (
        <motion.div
            className={`absolute ${align === "left" ? "left-0" : "right-0"}`}
            style={{...posStyle, maxWidth: w}}
            variants={variants}
            layoutId={`${align}-${title ?? kind}`}
            whileHover={
                {
                    y: -2,
                    scale: 1.01,
                    transition: {type: "spring", stiffness: 500, damping: 30},
                }
            }
            whileTap={{scale: 0.99}}
        >
            {/* Card-Varianten */}
            {kind === "quote" ? (
                <Card
                    className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-orange-500/10">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold text-white/90">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-white/70 leading-relaxed">{body}</p>
                    </CardContent>
                </Card>
            ) : kind === "list" ? (
                <Card
                    className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-orange-500/10">
                    <CardHeader className="pb-2 flex flex-row items-center gap-2">
                        {icon}
                        <CardTitle className="text-lg font-semibold text-white/90">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-white/80">
                            {bullets?.map((b, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400/80"/>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ) : kind === "cta" ? (
                <Card
                    className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-orange-500/10">
                    <CardHeader className="pb-2 flex flex-row items-center gap-2">
                        {icon}
                        <CardTitle className="text-lg font-semibold text-white/90">{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-white/80">{body}</p>
                        <div className={`flex ${align === "left" ? "justify-start" : "justify-end"} gap-2`}>
                            {cta?.map((c, i) => (
                                <motion.div key={i} whileHover={{y: -1, scale: 1.02}} whileTap={{scale: 0.98}}>
                                    <Button asChild variant={c.variant ?? "default"} className="gap-2">
                                        <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                                           rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                                            {c.icon}
                                            {c.label}
                                        </a>
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card
                    className="rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-orange-500/10">
                    <CardHeader className="pb-2 flex flex-wrap items-center gap-2">
                        {icon}
                        <CardTitle className="text-lg font-semibold text-white/90">{title}</CardTitle>
                        <div className="ml-auto flex flex-wrap gap-1">
                            {badges?.map((b, i) => (
                                <Badge key={i} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                                    {b}
                                </Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-white/80 leading-relaxed">{body}</p>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
}

function SquiggleStyles() {
    return (
        <style>{`
      .squiggle-shell {
        --rail: clamp(280px, 28vw, 420px);
        --gut: clamp(12px, 2vw, 28px);
        --railcol: calc(var(--rail) + var(--gut) * 2);
      }
      @media (max-width: 768px) {
        .squiggle-shell { --rail: clamp(240px, 34vw, 360px); }
      }
      @media (max-width: 480px) {
        .squiggle-shell { --rail: clamp(200px, 40vw, 300px); }
      }
      @media (prefers-reduced-motion: reduce) {
        .squiggle-shell { --rail: 320px; }
      }
    `}</style>
    );
}
