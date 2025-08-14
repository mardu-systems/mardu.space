"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronRight, ArrowRight, HelpCircle, Search, UserRound } from "lucide-react";
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import MobileNav from "@/components/nav/header/MobileMenu";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type NavItem = {
    label: string;
    href?: string;
    description?: string;
    image?: { src: string; alt?: string; aspect?: "wide" | "square" };
    badge?: string;
};

export type MegaGroup = {
    type: "mega";
    label: string;
    hero?: { src: string; alt?: string; caption?: string };
    items: NavItem[];
};

export type SimpleLink = {
    type: "link";
    label: string;
    href: string;
};

export type NavEntry = MegaGroup | SimpleLink;

export type HeaderProps = {
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
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TOPBAR_HEIGHT = 36; // px, entspricht Tailwind h-9
const SCROLL_THRESHOLD = 24;
const DEFAULT_SCROLLED_BG =
    "bg-neutral-950/80 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60";

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function useScrolled(threshold = 20) {
    const [scrolled, setScrolled] = React.useState(false);
    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
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

// ---------------------------------------------------------------------------
// Header Component
// ---------------------------------------------------------------------------
export default function HeaderMegaMenu({
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

    // Top-Offset für den fixierten Header: wenn Topbar sichtbar und nicht gescrolled,
    // sitzt der Header direkt unter der Topbar; nach Scroll wandert er nach oben (top: 0).
    const navTopOffset = showTopbar && !scrolled ? TOPBAR_HEIGHT : 0;

    const bgAnimate = React.useMemo(() => getHeaderBgAnimate(scrolled), [scrolled]);
    const bgTransition = React.useMemo(
        () => ({ duration: prefersReducedMotion ? 0 : 0.25 }),
        [prefersReducedMotion]
    );

    return (
        <header>
            {showTopbar && (
                <div
                    className="bg-neutral-800 text-neutral-200 border-b border-black/20"
                    style={{ height: TOPBAR_HEIGHT }}
                >
                    <div className="mx-auto flex h-full max-w-7xl items-center justify-end gap-4 px-4 sm:px-6">
                        {salesPhone && (
                            <span className="hidden md:inline text-xs">Sales: {salesPhone}</span>
                        )}
                        <div className="flex items-center gap-3">
                            {showHelp && (
                                <a aria-label="Help" className="hover:text-white" href="/help">
                                    <HelpCircle size={16} />
                                </a>
                            )}
                            {showSearch && (
                                <a aria-label="Search" className="hover:text-white" href="/search">
                                    <Search size={16} />
                                </a>
                            )}
                            {showAccount && (
                                <a aria-label="Account" className="hover:text-white" href="/account">
                                    <UserRound size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div
                className={clsx(
                    "fixed inset-x-0 z-50 border-b border-transparent transition-colors transition-[top] duration-200",
                    scrolled && "border-white/10"
                )}
                style={{ top: navTopOffset }}
            >
                {/* Hintergrund-Layer */}
                <motion.div
                    aria-hidden
                    initial={false}
                    animate={bgAnimate}
                    transition={bgTransition}
                    className={clsx("absolute inset-0", scrolled && scrolledBgClass)}
                />

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex h-20 items-center gap-3">
                        {/* Left side: logo */}
                        <div className="flex items-center">
                            <Link href="/" aria-label="Mardu Home" className="block">
                                {/* Show contrasting logo depending on background */}
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

                        {/* Mobile trigger (left) */}
                        <div className="flex flex-1 md:hidden">
                            <MobileNav items={items} />
                        </div>

                        {/* Desktop nav (right) */}
                        <div className="hidden md:flex md:flex-1 md:items-center md:gap-1 md:justify-end">
                            {items.map((entry) => (
                                <DesktopNavEntry key={entry.label} entry={entry} />
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

// ---------------------------------------------------------------------------
// Desktop Nav Entries
// ---------------------------------------------------------------------------
function DesktopNavEntry({ entry }: { entry: NavEntry }) {
    if (entry.type === "link") {
        return (
            <Link
                href={entry.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:text-white capitalize"
            >
                {entry.label}
                <span className="absolute inset-x-2 -bottom-0.5 h-px scale-x-0 bg-white/50 transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
        );
    }

    // Mega
    return (
        <HoverCard openDelay={50} closeDelay={80}>
            <HoverCardTrigger asChild>
                <button className="group flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-white/90 outline-none transition hover:text-white">
                    {entry.label}
                    <ChevronDown className="h-4 w-4 transition group-data-[state=open]:rotate-180" />
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-[min(92vw,980px)] border-white/10 bg-neutral-950 p-0 text-white shadow-2xl backdrop-blur-xl">
                <MegaContent group={entry} />
            </HoverCardContent>
        </HoverCard>
    );
}

function MegaContent({ group }: { group: MegaGroup }) {
    const prefersReducedMotion = useReducedMotion();
    return (
        <AnimatePresence initial={false} mode="wait">
            <motion.div
                key={group.label + (group.hero ? "-hero" : "-grid")}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.16, ease: "easeOut" }}
                className="overflow-hidden"
            >
                {group.hero ? (
                    <div className="grid grid-cols-1 gap-0 md:grid-cols-5">
                        {/* Hero image across full dropdown width */}
                        <div className="relative col-span-3 h-56 w-full md:h-64">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={group.hero.src}
                                alt={group.hero.alt || ""}
                                className="h-full w-full object-cover"
                                loading="eager"
                            />
                            {group.hero.caption ? (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-sm text-white/90">
                                    {group.hero.caption}
                                </div>
                            ) : null}
                        </div>

                        {/* Links */}
                        <div className="col-span-2 p-2 md:p-3">
                            <ul className="grid grid-cols-1 divide-y divide-white/5">
                                {group.items.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href || "#"}
                                            className="group flex items-center gap-3 rounded-lg p-3 transition hover:bg-white/5"
                                        >
                                            {item.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={item.image.src}
                                                    alt={item.image.alt || ""}
                                                    className={clsx(
                                                        "h-12 w-16 rounded-md object-cover ring-1 ring-white/10",
                                                        item.image.aspect === "square" && "h-12 w-12"
                                                    )}
                                                />
                                            ) : (
                                                <span className="flex h-12 w-16 items-center justify-center rounded-md bg-white/5">
                          <ChevronRight className="h-5 w-5" />
                        </span>
                                            )}
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-white">{item.label}</div>
                                                {item.description ? (
                                                    <p className="line-clamp-2 text-xs text-white/70">{item.description}</p>
                                                ) : null}
                                            </div>
                                            <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    // Grid with per-item images
                    <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2 md:grid-cols-3">
                        {group.items.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href || "#"}
                                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {item.image ? (
                                    <img
                                        src={item.image.src}
                                        alt={item.image.alt || ""}
                                        className="h-32 w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="flex h-32 w-full items-center justify-center bg-white/5">
                                        <ChevronRight className="h-6 w-6" />
                                    </div>
                                )}
                                <div className="p-3">
                                    <div className="text-sm font-medium text-white">{item.label}</div>
                                    {item.description ? (
                                        <p className="mt-1 line-clamp-2 text-xs text-white/70">{item.description}</p>
                                    ) : null}
                                </div>
                                <motion.div
                                    aria-hidden
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.15 }}
                                    className="pointer-events-none absolute inset-0 bg-white/10"
                                />
                            </Link>
                        ))}
                    </div>
                )}

                <Separator className="mx-3 opacity-10" />
                <div className="flex items-center justify-between px-3 py-2 text-xs text-white/60">
                    <span>Explore more from Mardu</span>
                    <Link href="/produkte" className="inline-flex items-center gap-1 hover:text-white">
                        Alle Produkte <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}