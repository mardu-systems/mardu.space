'use client';

import Link from 'next/dist/client/link';
import Image from 'next/image';
import { useState } from 'react';

export interface HeroSectionProps {

  title: string;

  description: React.ReactNode;

  imageSrc: string;

  imageAlt: string;

  className?: string;

  buttonText?: string;

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
    <section className={`flex flex-col items-center px-4 md:px-8 pt-20 mt-4 md:pt-8 bg-[#F5F6F7] ${className}`}>
      {/* Heading Section */}
      <div className="w-full max-w-7xl flex flex-col items-start gap-6 py-6 lg:py-24">
        {/* Main Heading */}
        <h1 className="text-[32px] md:text-[40px] lg:text-[50px] font-semibold leading-[1.2] text-[#351B5A] w-full">
          {title}
        </h1>

        {/* Description Text */}
        <div className="text-[16px] md:text-[18px] lg:text-[20px] leading-[1.4] text-[#061C3D] w-full">
          {description}
        </div>

        <div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#F5C842] hover:bg-[#F5D25C] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
          >
            {buttonText}
          </Link>
        </div>
      </div>

      {/* Image/Video Section */}
      <div className="relative w-full max-w-7xl h-[500px] md:h-[650px] lg:h-[640px] rounded-[34px] overflow-hidden shadow-lg mt-3 mb-12">
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
                  className="flex items-center justify-center w-[88px] h-[88px] bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
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
    </section>
  );
}
