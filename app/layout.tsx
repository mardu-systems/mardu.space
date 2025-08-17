import type {Metadata} from "next";
import "./globals.css";
import React from "react";
import CookieConsentBanner from "@/components/CookieBanner";
import AnalyticsProvider from "@/components/AnalyticsProvider";


export const metadata: Metadata = {
    title: "mardu.space",
    description: "Coming soon with contact information",
}


export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="de">
            <body className="antialiased">
                <AnalyticsProvider>
                    {children}
                    <CookieConsentBanner />
                </AnalyticsProvider>
            </body>
        </html>
    );
}

