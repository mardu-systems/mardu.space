import type {Metadata, Viewport} from "next";
import "./globals.css";
import React from "react";
import CookieConsentBanner from "@/components/CookieBanner";
import TrackingProvider from "@/components/TrackingProvider";
import RecaptchaProvider from "@/components/RecaptchaProvider";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#ffffff",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://mardu.space"),
    title: {
        default: "mardu.space – Zugriffskontrollsysteme für Makerspaces",
        template: "%s | mardu.space",
    },
    description:
        "mardu.space bietet sichere Zutritts- und Zugriffskontrollen mit eigener Hard- und Software sowie einer europaweit anerkannten Kenntnisdatenbank.",
    keywords: [
        "Zugriffskontrollsysteme",
        "Makerspace",
        "FabLab",
        "Schülerlabor",
        "Open Education Badges",
    ],
    alternates: {
        canonical: "https://mardu.space",
    },
    icons: {
        icon: [
            {url: "/favicon/favicon.ico", sizes: "any"},
            {url: "/favicon/favicon.svg", type: "image/svg+xml"},
            {url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png"},
            {url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png"}
        ],
        apple: [{url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png"}],
        shortcut: [{url: "/favicon/favicon.ico"}],
    },
    manifest: "/site.webmanifest",
    openGraph: {
        title: "mardu.space – Zugriffskontrollsysteme für Makerspaces",
        description:
            "Sichere Zutritts- und Zugriffskontrollen für Makerspaces, FabLabs und Schülerlabore.",
        url: "https://mardu.space",
        siteName: "mardu.space",
        locale: "de_DE",
        type: "website",
        images: [
            {
                url: "/_A7_9072_quer.jpg",
                width: 1200,
                height: 630,
                alt: "Zugriffskontrollsysteme für Makerspaces",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "mardu.space – Zugriffskontrollsysteme für Makerspaces",
        description:
            "Sichere Zutritts- und Zugriffskontrollen für Makerspaces, FabLabs und Schülerlabore.",
        images: ["/_A7_9072_quer.jpg"],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "mardu.space",
    url: "https://mardu.space",
    publisher: {
        "@type": "Organization",
        name: "mardu.space",
        url: "https://mardu.space",
        logo: "https://mardu.space/marduspace_logo_bg_white.svg",
    },
};


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="de">
        <head>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
            />
        </head>
        <body className="antialiased overflow-x-hidden">
        <RecaptchaProvider>
            <TrackingProvider>
                {children}
                <CookieConsentBanner/>
            </TrackingProvider>
        </RecaptchaProvider>
        </body>
        </html>
    );
}

