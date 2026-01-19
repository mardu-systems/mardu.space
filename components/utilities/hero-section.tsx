'use client';

import Link from 'next/link';
import Image from 'next/image';
import WavyBackground from '@/components/ui/wavy-background';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { motion, useReducedMotion } from 'framer-motion';

export interface HeroSectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  onPlayClick?: () => void;
}

export default function HeroSection({
  title,
  description,
  imageSrc,
  imageAlt,
  className = '',
  buttonText,
  buttonHref = '/contact',
  secondaryButtonText,
  secondaryButtonHref,
  mediaType = 'image',
  videoUrl,
  onPlayClick,
}: HeroSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (onPlayClick) {
      onPlayClick();
    }
  };
  return (
    <section className={cn('flex flex-col items-center py-20 bg-background', className)}>
      {/* Waves behind the copy */}
      <WavyBackground
        colors={['#F5C842', '#F786AE', '#351B59']} // Keeping brand specific wave colors for now as they might be specific assets
        waveWidth={30}
        blur={8}
        speed="fast"
        waveOpacity={0.1}
        containerClassName="w-full overflow-hidden"
        className="w-full max-w-7xl px-4 md:px-8 mx-auto py-10 lg:py-20"
      >
        <ScrollReveal className="flex flex-col items-start gap-6">
          {/* Main Heading */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[50px] font-semibold leading-[1.2] text-primary w-full">
            {title}
          </h1>

          {/* Description Text */}
          <div className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] text-foreground w-full">
            {description}
          </div>

          {(buttonText || secondaryButtonText) && (
            <ScrollReveal className="flex flex-wrap gap-4" delay={0.1} direction="up">
              {buttonText && (
                <Link
                  href={buttonHref}
                  className="inline-flex touch-manipulation items-center justify-center h-11 px-6 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {buttonText}
                </Link>
              )}
              {secondaryButtonText && secondaryButtonHref && (
                <Link
                  href={secondaryButtonHref}
                  className="inline-flex touch-manipulation items-center justify-center h-11 px-6 rounded-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground text-primary font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {secondaryButtonText}
                </Link>
              )}
            </ScrollReveal>
          )}
        </ScrollReveal>
      </WavyBackground>

      {/* Image Section (no waves behind it) */}
      <ScrollReveal className="w-full max-w-7xl px-4 md:px-8 mx-auto mt-3" direction="up">
        <motion.div
          className="relative w-full h-125 md:h-162.5 lg:h-160 rounded-[34px] overflow-hidden shadow-lg bg-muted"
          animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
          }
        >
          {!isPlaying ? (
            <>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1280px"
                className="object-cover"
              />

              {/* Play Button Overlay - nur bei Video */}
              {mediaType === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handlePlayClick}
                    className="flex touch-manipulation items-center justify-center w-22 h-22 bg-background rounded-lg shadow-lg hover:scale-110 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Video abspielen"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 text-primary"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path d="M6 4.5L18 12L6 19.5V4.5Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            // Video-Player
            videoUrl && (
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={imageAlt}
              />
            )
          )}
        </motion.div>
      </ScrollReveal>
    </section>
  );
}
