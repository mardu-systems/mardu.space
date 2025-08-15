export const ANALYTICS_CONSENT_COOKIE = "analytics_consent";
export const ANALYTICS_CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
export const ANALYTICS_CONSENT_EVENT = "consent:granted";

export function hasAnalyticsConsent(): boolean {
    if (typeof document === "undefined") return false;
    return document.cookie
        .split("; ")
        .some((row) => row.startsWith(`${ANALYTICS_CONSENT_COOKIE}=true`));
}
