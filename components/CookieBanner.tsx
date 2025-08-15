"use client";

import {useEffect} from "react";
import Link from "next/link";
import CookieConsent, {getCookieConsentValue} from "react-cookie-consent";
import ReactGA from "react-ga4";

const GA_ID = "G-XXXXXXX";
let analyticsInitialized = false;

function initAnalytics() {
    if (analyticsInitialized) return;
    ReactGA.initialize(GA_ID);
    ReactGA.send("pageview");
    analyticsInitialized = true;
}

export default function CookieBanner() {
    useEffect(() => {
        if (getCookieConsentValue() === "true") {
            initAnalytics();
        }
    }, []);

    return (
        <CookieConsent
            enableDeclineButton
            buttonText="Akzeptieren"
            declineButtonText="Ablehnen"
            onAccept={initAnalytics}
            cookieName="cookieConsent">
            Wir verwenden Cookies, um unsere Website zu verbessern. Mehr in unserer{" "}
            <Link href="/privacy" className="underline">
                Datenschutzerklärung
            </Link>
            .
        </CookieConsent>
    );
}

