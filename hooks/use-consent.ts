import * as React from "react";
import type { ConsentPreferences } from "@/types/consent";
import { setConsent } from "@/lib/consent";

const DEFAULT_PREFS: ConsentPreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    given: false,
};

export function useConsent() {
    const [prefs, setPrefsState] = React.useState<ConsentPreferences | null>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/consent");
                const data = (await res.json()) as ConsentPreferences;
                setPrefsState(data ?? DEFAULT_PREFS);
            } catch {
                setPrefsState(DEFAULT_PREFS);
            }
        })();
    }, []);

    const setPrefs = React.useCallback(async (newPrefs: ConsentPreferences) => {
        setPrefsState(newPrefs);
        await setConsent(newPrefs);
    }, []);

    return { prefs, setPrefs } as const;
}
