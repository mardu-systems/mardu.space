"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import React from "react";
import MegaContent from "./MegaContent";
import {NavEntry} from "@/types/header";

interface DesktopNavProps {
    items: NavEntry[];
}

export default function DesktopNav({ items }: DesktopNavProps) {
    return (
        <div className="hidden md:flex md:flex-1 md:items-center md:gap-1 md:justify-end">
            {items.map((entry) => (
                <DesktopNavEntry key={entry.label} entry={entry} />
            ))}
        </div>
    );
}

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
