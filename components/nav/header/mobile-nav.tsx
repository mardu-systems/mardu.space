'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import clsx from 'clsx';
import { NavEntry } from '@/types/header';
import BurgerIcon from './burger-icon';
import { useScrollToSection } from '@/hooks/use-scroll-to-section';
import { MeetergoCTAButton } from '@/components/utilities/meetergo-cta-button';

export default function MobileNav({
  items,
  variant = 'light',
}: {
  items: NavEntry[];
  variant?: 'dark' | 'light';
}) {
  const [open, setOpen] = useState(false);
  const { scrollToSection } = useScrollToSection();
  const pathname = usePathname();

  const linkColor = 'text-foreground/82 hover:text-foreground';

  const closeAndGo = () => setOpen(false);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    shouldScroll: boolean,
  ) => {
    if (
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (shouldScroll) {
      event.preventDefault();
      scrollToSection(href);
    }

    closeAndGo();
  };

  const resolveHref = (href: string) => (pathname === '/' ? href : `/${href}`);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={clsx(
            'h-11 w-11 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            variant === 'light'
              ? 'focus-visible:ring-neutral-900 focus-visible:ring-offset-[color:var(--paper)]'
              : 'focus-visible:ring-white focus-visible:ring-offset-neutral-950',
          )}
          aria-label="Navigation öffnen"
        >
          <BurgerIcon isOpen={open} variant={variant} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex h-full w-full flex-col border-0 bg-[color:var(--paper)] p-0 text-foreground overscroll-contain"
      >
        <SheetHeader className="flex items-center justify-between px-6 pt-6">
          <SheetTitle className="tracking-[0.18em] uppercase text-foreground/70">
            Navigation
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex flex-1 items-center justify-center overflow-y-auto px-6"
          aria-label="Mobile Navigation"
        >
          <Accordion type="multiple" className="w-full max-w-md">
            {items.map((entry) => (
              <div key={entry.label}>
                {entry.type === 'link' ? (
                  entry.href.startsWith('#') ? (
                    <Link
                      href={resolveHref(entry.href)}
                      onClick={(event) =>
                        handleLinkClick(event, entry.href, pathname === '/')
                      }
                      className={clsx(
                        'flex h-14 w-full items-center justify-center px-4 text-lg uppercase font-medium touch-manipulation',
                        linkColor,
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]',
                      )}
                    >
                      {entry.label}
                    </Link>
                  ) : (
                    <Link
                      href={entry.href}
                      onClick={(event) => handleLinkClick(event, entry.href, false)}
                      className={clsx(
                        'flex h-14 items-center justify-center px-4 text-lg uppercase font-medium touch-manipulation',
                        linkColor,
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]',
                      )}
                    >
                      {entry.label}
                    </Link>
                  )
                ) : (
                  <AccordionItem value={entry.label} className="border-0">
                    <AccordionTrigger
                      className={clsx(
                        'h-14 justify-center px-4 text-lg uppercase font-medium hover:no-underline touch-manipulation',
                        linkColor,
                      )}
                    >
                      {entry.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 px-2 pb-3">
                        {entry.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={item.href || '#'}
                              onClick={(event) =>
                                handleLinkClick(event, item.href || '#', false)
                              }
                              className="flex items-center gap-3 p-3 text-sm touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]"
                            >
                              {item.image && (
                                <Image
                                  src={item.image.src}
                                  alt={item.image.alt || `${item.label} image`}
                                  width={56}
                                  height={40}
                                  className="h-10 w-14 rounded object-cover"
                                  loading="lazy"
                                />
                              )}
                              <div>
                                <div>{item.label}</div>
                                {item.description && (
                                  <p className="text-xs text-muted-foreground">{item.description}</p>
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

        <div className="p-6 pb-[max(env(safe-area-inset-bottom),1.5rem)] flex justify-center">
          <MeetergoCTAButton
            onClick={closeAndGo}
            className="h-12 w-full max-w-md text-base uppercase tracking-[0.12em]"
          >
            Demo vereinbaren
          </MeetergoCTAButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
