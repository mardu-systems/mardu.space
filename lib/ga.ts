import ReactGA from "react-ga4";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
let initialized = false;

export function initializeGA() {
    if (!initialized && GA_ID) {
        ReactGA.initialize(GA_ID);
        initialized = true;
    }
}

export function pageview(path: string) {
    if (!initialized) return;
    ReactGA.send({ hitType: "pageview", page: path });
}

export function event(action: string, params?: Record<string, unknown>) {
    if (!initialized) return;
    ReactGA.event(action, params);
}

export function resetGA() {
    initialized = false;
}
