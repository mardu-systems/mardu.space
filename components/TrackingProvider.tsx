"use client";

import { useEffect, type ReactNode } from "react";
import { useConsent } from "@/hooks/use-consent";
import { initializeGA, pageview, resetGA } from "@/lib/ga";

const MARKETING_SCRIPT_URL = process.env.NEXT_PUBLIC_MARKETING_SCRIPT_URL;

export default function TrackingProvider({ children }: { children: ReactNode }) {
    const { prefs } = useConsent();

    useEffect(() => {
        if (prefs?.analytics) {
            initializeGA();
            pageview(window.location.pathname + window.location.search);
            return;
        }
        resetGA();
        const script = document.querySelector<HTMLScriptElement>(
            'script[src^="https://www.googletagmanager.com/gtag/js"]',
        );
        script?.remove();
    }, [prefs?.analytics]);

    useEffect(() => {
        if (!prefs?.marketing || !MARKETING_SCRIPT_URL) return;
        const script = document.createElement("script");
        script.src = MARKETING_SCRIPT_URL;
        script.async = true;
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, [prefs?.marketing]);

    return <>{children}</>;
}
