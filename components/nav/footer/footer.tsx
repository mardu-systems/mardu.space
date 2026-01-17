'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

/* ---------- Footer Props ---------- */
export type FooterLink = {
  href: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};
type SiteFooterProps = {
  navLinks?: ReadonlyArray<FooterLink>;
  metaLinks?: ReadonlyArray<FooterLink>;
  description?: string;
};

declare global {
  interface Window {
    openCookieSettings?: () => void;
  }
}

/* ------------------------------ Component ------------------------------ */
export default function SiteFooter({ metaLinks = [], description }: SiteFooterProps) {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-primary text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Main Content Row: Logo, Text and Scroll-to-Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            <Link href="/" aria-label="Mardu Home" className="block">
              <div className="relative h-12 w-50">
                <Image
                  src="/marduspace_logo_bg_black.svg"
                  alt="Mardu Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            {description && (
              <p className="text-white/80 text-sm leading-relaxed max-w-sm">{description}</p>
            )}
          </div>

          <div className="flex items-center">
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className="dark inline-flex items-center text-foreground gap-2 px-6 py-3"
              aria-label="Zurück nach oben"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              Nach oben
            </Button>
          </div>
        </div>

        {/* Links Row */}
        <nav
          aria-label="Footer Navigation"
          className="mt-12 md:mt-16 flex flex-wrap gap-x-8 gap-y-4"
        >
          {metaLinks?.map((link) => {
            if (link.href === '#cookie-settings') {
              return (
                <button
                  key={link.href}
                  type="button"
                  className="text-white font-semibold hover:text-foreground transition-colors text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    if (typeof window !== 'undefined' && window.openCookieSettings) {
                      window.openCookieSettings();
                    }
                  }}
                >
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold hover:text-foreground transition-colors text-sm"
                onClick={link.onClick}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Copyright Bar */}
      <div className="w-full bg-accent py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-accent-foreground">
            Copyright © {new Date().getFullYear()}, Mardu, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
