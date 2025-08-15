import SiteHeader from "@/components/nav/header/SiteHeader";
import {defaultHeaderItems} from "@/app/defaultHeaderItems";
import SiteFooter from "@/components/nav/footer/footer";
import CookieBanner from "@/components/CookieBanner";
import React from "react";

export type HeaderVariant = "dark" | "light";

export default function SiteShell({
                                      children,
                                      headerVariant = "dark",
                                  }: {
    children: React.ReactNode;
    headerVariant?: HeaderVariant;
}) {
    // Daten-Attribut optional, falls du CSS abhängig davon schreiben willst
    return (
        <div data-header-variant={headerVariant}>
            <SiteHeader
                items={defaultHeaderItems}
                logoLightSrc="/marduspace_logo_bg_black.svg"
                variant={headerVariant}
                logoDarkSrc="/marduspace_logo_bg_white.svg"
                showTopbar={false}
            />
            <div
                className="bg-gradient-to-br from-zinc-200 to-purple-50"
                data-theme="light"
                style={{colorScheme: "light"}}
            >
                {children}
            </div>
            <SiteFooter/>
            <CookieBanner/>
        </div>
    );
}