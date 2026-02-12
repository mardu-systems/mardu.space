'use client';

import * as React from 'react';
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
  socialLinks?: ReadonlyArray<FooterLink>;
  description?: string;
};

declare global {
  interface Window {
    openCookieSettings?: () => void;
  }
}

/* ---------- Icons (static, outside component) ---------- */
const IconInstagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Z" />
    <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    <path d="M17.5 6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </svg>
);

const IconLinkedIn: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.5 6.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM5 8h3v11H5V8Zm6 0h2.9v1.5h.1c.4-.8 1.6-1.8 3.3-1.8 3 0 3.7 2 3.7 5v6.3h-3V13.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V19h-3V8Z" />
  </svg>
);

const IconGitHub: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 98 96" fill="currentColor" aria-hidden="true">
    <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z" />
  </svg>
);

function iconByLabel(label: string) {
  const key = label.toLowerCase();
  if (key.includes('instagram')) return IconInstagram;
  if (key.includes('linkedin')) return IconLinkedIn;
  if (key.includes('github')) return IconGitHub;
  return null;
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function getScrollBehavior(): ScrollBehavior {
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  return prefersReduced ? 'auto' : 'smooth';
}

/* ------------------------------ Component ------------------------------ */
export default function SiteFooter({
  navLinks = [],
  metaLinks = [],
  socialLinks = [
    { href: 'https://www.instagram.com/mardu.de', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/marduofficial', label: 'LinkedIn' },
    { href: 'https://github.com/mardu-systems', label: 'GitHub' },
  ],
  description,
}: SiteFooterProps) {
  const scrollToTop = React.useCallback(() => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() });
  }, []);

  // Year ohne Flicker (Hydration-safe durch suppressHydrationWarning)
  const year = new Date().getFullYear();

  // Auf bg-primary ist ring=primary oft zu wenig Kontrast → wir nutzen ring-accent im Footer
  const focusRing =
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary';

  const linkBase =
    `inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 transition-colors ${focusRing} touch-manipulation ` +
    'text-primary-foreground/80 hover:text-primary-foreground';

  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Top row: gebündelter, weniger Luft, bessere Ausrichtung */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
          <div className="flex flex-col gap-5">
            <Link
              href="/"
              aria-label="Mardu Home"
              className={focusRing + ' inline-block rounded-sm'}
            >
              <div className="relative h-12 w-50">
                <Image
                  src="/marduspace_logo_bg_black.svg"
                  alt="Mardu Logo"
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              </div>
            </Link>

            {description ? (
              <p className="max-w-xl text-sm leading-relaxed text-primary-foreground/80">
                {description}
              </p>
            ) : null}
          </div>

          {/* Right cluster: Icons + Back-to-top als kompakter Block */}
          <div className="flex flex-col gap-3 md:items-end">
            <Button
              onClick={scrollToTop}
              variant="ghost"
              className={[
                // kompakter als vorher (Screenshot: wirkt sehr “luftig”)
                'h-11 px-4 py-0 inline-flex items-center gap-2 touch-manipulation',
                'text-primary-foreground hover:bg-primary-foreground/10',
                focusRing,
              ].join(' ')}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
              Nach oben
            </Button>
          </div>
        </div>

        {/* Links row: semantisch sauber + etwas weniger “heavy” */}
        {(navLinks.length > 0 || metaLinks.length > 0) && (
          <nav
            aria-label="Footer Navigation"
            className="mt-8 border-t border-primary-foreground/15 pt-5"
          >
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-start">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={['text-sm font-medium', linkBase].join(' ')}
                    onClick={link.onClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {metaLinks.map((link) => {
                if (link.href === '#cookie-settings') {
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        className={['text-sm font-medium', linkBase].join(' ')}
                        onClick={() => window.openCookieSettings?.()}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                }

                const external = isExternalHref(link.href);
                if (external) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={['text-sm font-medium', linkBase].join(' ')}
                        onClick={link.onClick}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={['text-sm font-medium', linkBase].join(' ')}
                      onClick={link.onClick}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        <div className="mt-6 flex flex-row flex-wrap items-center justify-between gap-4 sm:mt-8">
          {socialLinks.length ? (
            <div className="flex items-center justify-start gap-4">
              {socialLinks.map((link) => {
                const Icon = iconByLabel(link.label);
                const external = isExternalHref(link.href);

                if (external) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkBase}
                      aria-label={link.label}
                      onClick={link.onClick}
                    >
                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <span className="text-sm">{link.label}</span>
                      )}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={linkBase}
                    aria-label={link.label}
                    onClick={link.onClick}
                  >
                    {Icon ? (
                      <Icon className="h-5 w-5" />
                    ) : (
                      <span className="text-sm">{link.label}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ) : null}
          {/* Copyright Bar */}
          <div className="text-right">
            <p className="text-xs whitespace-nowrap" suppressHydrationWarning>
              Copyright © <span suppressHydrationWarning>{year}</span> Mardu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
