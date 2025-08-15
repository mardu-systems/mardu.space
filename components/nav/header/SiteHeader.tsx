"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {motion, useReducedMotion} from "framer-motion";
import clsx from "clsx";

import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import Topbar, {TOPBAR_HEIGHT} from "./Topbar";
import {NavEntry} from "@/types/header";

export interface HeaderProps {
    items: NavEntry[];
    showTopbar?: boolean;
    showSearch?: boolean;
    showAccount?: boolean;
    showHelp?: boolean;
    salesPhone?: string;
    /** Light logo for dark backgrounds */
    logoLightSrc: string;
    /** Dark logo for light backgrounds / transparent over video */
    logoDarkSrc: string;
    /** Optional class for the scrolled state background */
    scrolledBgClass?: string;
}

const SCROLL_THRESHOLD = 24;
const DEFAULT_SCROLLED_BG =
    "bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60";

function useScrolled(threshold = 20) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);
    return scrolled;
}

function getHeaderBgAnimate(scrolled: boolean) {
    return {
        backgroundColor: scrolled ? "rgba(10,10,12,0.80)" : "rgba(0,0,0,0)",
        backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
    } as const;
}

export default function SiteHeader({
                                       items,
                                       showTopbar = true,
                                       showSearch = true,
                                       showAccount = true,
                                       showHelp = true,
                                       salesPhone = "+49 176 200 00 00",
                                       logoLightSrc,
                                       logoDarkSrc,
                                       scrolledBgClass = DEFAULT_SCROLLED_BG,
                                   }: HeaderProps) {
    const scrolled = useScrolled(SCROLL_THRESHOLD);
    const prefersReducedMotion = useReducedMotion();

    // Top-Offset for fixed header
    const navTopOffset = showTopbar && !scrolled ? TOPBAR_HEIGHT : 0;

    const bgAnimate = React.useMemo(() => getHeaderBgAnimate(scrolled), [scrolled]);
    const bgTransition = React.useMemo(
        () => ({duration: prefersReducedMotion ? 0 : 0.25}),
        [prefersReducedMotion]
    );

    return (
        <header>
            {showTopbar && (
                <Topbar
                    showSearch={showSearch}
                    showAccount={showAccount}
                    showHelp={showHelp}
                    salesPhone={salesPhone}
                />
            )}

            <div
                className={clsx(
                    "fixed inset-x-0 z-50 border-b border-transparent transition-colors  duration-200",
                    scrolled && "border-white/10"
                )}
                style={{top: navTopOffset}}
            >
                <motion.div
                    aria-hidden
                    initial={false}
                    animate={bgAnimate}
                    transition={bgTransition}
                    className={clsx("absolute inset-0", scrolled && scrolledBgClass)}
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex h-20 items-center gap-3">
                        <div className="flex items-center">
                            <Link href="/" aria-label="Mardu Home" className="block">
                                <div className="relative h-16 w-[200px]">
                                    <Image
                                        src={logoDarkSrc}
                                        alt="Mardu Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="flex flex-1 md:hidden">
                            <MobileNav items={items}/>
                        </div>

                        <DesktopNav items={items}/>
                    </nav>
                </div>
            </div>
        </header>
    );
}
