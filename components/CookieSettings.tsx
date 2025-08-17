"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import type {ConsentPreferences} from "@/types/consent";
import Link from "next/link";

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
                setLoaded(true);
            } catch {
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
        <div className="fixed bottom-4 left-4 z-[9999]">
            <div className="relative w-[min(92vw,600px)]">
                {/* Decorative SVG */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 1750 1750"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-auto w-full"
                    style={{fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2}}
                    aria-hidden="true"
                    role="img"
                >
                    <g transform="matrix(1,0,0,1,-125,-125)">
                        <path
                            d="M1791.83,627.237C1789.3,621.875 1784.62,617.838 1778.94,616.132C1773.26,614.416 1767.13,615.199 1762.06,618.28C1739.19,632.163 1712.84,639.5 1685.86,639.5C1634.08,639.5 1587.05,613.092 1560.06,568.859C1556.62,563.218 1550.72,559.535 1544.13,558.925C1537.61,558.343 1531.08,560.856 1526.65,565.768C1498.75,596.799 1458.82,614.593 1417.1,614.593C1335.88,614.593 1269.8,548.515 1269.8,467.29C1269.8,451.637 1272.22,436.294 1277,421.689C1278.86,415.966 1278.18,409.716 1275.11,404.535C1272.05,399.357 1266.9,395.748 1260.98,394.635C1191.56,381.579 1141.17,320.726 1141.17,249.943C1141.17,221.401 1149.34,193.737 1164.79,169.944C1168.61,164.051 1169.23,156.626 1166.42,150.185C1163.6,143.744 1157.74,139.145 1150.82,137.947C1101.32,129.354 1050.58,125 1000,125C766.268,125 546.534,216.015 381.269,381.283C216.012,546.544 125,766.278 125,1000C125,1233.72 216.012,1453.45 381.269,1618.72C546.534,1783.98 766.268,1875 1000,1875C1233.72,1875 1453.45,1783.98 1618.72,1618.72C1783.98,1453.45 1875,1233.72 1875,1000C1875,869.654 1847.02,744.241 1791.83,627.237Z"
                            fill="rgb(221,221,221)"
                        />
                    </g>
                </svg>

                {/* Title */}
                <div className="absolute inset-0">
                    <div className="py-17 px-40">
                        <h2 className="text-5xl  font-bold tracking-tight">COOKIE</h2>
                        <p className="text-3xl font-bold -mt-1">Settings</p>
                    </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="mt-20 text-sm leading-relaxed max-w-[420px]">
                        Wir verwenden notwendige, statistische und Marketing-Cookies, um unsere Website zu betreiben,
                        die Nutzung zu analysieren und Ihre Erfahrung zu verbessern. Einzelheiten finden Sie in unserer{" "}
                        <Link href="/privacy" className="underline underline-offset-2">
                            Datenschutzerklärung
                        </Link>
                        .
                    </p>

                    {/* Header */}
                    <div className="mt-4 grid w-full max-w-[420px] grid-cols-2 text-xs">
                        <span>Cookies</span>
                        <span className="justify-self-end">Auswahl</span>
                    </div>

                    {/* Switches */}
                    <div className="mt-2 w-full max-w-[420px] space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Statistik-Cookies</span>
                            <Switch
                                checked={prefs.analytics}
                                onCheckedChange={(v) => updatePrefs("analytics", v)}
                                aria-label="Statistik-Cookies aktivieren"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Marketing-Cookies</span>
                            <Switch
                                checked={prefs.marketing}
                                onCheckedChange={(v) => updatePrefs("marketing", v)}
                                aria-label="Marketing-Cookies aktivieren"
                            />
                        </div>
                        <div className="flex items-center justify-between opacity-70">
                            <span className="text-sm">Notwendige Cookies</span>
                            <Switch checked disabled aria-label="Notwendige Cookies (immer aktiv)"/>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex w-full max-w-[420px] flex-wrap items-center gap-3">
                        <div className="flex w-full gap-3">
                            <Button
                                variant="ghost"
                                className="h-10 text-sm w-1/2"
                                onClick={() =>
                                    savePrefs({necessary: true, analytics: false, marketing: false, given: true})
                                }
                            >
                                Ablehnen
                            </Button>

                            <Button
                                className="h-10 text-sm w-1/2"
                                onClick={() =>
                                    savePrefs({necessary: true, analytics: true, marketing: true, given: true})
                                }
                            >
                                Alle akzeptieren
                            </Button>
                        </div>

                        <Button
                            className="mt-2 w-full h-10 text-sm"
                            onClick={() => savePrefs({...prefs, necessary: true, given: true})}
                        >
                            Auswahl speichern
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}