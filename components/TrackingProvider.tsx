"use client";

import {type ReactNode, useEffect, useRef} from "react";
import {useConsent} from "@/hooks/use-consent";
import {initializeGA, pageview, resetGA} from "@/lib/ga";

const MARKETING_SCRIPT_URL = process.env.NEXT_PUBLIC_MARKETING_SCRIPT_URL;

const MARKETING_COOKIES = ["_fbp", "_gcl_au", "IDE", "uuid2"];

function clearMarketingCookies() {
    document.cookie.split(";").forEach((cookie) => {
        const [name] = cookie.split("=");
        const trimmed = name?.trim();
        if (
            trimmed &&
            MARKETING_COOKIES.some((c) => trimmed.startsWith(c))
        ) {
            document.cookie = `${trimmed}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        }
    });
}

export default function TrackingProvider({children}: { children: ReactNode }) {
    const {prefs} = useConsent();
    const prevMarketing = useRef<boolean | null>(null);

    useEffect(() => {
        if (prefs?.analytics) {
            (async () => {
                await initializeGA();
                pageview(window.location.pathname + window.location.search);
            })();
            return;
        }
        resetGA();
        const script = document.querySelector<HTMLScriptElement>(
            'script[src^="https://www.googletagmanager.com/gtag/js"]',
        );
        script?.remove();
    }, [prefs?.analytics]);

    useEffect(() => {
        const current = prefs?.marketing ?? null;
        const prev = prevMarketing.current;
        if (prev && !current) {
            clearMarketingCookies();
        }
        prevMarketing.current = current;
    }, [prefs?.marketing]);

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
