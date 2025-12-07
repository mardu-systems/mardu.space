import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
        <header className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl">{title}</h2>
        </header>

        {description ? <div className="mb-6 text-[16px] text-muted-foreground text-center">{description}</div> : null}

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {items.map((it, idx) => (
            <Link
              key={idx}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center ${it.className ?? ''}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                width={it.width ?? 140}
                height={20}
                className="object-contain"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
