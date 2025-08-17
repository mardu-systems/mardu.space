import ReactGA from "react-ga4";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID;
let initialized = false;

export function initializeGA() {
    if (!MEASUREMENT_ID) {
        console.warn("GOOGLE_MEASUREMENT_ID is not set; analytics disabled");
        return;
    }

    if (!initialized) {
        ReactGA.initialize(MEASUREMENT_ID);
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
