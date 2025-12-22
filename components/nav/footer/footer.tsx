'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
export default function SiteFooter({ navLinks = [], metaLinks = [] }: SiteFooterProps) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="dark w-full bg-[#351B59] text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Left Column - Logo, Description & Back-to-Top */}
          <div className="space-y-8">
            <Image
              src="/marduspace_logo_bg_black.svg"
              alt="MARDU SPACE"
              width={240}
              height={45}
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 240px"
              className="h-auto w-[clamp(160px,30vw,240px)]"
              loading="lazy"
            />

            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Mit Mardu können Studierende und Lernende, sicher Kompetenzen zu erwerben und anzuwenden.
            </p>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-6 py-3 border border-muted-foreground/30 rounded-sm text-sm text-foreground hover:bg-muted/20 transition-colors"
                aria-label="Zurück nach oben"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
                Nach oben
              </button>
            </div>
          </div>

          {/* Middle Column - Site Map */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-6">Sitemap</h3>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
              {navLinks?.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  onClick={link.onClick}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right Column - Legal */}
          <div>
            <h3 className="text-foreground font-semibold text-lg mb-6">Rechtliches</h3>
            <nav aria-label="Legal Links" className="flex flex-col gap-3">
              <Link
                href="/publisher"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Impressum
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                Datenschutz
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-[#FFB703] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-accent-foreground">
            Copyright © {new Date().getFullYear()}, MARDU SPACE, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
