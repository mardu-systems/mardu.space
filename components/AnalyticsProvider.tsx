"use client";

import { useEffect, type ReactNode } from "react";
import { useConsent } from "@/hooks/use-consent";
import { initializeGA, pageview } from "@/lib/ga";

export default function AnalyticsProvider({ children }: { children: ReactNode }) {
    const { prefs } = useConsent();

    useEffect(() => {
        if (prefs?.analytics) {
            initializeGA();
            pageview(window.location.pathname + window.location.search);
        }
    }, [prefs]);

    return <>{children}</>;
}
