import Link from 'next/link';
import { Button } from '@/components/ui/button';

export interface CTASectionProps {

    title: string;

    description: string;

    primaryButtonText: string;

    primaryButtonHref: string;

    secondaryButtonText?: string;

    secondaryButtonHref?: string;

    backgroundColor?: string;

    textColor?: string;

    className?: string;
}

export default function CTASection({
    title,
    description,
    primaryButtonText,
    primaryButtonHref,
    secondaryButtonText,
    secondaryButtonHref,
    backgroundColor = 'bg-[#351B59]',
    textColor = 'text-white',
    className = '',
}: CTASectionProps) {
    return (
        <section className={`w-full py-12 md:py-16 px-4 ${className}`}>
            <div className="relative mx-auto max-w-7xl">
                <div
                    className={`relative overflow-hidden rounded-2xl px-8 md:px-16 py-12 md:py-16 ${backgroundColor}`}
                >
                    {/* Decorative Background Elements (optional) */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl">
                        <h2
                            className={`text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-6 ${textColor}`}
                        >
                            {title}
                        </h2>

                        <p className={`text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] mb-8 ${textColor} opacity-95`}>
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Primary Button */}
                            <div>
                                <Link
                                    href={primaryButtonHref}
                                    className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
                                >
                                    {primaryButtonText}
                                </Link>

                                <Link
                                    href={secondaryButtonHref}
                                    className="ml-4 inline-flex items-center justify-center h-11 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
                                >
                                    {secondaryButtonText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
