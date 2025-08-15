"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { MegaGroup } from "@/types/header";

export default function MegaContent({ group }: { group: MegaGroup }) {
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
                                     className="pointer-events-none absolute inset-0"
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
