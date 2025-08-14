import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import HeaderMegaMenu, {MegaMenu, MegaMenuConfig} from "@/components/nav/header/MegaMenu";

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

const NAV: Array<MegaMenuConfig | MegaMenu> = [
    {
        id: "home",
        label: "Home",
        href: "/"
    },
    {
        id: "shop",
        label: "Shop",
        columns: [
            {
                heading: "Kategorien",
                items: [
                    {
                        label: "Konfigurator",
                        href: "/shop/konfigurator",
                        description: "Konfigurieren Sie Ihre Maschine",
                        image: "/globe.svg",
                    },
                ],
            },
        ],
        promo: {
            headline: "Entdecken",
            subline: "Unsere Produkte",
            image: "/next.svg",
        },
    },
    {
        id: "maschinenfreigabe",
        label: "Maschinenfreigabe",
        columns: [
            {
                heading: "Freigaben",
                items: [
                    {
                        label: "Tür",
                        href: "/maschinenfreigabe/tuer",
                        description: "Türfreigabe verwalten",
                        image: "/file.svg",
                    }
                ]
            }
        ]
    }
]

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <HeaderMegaMenu items={NAV} />
        {children}
        </body>
        </html>
    );
}
