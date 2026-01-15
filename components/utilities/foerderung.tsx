'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { cn } from '@/lib/utils';

export type FoerderItem = {
  href: string;
  src: string;
  alt: string;
  width?: number;
  className?: string;
};

type Props = {
  title?: React.ReactNode;
  items: FoerderItem[];
  description?: React.ReactNode;
  className?: string;
};

export default function Foerderung({
  title = 'Gefördert durch:',
  items,
  description,
  className = '',
}: Props) {
  return (
    <section id="foerderung" className={`w-full py-18 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ScrollReveal className="text-center mb-10" direction="up">
          <h2 className="text-2xl md:text-4xl font-bold text-primary">{title}</h2>
        </ScrollReveal>
        {description ? (
          <ScrollReveal className="mb-6 text-center text-muted-foreground">
            {description}
          </ScrollReveal>
        ) : null}

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {items.map((it, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05} direction="up">
              <Link
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn('flex items-center', it.className)}
                aria-label={it.alt}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <Image
                    src={it.src}
                    alt={it.alt}
                    width={it.width ?? 140}
                    height={20}
                    className="object-contain"
                    loading="lazy"
                  />
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
