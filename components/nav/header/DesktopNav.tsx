"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import React from "react";
import clsx from "clsx";
import MegaContent from "./MegaContent";
import {NavEntry} from "@/types/header";

interface DesktopNavProps {
    items: NavEntry[];
    variant?: "dark" | "light";
}

export default function DesktopNav({ items, variant = "dark" }: DesktopNavProps) {
    return (
        <div className="hidden md:flex md:flex-1 md:items-center md:gap-1 md:justify-end">
            {items.map((entry) => (
                <DesktopNavEntry key={entry.label} entry={entry} variant={variant} />
            ))}
        </div>
    );
}

function DesktopNavEntry({ entry, variant }: { entry: NavEntry; variant: "dark" | "light" }) {
    const palette =
        variant === "light"
            ? {
                text: "text-neutral-900 hover:text-neutral-700",
                underline: "bg-neutral-900/50 group-hover:bg-neutral-900/80",
                ring: "focus-visible:ring-neutral-900 focus-visible:ring-offset-white",
                offset: "focus-visible:ring-offset-2",
            }
            : {
                text: "text-white/90 hover:text-white",
                underline: "bg-white/50 group-hover:bg-white/80",
                ring: "focus-visible:ring-white/70 focus-visible:ring-offset-neutral-900",
                offset: "focus-visible:ring-offset-2",
            };

    if (entry.type === "link") {
        return (
            <Link
                href={entry.href}
                className={clsx(
                    "group relative rounded-lg px-4 py-3 text-sm font-medium uppercase",
                    "focus-visible:outline-none", palette.ring, palette.offset,
                    palette.text
                )}
            >
                {entry.label}
                <span
                    className={clsx(
                        "absolute inset-x-2 -bottom-0.5 h-px scale-x-0 transition-transform duration-200 group-hover:scale-x-100",
                        palette.underline
                    )}
                />
            </Link>
        );
    }

    // Trigger für Mega-Menü
    return (
        <HoverCard openDelay={50} closeDelay={80}>
            <HoverCardTrigger asChild>
                <button
                    aria-haspopup="menu"
                    className={clsx(
                        "group flex items-center gap-1 rounded-lg px-4 py-3 text-sm font-medium uppercase outline-none",
                        "focus-visible:outline-none", palette.ring, palette.offset,
                        palette.text
                    )}
                >
                    {entry.label}
                    <ChevronDown className="h-4 w-4 transition group-data-[state=open]:rotate-180" />
                </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-full border border-white/10 bg-neutral-950 p-0 text-white shadow-2xl backdrop-blur-xl">
                <MegaContent group={entry} />
            </HoverCardContent>
        </HoverCard>
    );
}
