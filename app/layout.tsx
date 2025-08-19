import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import CookieConsentBanner from "@/components/CookieBanner";
import TrackingProvider from "@/components/TrackingProvider";


export const metadata: Metadata = {
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
            <body className="antialiased">
                <TrackingProvider>
                    {children}
                    <CookieConsentBanner />
                </TrackingProvider>
            </body>
        </html>
    );
}

