'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DesktopNav from './desktop-nav';
import { NavEntry } from '@/types/header';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';
import MobileNav from '@/components/nav/header/mobile-nav';

export type { NavEntry } from '@/types/header';

export interface HeaderProps {
  items: NavEntry[];
  showTopbar?: boolean;
  showSearch?: boolean;
  showAccount?: boolean;
  showHelp?: boolean;
  salesPhone?: string;
}

function useScrolledPast(px: number) {
  const [past, setPast] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      setPast(window.scrollY >= px);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [px]);

  return past;
}

export default function SiteHeader({ items }: HeaderProps) {
  const headerRef = React.useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = React.useState(72);

  React.useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const measure = () => setHeaderHeight(el.getBoundingClientRect().height);
    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  const scrolledPastHeader = useScrolledPast(headerHeight);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={
        {
          '--site-header-h': `${headerHeight}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={[
          'transition-[background-color,border-color,backdrop-filter] duration-150',
          scrolledPastHeader
            ? 'border-b border-black/8 bg-[color:var(--paper)]/95 backdrop-blur supports-backdrop-filter:bg-[color:var(--paper)]/90'
            : 'border-b border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav className="mardu-container flex h-18 items-center gap-4" aria-label="Hauptnavigation">
          <Link
            href="/"
            aria-label="Mardu Home"
            className="block touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="relative h-11 w-35">
              <Image
                src="/marduspace_logo_bg_black.svg"
                alt="Mardu Logo"
                fill
                sizes="140px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="ml-auto flex md:hidden">
            <MobileNav items={items} variant="light" />
          </div>

          <DesktopNav items={items} />

          <div className="hidden md:block">
            <MeetergoCTAButton className="mt-0 w-auto sm:ml-0 sm:mt-0">
              Demo vereinbaren
            </MeetergoCTAButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
