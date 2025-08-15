import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React from "react";
import {HeaderVariantProvider} from "@/components/HeaderVariantContext";
import LayoutContent from "@/app/LayoutContent";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "mardu.space",
    description: "Coming soon with contact information",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="de">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderVariantProvider>
            <LayoutContent>
                {children}
            </LayoutContent>
        </HeaderVariantProvider>
        </body>
        </html>
    );
}

