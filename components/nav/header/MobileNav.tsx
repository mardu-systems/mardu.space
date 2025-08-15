"use client";

import {Menu, X} from "lucide-react";
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

    const linkColor =
        variant === "light" ? "text-neutral-900" : "text-white/90 hover:text-white";

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
                className="w-[85vw] max-w-sm p-0 bg-neutral-950 text-white border-0 flex flex-col"
            >
                {/* Header mit Close-Button */}
                <SheetHeader className="flex items-center justify-between px-4 pt-[env(safe-area-inset-top)] pb-2">
                    <SheetTitle className="text-base font-semibold tracking-wide uppercase">
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
                                            "block h-12 rounded-md px-4 text-base font-medium uppercase flex items-center",
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
                                                "h-12 px-4 text-base font-medium uppercase hover:no-underline",
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
                                                                // eslint-disable-next-line @next/next/no-img-element
                                                                <img
                                                                    src={item.image.src}
                                                                    alt={item.image.alt || ""}
                                                                    className="h-10 w-14 rounded object-cover"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-medium">{item.label}</div>
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
                <div className="mt-auto p-4 pb-">
                    <Button className="w-full h-12 text-base">Konfigurator starten</Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}