import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import HeaderMegaMenu, {MegaMenu, MegaMenuConfig} from "@/components/nav/header/MegaMenu";
import {Footer} from "react-day-picker";
import SiteFooter from "@/components/nav/footer/footer";

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
                        description: "Konfigurieren Sie Ihre Maschine"
                    }
                ]
            }
        ]
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
                        description: "Türfreigabe verwalten"
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
        <HeaderMegaMenu items={NAV} showTopbar salesPhone="+49 152 021 89 213" showSearch={false}/>
        {children}
        <SiteFooter/>
        </body>
        </html>
    );
}
