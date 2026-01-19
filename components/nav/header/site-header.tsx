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

export default function SiteHeader({ items }: HeaderProps) {
  return (
    <header>
      <div
        className="fixed z-50 transition-colors duration-200"
        style={{
          top: 'calc(env(safe-area-inset-top) + 1rem)',
          left: '1rem',
          right: '1rem',
        }}
      >
        <div className="relative mx-auto max-w-7xl bg-white rounded-2xl shadow-lg border border-gray-200/50">
          <nav className="flex h-20 items-center gap-3 px-6" aria-label="Hauptnavigation">
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="Mardu Home"
                className="block rounded-md touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <div className="relative h-12 w-37.5">
                  <Image
                    src="/marduspace_logo_bg_white.svg"
                    alt="Mardu Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-1 md:hidden justify-end">
              <MobileNav items={items} variant="light" />
            </div>

            <DesktopNav items={items} />
            <div className="hidden md:block ml-4">
              <MeetergoCTAButton>Demo Vereinbaren</MeetergoCTAButton>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
