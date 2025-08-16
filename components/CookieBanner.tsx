"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ConsentPreferences, setConsent } from "@/lib/consent";

export default function CookieConsentBanner() {
    const [visible, setVisible] = useState(false);
    const [prefs, setPrefs] = useState<ConsentPreferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        (async () => {
            const res = await fetch("/api/consent");
            const current = await res.json();
            if (!current || !current.given) setVisible(true);
            setPrefs(current || { necessary: true, analytics: false, marketing: false });
        })();
    }, []);

    async function handleSave(newPrefs: ConsentPreferences) {
        await setConsent({ ...newPrefs, given: true });
        setPrefs({ ...newPrefs, given: true });
        setVisible(false);
    }

    if (!visible) return null;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
            <div className="relative w-[360px]">
                {/* SVG Background */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 265 250"
                    className="w-full h-auto"
                >
                    {/* Dreieck Hintergrund */}
                    <path
                        d="M132.44,5.31c4.09-7.08,14.3-7.08,18.39,0l131,226.9c4.09,7.08-1.02,15.92-9.19,15.92H10.63c-8.17,0-13.28-8.85-9.19-15.92L132.44,5.31Z"
                        fill="#ffb800"
                    />
                    {/* Hand-Icon */}
                    <path
                        d="M160.94,90.17c0,5.93-1.29,11.75-3.92,17.06-.17.39-.17.84.11,1.17l8.95,11.91c.39.56,0,1.34-.67,1.34h-20.86l-2.8-3.52c-2.96-4.36-7.94-5.03-10.12-5.09-.73,0-1.34-.34-1.85-.9l-9.9-11.52c-.28-.34-.67-.62-1.06-.84-1.68-.95-6.38-3.58-6.38-3.58-1.85-.84-3.69-2.68-2.63-4.92.62-1.34,2.18-2.07,3.97-1.68l6.32,1.51c.56.11,1.06.45,1.45.84l4.92,5.31c1.4-.62,2.4-1.68,2.4-3.75l-.11-5.31c0-.84-.28-1.62-.73-2.29-1.85-2.85-6.99-10.68-9.96-15.1-1.17-1.73-.73-4.08,1.01-5.26,1.73-1.17,4.14-.73,5.31,1.01l8.11,12.36c1.17,1.79,4.03.89,3.92-1.23l-.67-18.23c-.06-2.07,1.62-3.8,3.69-3.8s3.64,1.62,3.69,3.64l.28,18.07c0,2.8,4.36,3.3,4.98.5l4.31-16.67c.5-2.01,2.57-3.19,4.59-2.68,2.01.56,3.19,2.57,2.63,4.59l-4.64,16.89c-.67,2.46,2.41,4.19,4.14,2.29l7.21-8c1.17-1.34,3.3-1.34,4.53,0,1.01,1.12.95,2.85,0,4.03l-10.23,11.97v-.11Z"
                        fill="black"
                    />
                </svg>

                {/* Content in der Mitte */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-6 text-center">
                    <p className="text-sm leading-snug mb-6 lowercase text-black max-w-[240px]">
                        we use required, performance and marketing cookies to measure,
                        analyze and personalize your experience. read more in our{" "}
                        <Link href="/privacy" className="underline">
                            privacy policy
                        </Link>
                        .
                    </p>

                    <div className="flex justify-center gap-4">
                        <button
                            className="px-6 py-2 rounded-full border border-black text-sm bg-transparent text-black hover:bg-black hover:text-white transition"
                            onClick={() => setVisible(false)}
                        >
                            settings
                        </button>
                        <button
                            className="px-6 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
                            onClick={() =>
                                handleSave({
                                    necessary: true,
                                    analytics: true,
                                    marketing: true,
                                    given: true,
                                })
                            }
                        >
                            accept all
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}