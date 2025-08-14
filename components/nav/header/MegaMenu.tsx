"use client";
import React, {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence, useReducedMotion} from "framer-motion";
import {ChevronDown, HelpCircle, Search, UserRound} from "lucide-react";
import MobileMenu from "./MobileMenu";

// --- Helpers ----------------------------------------------------------------
function cx(...c: Array<string | false | undefined>) {
    return c.filter(Boolean).join(" ");
}

// --- Types ------------------------------------------------------------------
type LinkItem = { label: string; href: string; description?: string };
type Column  = { heading: string; items: LinkItem[] };

export type MegaMenuConfig = {
    id: string;
    label: string;
    columns: Column[];
    promo?: { eyebrow?: string; headline: string; subline?: string };
};

export type MegaMenu = { id: string; label: string; href: string };

type HeaderProps = {
    items: Array<MegaMenuConfig | MegaMenu>;
    showTopbar?: boolean;
    salesPhone?: string;
};

// --- Component --------------------------------------------------------------
export default function HeaderMegaMenu({items, showTopbar = true, salesPhone}: HeaderProps) {
    const [openId, setOpenId] = useState<string | null>(null);
    const [hoveringPanel, setHoveringPanel] = useState(false);
    const reduceMotion = useReducedMotion();
    const closeTimer = useRef<number | null>(null);

    // Close with ESC
    useEffect(() => {
        function onKey(e: KeyboardEvent) { if (e.key === "Escape") setOpenId(null); }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    function scheduleClose() {
        if (closeTimer.current) window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => { if (!hoveringPanel) setOpenId(null); }, 90);
    }

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Topbar ------------------------------------------------------------ */}
            {showTopbar && (
                <div className="h-9 bg-neutral-800 text-neutral-200 border-b border-black/20">
                    <div className="mx-auto flex h-full max-w-7xl items-center justify-end gap-4 px-4 sm:px-6">
                        {salesPhone && (
                            <span className="hidden md:inline text-xs">Sales: {salesPhone}</span>
                        )}
                        <div className="flex items-center gap-3">
                            <a aria-label="Help" className="hover:text-white" href="/help"><HelpCircle size={16}/></a>
                            <a aria-label="Search" className="hover:text-white" href="/search"><Search size={16}/></a>
                            <a aria-label="Account" className="hover:text-white" href="/account"><UserRound size={16}/></a>
                        </div>
                    </div>
                </div>
            )}

            {/* Main bar ---------------------------------------------------------- */}
            <div className="bg-neutral-950/95 backdrop-blur border-b border-white/10">
                <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-2 sm:gap-6 px-4 sm:px-6">
                    {/* Logo */}
                    <a href="/" className="flex items-center gap-2 text-white">
                        <LogoMark/>
                        <span className="font-semibold tracking-tight">mardu</span>
                    </a>

                    {/* Nav */}
                    <nav className="hidden lg:flex items-center gap-1 mx-auto">
                        {items.map((link) => {
                            const isMega = (link as MegaMenuConfig).columns !== undefined;
                            const id = link.id;
                            const active = openId === id;

                            if (isMega) {
                                const menu = link as MegaMenuConfig;
                                return (
                                    <div key={id} className="relative" onMouseLeave={scheduleClose}>
                                        <button
                                            className={cx(
                                                "flex items-center gap-1.5 px-3 py-2 text-sm/6 font-medium rounded-md transition-colors",
                                                active ? "text-white bg-white/10" : "text-neutral-300 hover:text-white hover:bg-white/5"
                                            )}
                                            aria-expanded={active}
                                            aria-controls={`panel-${id}`}
                                            onMouseEnter={() => setOpenId(id)}
                                            onFocus={() => setOpenId(id)}
                                        >
                                            {menu.label}
                                            <ChevronDown size={14} className={cx("transition-transform", active && "rotate-180")} />
                                        </button>

                                        <AnimatePresence>
                                            {active && (
                                                <motion.div
                                                    id={`panel-${id}`}
                                                    initial={{opacity: 0, y: 6}}
                                                    animate={{opacity: 1, y: 0, transition: {duration: reduceMotion ? 0 : 0.18}}}
                                                    exit={{opacity: 0, y: 6, transition: {duration: reduceMotion ? 0 : 0.12}}}
                                                    onMouseEnter={() => setHoveringPanel(true)}
                                                    onMouseLeave={() => { setHoveringPanel(false); scheduleClose(); }}
                                                    className="absolute left-1/2 top-full w-[86vw] max-w-5xl -translate-x-1/2 pt-3"
                                                >
                                                    <div className="rounded-2xl border border-white/10 bg-neutral-950 p-6 shadow-2xl ring-1 ring-black/5">
                                                        <div className="grid grid-cols-12 gap-6">
                                                            {/* Columns */}
                                                            <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                                {menu.columns.map((col) => (
                                                                    <div key={col.heading}>
                                                                        <div className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                                                                            {col.heading}
                                                                        </div>
                                                                        <ul className="mt-3 space-y-1.5">
                                                                            {col.items.map((item) => (
                                                                                <li key={item.label}>
                                                                                    <a
                                                                                        href={item.href}
                                                                                        className="group flex items-start gap-3 rounded-lg px-2 py-2 text-sm text-neutral-200 hover:bg-white/5 hover:text-white"
                                                                                    >
                                                                                        <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-neutral-500 group-hover:bg-white" />
                                                                                        <span className="flex min-w-0 flex-col">
                                              <span className="truncate font-medium">{item.label}</span>
                                                                                            {item.description && (
                                                                                                <span className="truncate text-neutral-400">{item.description}</span>
                                                                                            )}
                                            </span>
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Promo */}
                                                            <div className="col-span-12 lg:col-span-4">
                                                                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                                                                    <div className="absolute inset-0 bg-[radial-gradient(1200px_400px_at_10%_-20%,#1a6fff22,transparent),radial-gradient(1000px_300px_at_90%_-10%,#22d3ee22,transparent)]" />
                                                                    <div className="relative p-4 md:p-5">
                                                                        {menu.promo?.eyebrow && (
                                                                            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-300">
                                                                                {menu.promo.eyebrow}
                                                                            </div>
                                                                        )}
                                                                        <div className="text-base font-semibold text-white">
                                                                            {menu.promo?.headline}
                                                                        </div>
                                                                        {menu.promo?.subline && (
                                                                            <div className="mt-1 text-sm text-neutral-300">{menu.promo.subline}</div>
                                                                        )}
                                                                        <div className="mt-4 h-40 w-full rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 ring-1 ring-white/10" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            }

                            // Simple link
                            const simple = link as MegaMenu;
                            return (
                                <a
                                    key={simple.id}
                                    href={simple.href}
                                    className="px-3 py-2 text-sm/6 font-medium text-neutral-300 hover:text-white hover:bg-white/5 rounded-md"
                                    onMouseEnter={() => setOpenId(null)}
                                >
                                    {simple.label}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Spacer on large, but keep right actions */}
                    <div className="hidden lg:block flex-1" />

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <a href="/login" className="rounded-md px-3 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5">
                            Sign in
                        </a>
                        <a href="/demo" className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                            Get demo
                        </a>
                    </div>

                    {/* Mobile burger + compact actions */}
                    <div className="ml-auto lg:hidden">
                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}

// --- Small logo -------------------------------------------------------------
function LogoMark() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="2" y="2" width="20" height="20" rx="6" className="fill-white/10" />
            <path d="M8 15.5V8.5C8 7.12 9.12 6 10.5 6H13.5C14.88 6 16 7.12 16 8.5V15.5" className="stroke-white" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="12" r="1.4" className="fill-white" />
        </svg>
    );
}
