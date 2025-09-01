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
        'hidden md:flex md:flex-1 md:items-center md:gap-1 md:justify-end',
        variant === 'dark' && 'dark',
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
    'group relative rounded-lg px-4 py-3 text-[0.85rem] tracking-[0.35em] uppercase focus-visible:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-foreground focus-visible:ring-offset-background text-foreground/90 hover:text-foreground';

  if (entry.type === 'link') {
    return (
      <Link href={entry.href} className={clsx(baseClasses)}>
        {entry.label}
        <span
          className={clsx(
            'absolute inset-x-2 -bottom-0.5 h-px scale-x-0 bg-foreground/50 transition-transform duration-200 group-hover:scale-x-100 group-hover:bg-foreground/80',
          )}
        />
      </Link>
    );
  }

  // Trigger für Mega-Menü
  return (
    <HoverCard openDelay={50} closeDelay={80}>
      <HoverCardTrigger asChild>
        <button aria-haspopup="menu" className={clsx(baseClasses, 'flex items-center gap-1')}>
          {entry.label}
          <ChevronDown className="h-4 w-4 transition group-data-[state=open]:rotate-180" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-full border border-border bg-background p-0 text-foreground shadow-2xl backdrop-blur-xl">
        <MegaContent group={entry} />
      </HoverCardContent>
    </HoverCard>
  );
}
