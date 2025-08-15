import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/nav/footer/footer";
import HeaderMegaMenu, {NavEntry} from "@/components/nav/header/MegaMenu";
import React from "react";
import CookieBanner from "@/components/CookieBanner";

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

const defaultHeaderItems: NavEntry[] = [
    {type: "link", label: "Home", href: "/"},
    {type: "link", label: "Konfigurator", href: "/konfigurator"},
    {
        type: "mega",
        label: "Shop",
        hero: {
            src: "_A7_8631.JPG",
            alt: "Maschinen- & Türfreigaben, Zeiterfassung",
            caption: "Zentrale Verwaltung für Zugriffsrechte und Zeiterfassung",
        },
        items: [
            {
                label: "Maschinenfreigaben",
                href: "/produkte/maschinenfreigaben",
                description:
                    "Sichere Freigaben für Maschinen inkl. Qualifikationsprüfung und Protokollierung.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
            {
                label: "Türfreigaben",
                href: "/produkte/tuerfreigaben",
                description: "Elektronische Zutrittskontrolle für Türen, Tore und Schränke.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
            {
                label: "Zeiterfassung",
                href: "/produkte/zeiterfassung",
                description: "Intuitive Buchung am Gerät, App oder Web – live synchronisiert.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
        ],
    },
    {type: "link", label: "Kontakt", href: "/kontakt"},

];

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <HeaderMegaMenu items={defaultHeaderItems} logoLightSrc="marduspace_logo_bg_white.svg"
                        logoDarkSrc="marduspace_logo_bg_black.svg" showTopbar={false}/>
        <div className="light" data-theme="light" style={{colorScheme: "light"}}>
            {children}
        </div>
        <SiteFooter/>
        <CookieBanner/>
        </body>
        </html>
    );
}
