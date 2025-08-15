"use client";

import React from "react";
import {useHeaderVariant} from "@/components/HeaderVariantContext";
import SiteHeader from "@/components/nav/header/SiteHeader";
import {defaultHeaderItems} from "@/app/defaultHeaderItems";
import SiteFooter from "@/components/nav/footer/footer";
import CookieBanner from "@/components/CookieBanner";

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { variant } = useHeaderVariant();

    return (
        <>
            <SiteHeader
                items={defaultHeaderItems}
                logoLightSrc="marduspace_logo_bg_black.svg"
                variant={variant}
                logoDarkSrc="marduspace_logo_bg_white.svg"
                showTopbar={false}
            />
            <div
                className="bg-gradient-to-br from-zinc-200 to-purple-50"
                data-theme={variant}
                style={{colorScheme: variant}}
            >
                {children}
            </div>
            <SiteFooter/>
            <CookieBanner/>
        </>
    );
}