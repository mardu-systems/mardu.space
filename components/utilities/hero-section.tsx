'use client';

import Link from 'next/link';
import Image from 'next/image';
import WavyBackground from '@/components/ui/shadcn-io/wavy-background';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { MeetergoCTAButton } from './meetergo-cta-button';
import NewsletterButton from './newsletter-button';

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

  const handlePlayClick = () => {
    setIsPlaying(true);
    if (onPlayClick) {
      onPlayClick();
    }
  };
  return (
    <section className={cn('flex flex-col items-center pt-20', className)}>
      {/* Waves behind the copy */}
      <WavyBackground
        colors={['#F5C842', '#F786AE', '#351B59']}
        waveWidth={30}
        blur={8}
        speed="slow"
        waveOpacity={0.1}
        containerClassName="w-full overflow-hidden"
        className="w-full max-w-7xl px-4 md:px-8 mx-auto py-10 lg:py-20"
      >
        <div className="flex flex-col items-start gap-6">
          {/* Main Heading */}
          <h1 className="text-[32px] md:text-[40px] lg:text-[50px] font-semibold leading-[1.2] text-[#351B5A] w-full">
            {title}
          </h1>

          {/* Description Text */}
          <div className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] text-[#061C3D] w-full">
            {description}
          </div>

          {(buttonText || secondaryButtonText) && (
            <div className="flex flex-wrap gap-4">
              <MeetergoCTAButton>Jetzt Demo vereinbaren</MeetergoCTAButton>
              <NewsletterButton primaryButtonText="Zum Newsletter anmelden" />
            </div>
          )}
        </div>
      </WavyBackground>

      {/* Image Section (no waves behind it) */}
      <div className="w-full max-w-7xl px-4 md:px-8 mx-auto mt-3 mb-12">
        <div className="relative w-full h-125 md:h-162.5 lg:h-160 rounded-[34px] overflow-hidden shadow-lg">
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
                    onClick={handlePlayClick}
                    className="flex items-center justify-center w-22 h-22 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform duration-200"
                    aria-label="Video abspielen"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1"
                    >
                      <path
                        d="M6 4.5L18 12L6 19.5V4.5Z"
                        fill="#351B59"
                      />
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
        </div>
      </div>
    </section>
  );
}