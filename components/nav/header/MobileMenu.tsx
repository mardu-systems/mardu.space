"use client";

import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {MenuIcon, XIcon} from "lucide-react";
import React, {useState} from "react";

interface MobileMenuProps {
    title?: string;
    menuItems?: {
        href: string;
        label: string;
    }[];
    signInHref?: string;
    signInLabel?: string;
    demoHref?: string;
    demoLabel?: string;
}

export default function MobileMenu({
                                       title = "mardu",
                                       menuItems = [
                                           {href: "/products", label: "Products"},
                                           {href: "/solutions", label: "Solutions"},
                                           {href: "/resources", label: "Resources"},
                                           {href: "/customers", label: "Customers"},
                                           {href: "/partners", label: "Partners"},
                                           {href: "/pricing", label: "Pricing"}
                                       ],
                                       signInHref = "/login",
                                       signInLabel = "Sign in",
                                       demoHref = "/demo",
                                       demoLabel = "Get demo"
                                   }: MobileMenuProps) {
    const [open, setOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    return (
        <>
            <button
                className="inline-flex items-center justify-center rounded-md border border-white/10 p-2 text-neutral-200 hover:bg-white/5"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                <span className="sr-only">Toggle menu</span>
                <MenuIcon/>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1, transition: {duration: reduceMotion ? 0 : 0.15}}}
                        exit={{opacity: 0, transition: {duration: reduceMotion ? 0 : 0.1}}}
                        className="fixed inset-0 z-50 bg-black/40"
                        onClick={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{x: "100%"}}
                        animate={{x: 0, transition: {duration: reduceMotion ? 0 : 0.2}}}
                        exit={{x: "100%", transition: {duration: reduceMotion ? 0 : 0.15}}}
                        className="fixed inset-y-0 right-0 z-50 w-[85vw] max-w-sm overflow-y-auto border-l border-white/10 bg-neutral-950 p-6"
                        aria-label="Mobile navigation"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-white">
                                <span className="font-semibold tracking-tight">{title}</span>
                            </div>
                            <button
                                className="rounded-md border border-white/10 p-2 text-neutral-300 hover:bg-white/5"
                                onClick={() => setOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XIcon/>
                            </button>
                        </div>

                        <nav className="mt-6 space-y-1">
                            {menuItems.map((item) => (
                                <a key={item.href}
                                   className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-white/5"
                                   href={item.href}>
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        <div className="mt-6">
                            <a href={signInHref}
                               className="block rounded-md px-3 py-2 text-sm text-neutral-200 hover:bg-white/5">{signInLabel}</a>
                            <a href={demoHref}
                               className="mt-2 block rounded-full bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-500">{demoLabel}</a>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}