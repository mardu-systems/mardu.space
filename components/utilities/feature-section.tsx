import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';
import { MeetergoCTAButton } from './meetergo-cta-button';

export type FeatureSectionProps = {

    title: string | ReactNode;

    description: string | ReactNode;

    imageSrc: string;

    imageAlt: string;

    buttonText?: string;

    buttonHref?: string;

    backgroundColor?: string;

    className?: string;
};

export default function FeatureSection({
    title,
    description,
    imageSrc,
    imageAlt,
    buttonText,
    buttonHref,
    backgroundColor = '#F786AE',
    className = '',
}: FeatureSectionProps) {
    return (
        <section
            className={`w-full py-12 md:py-16 lg:py-20 my-10 ${className}`}
            style={{ backgroundColor }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-1">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
                            {title}
                        </h2>

                        <div className="text-base md:text-lg leading-relaxed opacity-95 space-y-4">
                            {typeof description === 'string' ? <p>{description}</p> : description}
                        </div>

                        {buttonText && buttonHref && (
                            <div className="pt-4">
                                <MeetergoCTAButton>Jetzt Beratung vereinbaren</MeetergoCTAButton>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="rounded-2xl p-8 md:p-10 lg:p-12 w-full max-w-[600px]">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
