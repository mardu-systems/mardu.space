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
                    {/* Left SVG background - occupies up to 40% width on desktop, full height and partially clipped */}
                    <div className="absolute -top-80 -bottom-80 left-[-70px] w-[135%] sm:w-[100%] md:w-[60%] lg:w-[65%] overflow-hidden pointer-events-none opacity-70 z-0">
                        {/* Inline SVG (kept inline so it crops naturally at container bounds) */}
                        <svg
                            width="1221"
                            height="830"
                            viewBox="0 0 1221 830"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full object-cover -translate-x-6"
                            aria-hidden="true"
                        >
                            <g clip-path="url(#clip0_2029_75)">
                                <path d="M326.092 227.292C330.321 225.289 336.25 225.289 340.499 227.292C372.655 242.497 519.062 318.606 519.062 318.606V318.657L657.127 389.27C659.889 390.674 662.149 392.712 663.732 395.143L663.771 395.126L666.107 398.756C667.652 401.153 668.464 403.859 668.464 406.633V724.888C668.464 727.661 667.652 730.367 666.107 732.764L663.771 736.411C662.187 738.842 659.908 740.88 657.166 742.284L491.716 826.886C486.192 829.711 479.375 829.728 473.852 826.903L473.812 826.886C468.251 824.06 464.833 818.821 464.833 813.137V508.511C464.833 502.843 461.414 497.621 455.891 494.779L342.237 436.614C336.695 433.772 329.877 433.772 324.334 436.614L26.8447 588.884C21.302 591.726 14.4843 591.726 8.96094 588.884C3.41838 586.041 9.72846e-05 580.802 0 575.135V405.862C0 403.088 0.811445 400.382 2.35645 397.985L4.69336 394.339C6.27697 391.89 8.55551 389.87 11.2979 388.466L147.489 318.743V318.606C147.489 318.606 293.917 242.514 326.092 227.292ZM1037.53 227.292C1040.67 227.292 1043.74 228.011 1046.47 229.415L1211.82 314.017C1217.36 316.86 1220.76 322.082 1220.76 327.749C1220.76 333.416 1217.34 338.673 1211.82 341.516L914.157 493.905C908.634 496.748 905.216 501.988 905.216 507.655V812.366C905.216 824.591 890.307 832.211 878.372 826.099L713.095 741.496C710.333 740.075 708.054 738.054 706.471 735.589L704.134 731.959C702.608 729.562 701.798 726.874 701.798 724.117C701.798 724.117 701.296 460.91 701.798 406.358C701.836 403.054 702.956 399.68 704.791 396.804C706.664 393.825 709.522 390.401 713.095 388.466C733.667 377.259 828.159 329.581 828.294 329.513L1023.83 229.415C1026.56 228.011 1029.65 227.292 1032.78 227.292H1037.53ZM990.751 2.13174C996.294 -0.71058 1003.11 -0.71058 1008.65 2.13174C1014.18 4.957 1017.6 10.2139 1017.6 15.8642V185.068C1017.6 187.876 1016.76 190.65 1015.16 193.064L1012.73 196.763C1011.14 199.143 1008.92 201.112 1006.22 202.499L695.463 361.6C692.74 362.987 689.669 363.723 686.521 363.724H681.887C678.758 363.724 675.667 363.005 672.944 361.6L507.494 276.981C501.971 274.139 498.553 268.899 498.553 263.231C498.553 257.564 501.952 252.325 507.494 249.482L990.751 2.13174Z" fill="white" fill-opacity="0.25"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2029_75">
                                    <rect width="1221" height="830" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Decorative Background Elements (optional) */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl">
                        <h2
                            className={`text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-6 ${textColor} text-center sm:text-left`}
                        >
                            {title}
                        </h2>

                        <p className={`text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] mb-8 ${textColor} opacity-95 text-center sm:text-left`}>
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center sm:items-start">
                            {/* Primary Button */}
                            <Link
                                href={primaryButtonHref}
                                className="w-full sm:w-auto text-center inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2"
                            >
                                {primaryButtonText}
                            </Link>

                            {secondaryButtonText && secondaryButtonHref ? (
                                <Link
                                    href={secondaryButtonHref}
                                    className="w-full sm:w-auto text-center inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#FFB703] hover:bg-[#FFB703] text-black font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C842] focus-visible:ring-offset-2 mt-3 sm:mt-0 sm:ml-4"
                                >
                                    {secondaryButtonText}
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
