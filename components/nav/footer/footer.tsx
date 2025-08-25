"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/components/nav/footer/newsletter-form";

/* ---------- Footer Props ---------- */
export type FooterLink = {
    href: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
type SiteFooterProps = {
    navLinks?: ReadonlyArray<FooterLink>;
    metaLinks?: ReadonlyArray<FooterLink>;
};

/* ------------------------------ Component ------------------------------ */
export default function SiteFooter({
                                       navLinks = [],
                                       metaLinks = [],
                                   }: SiteFooterProps) {
    return (
        <footer
            className="w-full text-neutral-50 bg-[radial-gradient(ellipse_at_5%_50%,hsl(240,5%,10%)_0%,hsl(240,5%,10%)_70%,#37093F_100%)]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="flex items-center justify-start py-10 md:py-12">
                    <Image
                        src="/marduspace_logo_bg_black.svg"
                        alt="MARDU SPACE"
                        width={240}
                        height={45}
                        sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 240px"
                        className="h-auto w-[clamp(120px,22vw,240px)]"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 gap-8 border-t border-neutral-800/70 py-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-balance font-bold text-4xl tracking-tight sm:text-5xl">
                            Bleib auf dem Laufenden
                        </h2>
                        <p className="mt-3 text-sm/6 text-neutral-400">Abonniere unseren Newsletter.</p>
                    </div>

                    <div className="w-full sm:w-auto">
                        <NewsletterForm/>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-6">
                    <div aria-hidden className="h-px w-full bg-gradient-to-r from-orange-500 to-gray-500/70"/>
                    <div className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
                        <nav aria-label="Footer Navigation"
                             className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-300">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white"
                                    onClick={link.onClick}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-300">
                            {metaLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-white"
                                    onClick={link.onClick}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}