'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { MeetergoCTAButton } from './meetergo-cta-button';
import { useRef, useState } from 'react';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { motion, useReducedMotion } from 'framer-motion';

export interface CTASectionProps {
  title: string;

  description: string;

  primaryButtonText: string;

  secondaryButtonText?: string;

  backgroundColor?: string;

  textColor?: string;

  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  backgroundColor = 'bg-primary',
  textColor = 'text-white',
  className = '',
}: CTASectionProps) {
  const [open, setOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; consent?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = String(formData.get('global.vorname') ?? '').trim();
    const lastName = String(formData.get('global.nachname') ?? '').trim();
    const company = String(formData.get('global.firma') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();

    const nextErrors: { email?: string; consent?: string } = {};

    if (!email) {
      nextErrors.email = 'Bitte geben Sie eine E-Mail-Adresse ein.';
    } else if (emailInputRef.current && !emailInputRef.current.validity.valid) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
    }

    if (!consentChecked) {
      nextErrors.consent = 'Bitte bestätigen Sie Ihre Einwilligung.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      if (nextErrors.email) {
        emailInputRef.current?.focus();
      } else {
        consentRef.current?.focus();
      }
      return;
    }

    const updateValue = (name: string, value: string) => {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (input) input.value = value;
    };

    updateValue('global.vorname', firstName);
    updateValue('global.nachname', lastName);
    updateValue('global.firma', company);
    updateValue('email', email);

    setFormErrors({});
    setIsSubmitting(true);
    form.submit();

    setTimeout(() => {
      setOpen(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className={cn('w-full py-12 md:py-16 px-4', className)}>
      <div className="relative mx-auto max-w-7xl">
        <ScrollReveal>
          <div
            className={cn(
              'relative overflow-hidden rounded-2xl px-8 md:px-16 py-12 md:py-16',
              backgroundColor,
            )}
          >
            {/* Left SVG background - occupies up to 40% width on desktop, full height and partially clipped */}
            <div className="absolute -top-80 -bottom-80 -left-17.5 w-[135%] sm:w-full md:w-[60%] lg:w-[65%] overflow-hidden pointer-events-none opacity-70 z-0">
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
                <g clipPath="url(#clip0_2029_75)">
                  <path
                    d="M326.092 227.292C330.321 225.289 336.25 225.289 340.499 227.292C372.655 242.497 519.062 318.606 519.062 318.606V318.657L657.127 389.27C659.889 390.674 662.149 392.712 663.732 395.143L663.771 395.126L666.107 398.756C667.652 401.153 668.464 403.859 668.464 406.633V724.888C668.464 727.661 667.652 730.367 666.107 732.764L663.771 736.411C662.187 738.842 659.908 740.88 657.166 742.284L491.716 826.886C486.192 829.711 479.375 829.728 473.852 826.903L473.812 826.886C468.251 824.06 464.833 818.821 464.833 813.137V508.511C464.833 502.843 461.414 497.621 455.891 494.779L342.237 436.614C336.695 433.772 329.877 433.772 324.334 436.614L26.8447 588.884C21.302 591.726 14.4843 591.726 8.96094 588.884C3.41838 586.041 9.72846e-05 580.802 0 575.135V405.862C0 403.088 0.811445 400.382 2.35645 397.985L4.69336 394.339C6.27697 391.89 8.55551 389.87 11.2979 388.466L147.489 318.743V318.606C147.489 318.606 293.917 242.514 326.092 227.292ZM1037.53 227.292C1040.67 227.292 1043.74 228.011 1046.47 229.415L1211.82 314.017C1217.36 316.86 1220.76 322.082 1220.76 327.749C1220.76 333.416 1217.34 338.673 1211.82 341.516L914.157 493.905C908.634 496.748 905.216 501.988 905.216 507.655V812.366C905.216 824.591 890.307 832.211 878.372 826.099L713.095 741.496C710.333 740.075 708.054 738.054 706.471 735.589L704.134 731.959C702.608 729.562 701.798 726.874 701.798 724.117C701.798 724.117 701.296 460.91 701.798 406.358C701.836 403.054 702.956 399.68 704.791 396.804C706.664 393.825 709.522 390.401 713.095 388.466C733.667 377.259 828.159 329.581 828.294 329.513L1023.83 229.415C1026.56 228.011 1029.65 227.292 1032.78 227.292H1037.53ZM990.751 2.13174C996.294 -0.71058 1003.11 -0.71058 1008.65 2.13174C1014.18 4.957 1017.6 10.2139 1017.6 15.8642V185.068C1017.6 187.876 1016.76 190.65 1015.16 193.064L1012.73 196.763C1011.14 199.143 1008.92 201.112 1006.22 202.499L695.463 361.6C692.74 362.987 689.669 363.723 686.521 363.724H681.887C678.758 363.724 675.667 363.005 672.944 361.6L507.494 276.981C501.971 274.139 498.553 268.899 498.553 263.231C498.553 257.564 501.952 252.325 507.494 249.482L990.751 2.13174Z"
                    fill="white"
                    fillOpacity="0.25"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2029_75">
                    <rect width="1221" height="830" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Decorative Background Elements (optional) */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.2, 0.45, 0.2], scale: [0.9, 1.08, 0.95] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 12, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              }
            />
            <motion.div
              className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { opacity: [0.15, 0.3, 0.15], scale: [1, 1.12, 0.92] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 14, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
              }
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl text-left">
              <h2
                className={cn(
                  'text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-6',
                  textColor,
                )}
              >
                {title}
              </h2>

              <p
                className={cn(
                  'text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] mb-8 opacity-95',
                  textColor,
                )}
              >
                {description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-center sm:items-start">
                {/* Primary Button with Modal */}
                <Dialog
                  open={open}
                  onOpenChange={(nextOpen) => {
                    setOpen(nextOpen);
                    if (!nextOpen) {
                      setFormErrors({});
                      setIsSubmitting(false);
                      setConsentChecked(false);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto h-12 px-6 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                      {primaryButtonText}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-card">
                    <DialogHeader>
                      <DialogTitle>Anmelden</DialogTitle>
                      <DialogDescription>
                        Unser kostenloser Newsletter informiert Sie regelmäßig über Produktneuheiten
                        und Sonderaktionen.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      method="post"
                      action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
                      target="_blank"
                      className="space-y-6 pt-4"
                      onSubmit={handleNewsletterSubmit}
                      noValidate
                    >
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        name="email_confirm"
                        aria-hidden
                      />

                      <div className="space-y-2">
                        <Label htmlFor="global.vorname">Vorname</Label>
                        <Input
                          type="text"
                          id="global.vorname"
                          name="global.vorname"
                          placeholder="z. B. Lena…"
                          autoComplete="given-name"
                          onBlur={(e) => {
                            e.currentTarget.value = e.currentTarget.value.trim();
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="global.nachname">Nachname</Label>
                        <Input
                          type="text"
                          id="global.nachname"
                          name="global.nachname"
                          placeholder="z. B. Müller…"
                          autoComplete="family-name"
                          onBlur={(e) => {
                            e.currentTarget.value = e.currentTarget.value.trim();
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="global.firma">Firma</Label>
                        <Input
                          type="text"
                          id="global.firma"
                          name="global.firma"
                          placeholder="z. B. Muster GmbH…"
                          autoComplete="organization"
                          onBlur={(e) => {
                            e.currentTarget.value = e.currentTarget.value.trim();
                          }}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="after:content-['*'] after:ml-0.5 after:text-destructive"
                        >
                          E-Mail
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="name@example.com…"
                          autoComplete="email"
                          inputMode="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          ref={emailInputRef}
                          onChange={() => {
                            if (formErrors.email) {
                              setFormErrors((prev) => ({ ...prev, email: undefined }));
                            }
                          }}
                          onBlur={(e) => {
                            e.currentTarget.value = e.currentTarget.value.trim();
                          }}
                          aria-invalid={Boolean(formErrors.email)}
                          aria-describedby={formErrors.email ? 'cta.email-error' : undefined}
                        />
                        {formErrors.email ? (
                          <p
                            id="cta.email-error"
                            className="text-xs text-destructive"
                            aria-live="polite"
                          >
                            {formErrors.email}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2 pt-2">
                        <Label className="flex items-start gap-3 text-xs font-normal leading-relaxed text-muted-foreground cursor-pointer">
                          <Checkbox
                            id="tags"
                            name="tags[]"
                            value="accept"
                            ref={consentRef}
                            className="mt-1"
                            checked={consentChecked}
                            onCheckedChange={(checked) => {
                              setConsentChecked(checked === true);
                              if (formErrors.consent) {
                                setFormErrors((prev) => ({ ...prev, consent: undefined }));
                              }
                            }}
                            aria-invalid={Boolean(formErrors.consent)}
                            aria-describedby={formErrors.consent ? 'cta.consent-error' : undefined}
                          />
                          Ihre hier eingegebenen Daten werden lediglich zur Personalisierung des
                          Newsletters verwendet und nicht an Dritte weitergegeben. Durch Absenden
                          der von Ihnen eingegebenen Daten willigen Sie in die Datenverarbeitung ein
                          und bestätigen unsere Datenschutzerklärung.
                        </Label>
                        {formErrors.consent ? (
                          <p
                            id="cta.consent-error"
                            className="text-xs text-destructive"
                            aria-live="polite"
                          >
                            {formErrors.consent}
                          </p>
                        ) : null}
                      </div>

                      <Button
                        type="submit"
                        className="w-full sm:w-auto h-12 px-6 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                      >
                        {isSubmitting && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        )}
                        Anmelden
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                {secondaryButtonText ? (
                  <MeetergoCTAButton className="mt-3 sm:mt-0">Demo Vereinbaren</MeetergoCTAButton>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
