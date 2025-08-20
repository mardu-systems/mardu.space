"use client";

import {Menu} from "lucide-react";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import {NavEntry} from "@/types/header";

export default function MobileNav({
                                      items,
                                      variant = "light",
                                  }: {
    items: NavEntry[];
    variant?: "dark" | "light";
}) {
    const iconColor =
        variant === "light"
            ? "text-neutral-900 hover:text-neutral-700"
            : "text-white hover:text-white/90";

    const linkColor = "text-white/90 hover:text-white";

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={clsx(
                        iconColor,
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        variant === "light"
                            ? "focus-visible:ring-neutral-900 focus-visible:ring-offset-white"
                            : "focus-visible:ring-white focus-visible:ring-offset-neutral-950"
                    )}
                >
                    <Menu className="h-5 w-5"/>
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-[85vw] max-w-sm p-0 bg-radial-[at_5%_5%] from-zinc-900 from-70% to-[#37093F] text-white border-0 flex flex-col"
            >
                {/* Header mit Close-Button */}
                <SheetHeader className="flex items-center justify-between">
                    <SheetTitle className="text-white tracking-wide uppercase">
                        Navigation
                    </SheetTitle>
                </SheetHeader>

                {/* Navigation */}
                <nav className="px-2 pb-8 flex-1 overflow-y-auto">
                    <Accordion type="multiple" className="w-full divide-y divide-white/5">
                        {items.map((entry) => (
                            <div key={entry.label}>
                                {entry.type === "link" ? (
                                    <Link
                                        href={entry.href}
                                        className={clsx(
                                            "h-12 rounded-md px-4 font-futura-normal uppercase flex items-center",
                                            linkColor,
                                            "hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                                        )}
                                    >
                                        {entry.label}
                                    </Link>
                                ) : (
                                    <AccordionItem value={entry.label} className="border-0">
                                        <AccordionTrigger
                                            className={clsx(
                                                "h-12 px-4 font-futura-normal uppercase hover:no-underline",
                                                linkColor
                                            )}
                                        >
                                            {entry.label}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-1 px-2 pb-3">
                                                {entry.items.map((item) => (
                                                    <li key={item.label}>
                                                        <Link
                                                            href={item.href || "#"}
                                                            className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                                                        >
                                                            {item.image && (
                                                                <Image
                                                                    src={item.image.src}
                                                                    alt={
                                                                        item.image.alt ||
                                                                        `${item.label} image`
                                                                    }
                                                                    width={56}
                                                                    height={40}
                                                                    className="h-10 w-14 rounded object-cover"
                                                                    loading="lazy"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-futura-normal">{item.label}</div>
                                                                {item.description && (
                                                                    <p className="text-xs text-neutral-400">
                                                                        {item.description}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                )}
                            </div>
                        ))}
                    </Accordion>
                </nav>

                {/* Optionaler CTA / Footer */}
                <div className="mt-auto p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
                    <Button className="w-full h-12 font-lg font-futura-normal">Konfigurator starten</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}