"use client";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, useScroll, useTransform} from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ------------------------------------------------------------
// Helper: classnames
function cx(...c: Array<string | false | null | undefined>) {
    return c.filter(Boolean).join(" ");
}

// ------------------------------------------------------------
// Types
export type Step = {
    id: string;
    title: string;
    eyebrow?: string;
    description: string;
    side?: "left" | "right"; // where the card sits visually
};

export type WavyLinePinnedScrollerProps = {
    /**
     * Steps shown while scrolling. The overlay stays pinned; only the line moves.
     */
    steps?: Step[];
    /** Seed for the random-ish waviness so it’s repeatable across renders */
    seed?: number;
    /** How tall the scroll journey should be per step (in viewport heights). */
    vhPerStep?: number; // default 130
    /** Max horizontal wiggle of the line (in px) */
    amplitude?: number; // default 120
    /** Stroke width of the line (in px) */
    strokeWidth?: number; // default 6
    /** Color of the line */
    stroke?: string; // default "ok"
    /** Optional children rendered inside the pinned overlay (z-above the cards) */
    overlayChildren?: React.ReactNode;
};

// ------------------------------------------------------------
// Deterministic PRNG (Mulberry32)
function mulberry32(a: number) {
    return function () {
        let t = (a += 0x6D2B79F5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

// Create a smooth wavy path across the given height.
function buildWavyPath({
                           height,
                           width,
                           amplitude,
                           seed,
                           stepEveryPx,
                       }: {
    height: number;
    width: number;
    amplitude: number;
    seed: number;
    stepEveryPx: number;
}) {
    // Generate x offsets every N px, then use a smooth quadratic path.
    const rand = mulberry32(seed);
    const points: Array<{ x: number; y: number }> = [];
    const midX = width / 2;
    const steps = Math.max(8, Math.floor(height / stepEveryPx));

    for (let i = 0; i <= steps; i++) {
        const y = (i / steps) * height;
        // Random wobble left/right; bias alternates for drama
        const dir = i % 2 === 0 ? -1 : 1;
        const wobble = (rand() * amplitude) * dir;
        const x = midX + wobble * (0.6 + 0.4 * rand());
        points.push({ x, y });
    }

    // Build a smooth path using quadratic curves (Q/T commands)
    let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
    for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const prev = points[i - 1];
        // control point halfway between prev and current but nudged randomly
        const cx = (prev.x + p.x) / 2 + (rand() - 0.5) * amplitude * 0.3;
        const cy = (prev.y + p.y) / 2 + (rand() - 0.5) * stepEveryPx * 0.4;
        d += ` Q ${cx.toFixed(2)} ${cy.toFixed(2)}, ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    }
    return d;
}

// SVG Line layer (the part that actually scrolls)
function WavyLineLayer({ heightPx, strokeWidth = 6, stroke = "hsl(var(--primary))", amplitude = 120, seed = 42 }: { heightPx: number; strokeWidth?: number; stroke?: string; amplitude?: number; seed?: number; }) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Width follows container; recalc on resize
    const [widthPx, setWidthPx] = useState(1024);
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setWidthPx(el.clientWidth));
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const pathD = useMemo(() => {
        return buildWavyPath({
            height: heightPx,
            width: Math.max(600, widthPx),
            amplitude,
            seed,
            stepEveryPx: 200,
        });
    }, [heightPx, widthPx, amplitude, seed]);

    return (
        <div ref={containerRef} className="relative w-full" style={{ height: `${heightPx}px` }}>
            <svg
                className="block w-full h-full"
                viewBox={`0 0 ${Math.max(600, widthPx)} ${heightPx}`}
                preserveAspectRatio="none"
                aria-hidden
            >
                <defs>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    d={pathD}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    filter="url(#glow)"
                />
            </svg>
        </div>
    );
}

// ------------------------------------------------------------
// Main component
export default function WavyLinePinnedScroller({
                                                   steps = DEFAULT_STEPS,
                                                   seed = 421337,
                                                   vhPerStep = 130,
                                                   amplitude = 120,
                                                   strokeWidth = 6,
                                                   stroke,
                                                   overlayChildren,
                                               }: WavyLinePinnedScrollerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Total scrollable height is based on steps
    const totalVh = Math.max(steps.length * vhPerStep, 200);
    const [vh, setVh] = useState(0);

    useEffect(() => {
        const compute = () => setVh(window.innerHeight);
        compute();
        window.addEventListener("resize", compute);
        return () => window.removeEventListener("resize", compute);
    }, []);

    const totalHeightPx = Math.max(1, Math.round((vh || 800) * (totalVh / 100)));

    // Scroll progress over the whole container
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

    // Precompute per-step transforms
    const opacities = steps.map((_, i) => {
        const start = i / steps.length;
        const end = (i + 1) / steps.length;
        // fade in between start+5% and start+25%, stay, fade out near end
        const o = useTransform(scrollYProgress, [start, start + (end - start) * 0.15, end - (end - start) * 0.15, end], [0, 1, 1, 0]);
        return o;
    });

    return (
        <section ref={containerRef} className="relative w-full">
            {/* The scrolling line layer (behind) */}
            <div aria-hidden className="relative -z-10">
                <WavyLineLayer heightPx={totalHeightPx} amplitude={amplitude} seed={seed} strokeWidth={strokeWidth} stroke={stroke} />
            </div>

            {/* The pinned overlay that never scrolls (just fades between steps) */}
            <div className="sticky top-0 h-[100svh]">
                <div className="relative grid h-full grid-cols-12 gap-4 px-4 sm:px-6 lg:px-10">
                    {/* Optional slot sitting above everything */}
                    {overlayChildren}

                    {steps.map((step, i) => (
                        <motion.div
                            key={step.id}
                            style={{ opacity: opacities[i] }}
                            className={cx(
                                "pointer-events-none col-span-12 h-full",
                                step.side === "right" ? "lg:col-start-7" : "lg:col-start-1",
                                "flex items-center"
                            )}
                        >
                            <div className={cx("relative max-w-xl", step.side === "right" ? "ml-auto" : "mr-auto")}
                                 style={{ pointerEvents: "auto" }}
                            >
                                <Card className="backdrop-blur supports-[backdrop-filter]:bg-background/70">
                                    <CardHeader className="space-y-2">
                                        {step.eyebrow ? <Badge variant="outline" className="w-fit">{step.eyebrow}</Badge> : null}
                                        <CardTitle className="text-balance leading-tight">{step.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-pretty text-muted-foreground">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ------------------------------------------------------------
// Example content (replace with your own). Left/right alternates.
const DEFAULT_STEPS: Step[] = [
    {
        id: "intro",
        eyebrow: "Wie kann mardu.space helfen?",
        title: "Wissen teilen, sicher arbeiten",
        description:
            "Harald, Profi im Ruhestand, gibt im Makerspace Schweißkurse. Unsere Plattform bündelt Kurse, Badges und Gerätefreigaben an einem Ort.",
        side: "left",
    },
    {
        id: "badge",
        eyebrow: "Open Educational Badges",
        title: "Kompetenz wird sichtbar",
        description:
            "Nach dem Kurs erhält Jochen ein digitales Badge für Schweißkenntnisse – als prüfbares Nachweisdokument.",
        side: "right",
    },
    {
        id: "use",
        eyebrow: "Vom Kurs zur Praxis",
        title: "Geräte verantwortungsvoll nutzen",
        description:
            "Jochen authentifiziert sich am vorgeschalteten mardu.space Gerät, bevor er an die Maschine geht.",
        side: "left",
    },
    {
        id: "mesh",
        eyebrow: "Vernetzt und ausfallsicher",
        title: "Geräte sprechen miteinander",
        description:
            "Alle Geräte im Gebäude sind funkvernetzt – jede Anfrage findet ihren Weg, selbst bei Störungen.",
        side: "right",
    },
    {
        id: "gateway",
        eyebrow: "Gateway & Offline-Cache",
        title: "Prüfen, freigeben, weiterarbeiten",
        description:
            "Das Gateway prüft die Berechtigungen. Ein Offline-Cache hält den Betrieb selbst ohne Internet aufrecht.",
        side: "left",
    },
    {
        id: "done",
        eyebrow: "Freigabe erteilt",
        title: "Loslegen – sicher und dokumentiert",
        description:
            "Liegt die Berechtigung vor, wird die Maschine freigeschaltet und die Arbeit kann beginnen.",
        side: "right",
    },
];
