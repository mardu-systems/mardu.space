import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import CookieConsentBanner from "@/components/CookieBanner";
import {getConsent} from "@/lib/consent";


export const metadata: Metadata = {
    title: "mardu.space",
    description: "Coming soon with contact information",
}


export default function RootLayout({children}: { children: React.ReactNode }) {
    const consent = getConsent();

    return (
        <html lang="de">
        <body className="antialiased">
        {children}
        <CookieConsentBanner/>

        {consent.analytics && (
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX`}
            />
        )}
        {consent.analytics && (
            <script
                id="ga-init"
                dangerouslySetInnerHTML={{
                    __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXX');
              `,
                }}
            />
        )}
        </body>
        </html>
    );
}

