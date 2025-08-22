"use client";

import * as React from "react";

declare global {
    interface Window {
        grecaptcha?: {
            ready(cb: () => void): void;
            execute(siteKey: string, options: { action: string }): Promise<string>;
        };
    }
}

export function useRecaptcha() {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    React.useEffect(() => {
        if (!siteKey) return;
        if (typeof window === "undefined") return;
        if (window.grecaptcha) return;
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }, [siteKey]);

    return React.useCallback(async (action: string) => {
        if (!siteKey || typeof window === "undefined" || !window.grecaptcha) {
            return null;
        }
        await new Promise<void>((resolve) => window.grecaptcha!.ready(resolve));
        return window.grecaptcha!.execute(siteKey, {action});
    }, [siteKey]);
}

