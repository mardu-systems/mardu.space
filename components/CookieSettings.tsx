"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Tooltip, TooltipTrigger, TooltipContent} from "@/components/ui/tooltip";
import type {ConsentPreferences} from "@/types/consent";
import Link from "next/link";
import {toast} from "sonner";

interface CookieSettingsProps {
    onSave: (prefs: ConsentPreferences) => Promise<void> | void;
}

export default function CookieSettings({onSave}: CookieSettingsProps) {
    const [prefs, setPrefs] = useState<ConsentPreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
        given: false,
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/consent");
                const data = (await res.json()) as ConsentPreferences;
                setPrefs(data);
            } catch (err) {
                console.error("Failed to load consent preferences", err);
                setPrefs({necessary: true, analytics: false, marketing: false, given: false});
                toast.error("Fehler beim Laden der Cookie-Einstellungen. Standardwerte werden verwendet.");
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    if (!loaded) return null;

    function updatePrefs(key: keyof ConsentPreferences, value: boolean) {
        setPrefs({...prefs, [key]: value});
    }

    async function savePrefs(newPrefs: ConsentPreferences) {
        await fetch("/api/consent", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newPrefs),
        });
        await onSave(newPrefs);
    }

    return (
        <>
            {/* Mobile / small: Bottom-sheet Card */}
            <div
                className="
          fixed inset-x-0 bottom-0 z-[9998] md:hidden
          rounded-t-2xl border border-border bg-[#DDDDDD] backdrop-blur
          shadow-lg
          px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]
        "
                role="dialog"
                aria-modal="true"
                aria-label="Cookie-Einstellungen"
            >
                <div className="mx-auto w-full max-w-md">
                    <div className="mb-3 flex items-baseline justify-between gap-2">
                        <h2 className="text-lg font-bold leading-none">COOKIE</h2>
                        <p className="text-sm font-semibold">Settings</p>
                    </div>

                    <p className="text-sm leading-relaxed">
                        Wir verwenden notwendige, statistische und Marketing-Cookies, um unsere Website zu betreiben,
                        die Nutzung zu analysieren und Ihre Erfahrung zu verbessern. Details in der{" "}
                        <Link href="/privacy" className="underline underline-offset-2">
                            Datenschutzerklärung
                        </Link>
                        .
                    </p>

                    <div className="mt-4 grid grid-cols-2 text-xs">
                        <span>Cookies</span>
                        <span className="justify-self-end">Auswahl</span>
                    </div>

                    <div className="mt-2 space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>Statistik-Cookies</span>
                                </TooltipTrigger>
                                <TooltipContent className="z-[10000]">
                                    Helfen uns zu verstehen, wie unsere Website genutzt wird.
                                </TooltipContent>
                            </Tooltip>
                            <Switch
                                checked={prefs.analytics}
                                onCheckedChange={(v) => updatePrefs("analytics", v)}
                                aria-label="Statistik-Cookies aktivieren"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>Marketing-Cookies</span>
                                </TooltipTrigger>
                                <TooltipContent className="z-[10000]">
                                    Ermöglichen personalisierte Werbung und Tracking.
                                </TooltipContent>
                            </Tooltip>
                            <Switch
                                checked={prefs.marketing}
                                onCheckedChange={(v) => updatePrefs("marketing", v)}
                                aria-label="Marketing-Cookies aktivieren"
                            />
                        </div>
                        <div className="flex items-center justify-between opacity-70">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>Notwendige Cookies</span>
                                </TooltipTrigger>
                                <TooltipContent className="z-[10000]">
                                    Erforderlich für grundlegende Funktionen der Website.
                                </TooltipContent>
                            </Tooltip>
                            <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)" />
                        </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                className="flex-1"
                                onClick={() => savePrefs({necessary: true, analytics: false, marketing: false, given: true})}
                            >
                                Ablehnen
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={() => savePrefs({necessary: true, analytics: true, marketing: true, given: true})}
                            >
                                Alle akzeptieren
                            </Button>
                        </div>
                        <Button
                            onClick={() => savePrefs({...prefs, necessary: true, given: true})}
                        >
                            Auswahl speichern
                        </Button>
                    </div>
                </div>
            </div>

            {/* md+ : dein quadratisches SVG-Layout (zentriert auf kleinen Laptops, unten links auf großen) */}
            <div className="fixed z-[9999] hidden md:block md:bottom-4 md:left-1/2 md:-translate-x-1/2 lg:left-4 lg:translate-x-0">
                <div className="relative w-[min(90vw,560px)] lg:w-[min(92vw,600px)] aspect-square">
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 1750 1750"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-full w-full"
                        aria-hidden="true"
                        role="img"
                        style={{fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}}
                    >
                        <g transform="matrix(1,0,0,1,-125,-125)">
                            <path
                                d="M1791.83,627.237C1789.3,621.875 1784.62,617.838 1778.94,616.132C1773.26,614.416 1767.13,615.199 1762.06,618.28C1739.19,632.163 1712.84,639.5 1685.86,639.5C1634.08,639.5 1587.05,613.092 1560.06,568.859C1556.62,563.218 1550.72,559.535 1544.13,558.925C1537.61,558.343 1531.08,560.856 1526.65,565.768C1498.75,596.799 1458.82,614.593 1417.1,614.593C1335.88,614.593 1269.8,548.515 1269.8,467.29C1269.8,451.637 1272.22,436.294 1277,421.689C1278.86,415.966 1278.18,409.716 1275.11,404.535C1272.05,399.357 1266.9,395.748 1260.98,394.635C1191.56,381.579 1141.17,320.726 1141.17,249.943C1141.17,221.401 1149.34,193.737 1164.79,169.944C1168.61,164.051 1169.23,156.626 1166.42,150.185C1163.6,143.744 1157.74,139.145 1150.82,137.947C1101.32,129.354 1050.58,125 1000,125C766.268,125 546.534,216.015 381.269,381.283C216.012,546.544 125,766.278 125,1000C125,1233.72 216.012,1453.45 381.269,1618.72C546.534,1783.98 766.268,1875 1000,1875C1233.72,1875 1453.45,1783.98 1618.72,1618.72C1783.98,1453.45 1875,1233.72 1875,1000C1875,869.654 1847.02,744.241 1791.83,627.237Z"
                                fill="rgb(221,221,221)"
                            />
                        </g>
                    </svg>

                    {/* Title */}
                    <div className="absolute inset-0 flex flex-col items-center">
                        <div className="max-w-[320px] lg:max-w-[420px] translate-y-4/5 -translate-x-4/5">
                            <h2 className="text-[clamp(1.5rem,2vw,2rem)] font-bold tracking-tight">COOKIE</h2>
                            <p className="text-[clamp(1rem,1.5vw,1.5rem)]
                        font-bold -mt-1">Settings</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="mt-20 text-sm lg:text-sm leading-relaxed max-w-[340px] lg:max-w-[420px]">
                            Wir verwenden notwendige, statistische und Marketing-Cookies, um unsere Website zu betreiben,
                            die Nutzung zu analysieren und Ihre Erfahrung zu verbessern. Einzelheiten in der{" "}
                            <Link href="/privacy" className="underline underline-offset-2">
                                Datenschutzerklärung
                            </Link>
                            .
                        </p>

                        <div className="mt-4 grid w-full max-w-[340px] lg:max-w-[420px] grid-cols-2 text-xs">
                            <span>Cookies</span>
                            <span className="justify-self-end">Auswahl</span>
                        </div>

                        <div className="mt-2 w-full max-w-[340px] lg:max-w-[420px] space-y-2 text-sm">
                            <div className="flex items-center justify-between">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>Statistik-Cookies</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[10000]">
                                        Helfen uns zu verstehen, wie unsere Website genutzt wird.
                                    </TooltipContent>
                                </Tooltip>
                                <Switch
                                    checked={prefs.analytics}
                                    onCheckedChange={(v) => updatePrefs("analytics", v)}
                                    aria-label="Statistik-Cookies aktivieren"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>Marketing-Cookies</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[10000]">
                                        Ermöglichen personalisierte Werbung und Tracking.
                                    </TooltipContent>
                                </Tooltip>
                                <Switch
                                    checked={prefs.marketing}
                                    onCheckedChange={(v) => updatePrefs("marketing", v)}
                                    aria-label="Marketing-Cookies aktivieren"
                                />
                            </div>
                            <div className="flex items-center justify-between opacity-70">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>Notwendige Cookies</span>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[10000]">
                                        Erforderlich für grundlegende Funktionen der Website.
                                    </TooltipContent>
                                </Tooltip>
                                <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)" />
                            </div>
                        </div>

                        <div className="mt-6 flex w-full max-w-[340px] lg:max-w-[420px] flex-wrap items-center gap-3">
                            <div className="flex w-full gap-2 justify-center">
                                <Button
                                    variant="ghost"
                                    className="w-1/2"
                                    onClick={() =>
                                        savePrefs({necessary: true, analytics: false, marketing: false, given: true})
                                    }
                                >
                                    Ablehnen
                                </Button>
                                <Button
                                    className="w-1/2"
                                    onClick={() =>
                                        savePrefs({necessary: true, analytics: true, marketing: true, given: true})
                                    }
                                >
                                    Alle akzeptieren
                                </Button>
                            </div>

                            <div className="flex w-full justify-center">
                                <Button
                                    className="w-1/2 lg:w-full"
                                    onClick={() => savePrefs({...prefs, necessary: true, given: true})}
                                >
                                    Auswahl speichern
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}