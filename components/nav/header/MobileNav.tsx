"use client";

import { Menu } from "lucide-react";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import clsx from "clsx";
import { NavEntry } from "@/types/header";

export default function MobileNav({ items, variant = "dark" }: { items: NavEntry[]; variant?: "dark" | "light" }) {
    const iconColor =
        variant === "light" ? "text-neutral-900 hover:text-neutral-700" : "text-white hover:text-white/90";

    const linkColor = variant === "light" ? "text-neutral-900" : undefined;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={iconColor}>
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm p-0">
                <SheetHeader className="px-4 pb-2 pt-4">
                    <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="px-2 pb-8">
                    <Accordion type="multiple" className="w-full">
                        {items.map((entry) => (
                            <div key={entry.label}>
                                {entry.type === "link" ? (
                                    <Link
                                        href={entry.href}
                                        className={clsx(
                                            "block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted uppercase",
                                            linkColor
                                        )}
                                    >
                                        {entry.label}
                                    </Link>
                                ) : (
                                    <AccordionItem value={entry.label}>
                                        <AccordionTrigger
                                            className={clsx(
                                                "px-3 py-2 text-sm font-medium uppercase",
                                                linkColor
                                            )}
                                        >
                                            {entry.label}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-1 px-3 pb-3">
                                                {entry.items.map((item) => (
                                                    <li key={item.label}>
                                                        <Link
                                                            href={item.href || "#"}
                                                            className="flex items-center gap-3 rounded-md p-2 text-sm hover:bg-muted"
                                                        >
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            {item.image ? (
                                                                <img
                                                                    src={item.image.src}
                                                                    alt={item.image.alt || ""}
                                                                    className="h-10 w-14 rounded object-cover"
                                                                />
                                                            ) : null}
                                                            <div>
                                                                <div className="font-medium">{item.label}</div>
                                                                {item.description ? (
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {item.description}
                                                                    </p>
                                                                ) : null}
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
            </SheetContent>
        </Sheet>
    );
}
