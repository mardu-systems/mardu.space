"use client";

import { useEffect, useRef, useState } from "react";

interface DashedConnectorProps {
    rootRef: React.RefObject<HTMLElement | null>;
    anchorSelector?: string;
    stroke?: string;
    strokeWidth?: number;
    dash?: string;
    offsetBeforePoint?: number;
}

export default function DashedConnector({
    rootRef,
    anchorSelector = "[data-timeline-anchor]",
    stroke = "#CA452A",
    strokeWidth = 2,
    dash = "6 8",
    offsetBeforePoint = 16,
}: DashedConnectorProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [box, setBox] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const getAnchors = () =>
            Array.from(root.querySelectorAll(anchorSelector)) as HTMLElement[];

        const update = () => {
            const r = root.getBoundingClientRect();
            setBox({ w: r.width, h: r.height });

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
                    y: pts[i].y + offset,
                };

                const endPoint = {
                    x: pts[i + 1].x,
                    y: pts[i + 1].y - offset,
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
    }, [rootRef, anchorSelector, stroke, strokeWidth, dash, offsetBeforePoint]);

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

