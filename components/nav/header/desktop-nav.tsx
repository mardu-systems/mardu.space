'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import React from 'react';
import clsx from 'clsx';
import MegaContent from './mega-content';
import { NavEntry } from '@/types/header';

interface DesktopNavProps {
  items: NavEntry[];
  variant?: 'dark' | 'light';
}

export default function DesktopNav({ items, variant = 'dark' }: DesktopNavProps) {
  return (
    <div
      className={clsx(
        'hidden md:flex md:flex-1 md:items-center md:gap-6 md:justify-end',
      )}
    >
      {items.map((entry) => (
        <DesktopNavEntry key={entry.label} entry={entry} />
      ))}
    </div>
  );
}

function DesktopNavEntry({ entry }: { entry: NavEntry }) {
  const baseClasses =
    'group relative rounded-lg px-3 py-2 text-[0.9rem] tracking-[0.1em] font-medium focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-white text-neutral-900/80 hover:text-neutral-900 transition-colors';

  if (entry.type === 'link') {
    return (
      <Link href={entry.href} className={clsx(baseClasses)}>
        {entry.label}
      </Link>
    );
  }

  // Trigger für Mega-Menü
  return (
    <HoverCard openDelay={50} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button aria-haspopup="menu" className={clsx(baseClasses, 'flex items-center gap-1')}>
          {entry.label}
          <ChevronDown className="h-3.5 w-3.5 transition group-data-[state=open]:rotate-180" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full border border-border bg-background p-0 text-foreground shadow-2xl backdrop-blur-xl">
        <MegaContent group={entry} />
      </HoverCardContent>
    </HoverCard>
  );
}
