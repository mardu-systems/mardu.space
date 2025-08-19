"use client"
import SiteHeader from "@/components/nav/header/SiteHeader";
import {defaultHeaderItems} from "@/app/defaultHeaderItems";
import SiteFooter from "@/components/nav/footer/footer";
import React from "react";
import {defaultFooterMetaLinks, defaultFooterNavLinks} from "@/app/defaultFooterItems";
import dynamic from "next/dynamic";
import {usePathname} from "next/navigation";

export type HeaderVariant = "dark" | "light";

const MotionDiv = dynamic(
    () => import("framer-motion").then((mod) => mod.motion.div),
    {ssr: false}
);

const AnimatePresence = dynamic(
    () => import("framer-motion").then((mod) => mod.AnimatePresence),
    {ssr: false}
);

export default function SiteShell({
                                      children,
                                      headerVariant = "dark",
                                  }: {
    children: React.ReactNode;
    headerVariant?: HeaderVariant;
}) {
    const pathname = usePathname();
    // Daten-Attribut optional, falls du CSS abhängig davon schreiben willst
    return (
        <div data-header-variant="light">
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
                <AnimatePresence mode="wait">
                    <MotionDiv
                        key={pathname}
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.25, ease: "easeOut"}}
                    >
                        {children}
                    </MotionDiv>
                </AnimatePresence>
            </div>
            <SiteFooter navLinks={defaultFooterNavLinks} metaLinks={defaultFooterMetaLinks}/>
        </div>
    );
}