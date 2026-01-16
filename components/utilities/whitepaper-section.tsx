'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, FileText, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export interface WhitepaperSectionProps {
  title?: string;
  description?: string;
  benefits?: string[];
  coverImageSrc?: string;
  className?: string;
}

export default function WhitepaperSection({
  title = 'Unser exklusives Whitepaper',
  description = 'Erhalten Sie tiefe Einblicke und wertvolle Strategien in unserem kostenlosen Whitepaper. Melden Sie sich zum Newsletter an, um den Download-Link direkt in Ihr Postfach zu erhalten.',
  benefits = [
    'Umfassende Marktanalyse',
    'Praktische Checklisten für die Umsetzung',
    'Exklusive Experten-Tipps',
  ],
  coverImageSrc, // Optional: if provided, renders image, else renders icon placeholder
  className,
}: WhitepaperSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle fake submit to show UI feedback before actual form submission happens via target="_blank" or if we want to intercept
  const handleSubmit = (e: React.FormEvent) => {
    // The form actually submits to the iframe target, so we just set loading state briefly
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className={cn('py-16 px-4 md:px-8 w-full bg-secondary/30', className)}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Visual / Cover */}
          <ScrollReveal direction="right" className="order-last lg:order-first flex justify-center">
            <div className="relative group">
              {/* Abstract decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              <motion.div 
                className="relative bg-card border border-border rounded-xl shadow-xl overflow-hidden w-full max-w-sm aspect-[3/4] flex items-center justify-center"
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {coverImageSrc ? (
                  <Image 
                    src={coverImageSrc} 
                    alt="Whitepaper Cover" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-muted-foreground p-8 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Whitepaper 2026</h3>
                    <p className="text-sm">Strategien & Analysen</p>
                    <div className="mt-8 flex items-center gap-2 text-xs font-medium bg-secondary px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" />
                      Nur für Abonnenten
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Right Column: Content & Form */}
          <ScrollReveal direction="left" className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                Kostenloser Download
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Jetzt anmelden & herunterladen
              </h3>

              {/* CleverReach Form Structure adapted from your newsletter components */}
              <form
                method="post"
                action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
                target="_blank"
                className="space-y-4"
                onSubmit={handleSubmit}
              >
                 <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  name="email_confirm"
                  aria-hidden
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label htmlFor="wp-vorname">Vorname</Label>
                    <Input
                      type="text"
                      id="wp-vorname"
                      name="global.vorname"
                      placeholder="Max"
                    />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="wp-nachname">Nachname</Label>
                    <Input
                      type="text"
                      id="wp-nachname"
                      name="global.nachname"
                      placeholder="Mustermann"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wp-email" className="after:content-['*'] after:ml-0.5 after:text-destructive">
                    E-Mail Adresse
                  </Label>
                  <Input
                    type="email"
                    id="wp-email"
                    name="email"
                    required
                    placeholder="max@beispiel.de"
                  />
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="wp-consent"
                    name="tags[]"
                    value="Whitepaper" 
                    required
                    className="mt-1"
                  />
                  <Label htmlFor="wp-consent" className="text-xs text-muted-foreground leading-relaxed font-normal">
                    Ich stimme zu, dass ich den Newsletter erhalten möchte. Ich kann mich jederzeit wieder abmelden.
                    Das Whitepaper wird mir nach Bestätigung zugesendet.
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? 'Wird verarbeitet...' : 'Kostenlos anfordern'}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Success Feedback Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <Check className="w-6 h-6" />
              Fast geschafft!
            </DialogTitle>
            <DialogDescription className="pt-2 text-base">
              Vielen Dank für Ihr Interesse. Wir haben Ihnen eine <strong>Bestätigungs-E-Mail</strong> gesendet.
              <br /><br />
              Bitte klicken Sie auf den Link in der E-Mail, um Ihre Anmeldung zu bestätigen. 
              Anschließend erhalten Sie das Whitepaper automatisch.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button variant="secondary" onClick={() => setIsSubmitted(false)}>Verstanden</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
