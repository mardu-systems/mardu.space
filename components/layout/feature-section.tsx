import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ReactNode } from 'react';

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
    backgroundColor = '#8e5ddd60',
    className = '',
}: FeatureSectionProps) {
    return (
        <section
            className={`w-full py-12 md:py-16 lg:py-20 my-10 ${className}`}
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6 text-white">
                        <h2 className="font-futura-heavy text-3xl sm:text-4xl md:text-5xl leading-tight">
                            {title}
                        </h2>

                        <div className="font-futura-normal text-base md:text-lg leading-relaxed opacity-95 space-y-4">
                            {typeof description === 'string' ? <p>{description}</p> : description}
                        </div>

                        {buttonText && buttonHref && (
                            <div className="pt-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="bg-[#FFB703] hover:bg-[#FFB703]/90 text-black font-semibold px-8 py-6 text-base rounded-lg shadow-lg transition-all"
                                >
                                    <Link href={buttonHref}>{buttonText}</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Image */}
                    <div className="relative flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-8 md:p-10 lg:p-12 shadow-2xl w-full max-w-[600px]">
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
