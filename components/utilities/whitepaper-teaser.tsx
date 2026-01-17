'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';
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

interface WhitepaperTeaserProps {
  className?: string;
}

export default function WhitepaperTeaser({ className }: WhitepaperTeaserProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className={cn('w-full py-20 px-4 md:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground">
            
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-75 h-75 bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 p-8 md:p-12 lg:p-20 items-center">
              
              {/* Content Side */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider border border-white/10">
                  <FileText className="w-3.5 h-3.5" />
                  Neuerscheinung
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Whitepaper: <span className="text-accent">Digitale Zutritts- und Maschinenfreigabe</span>
                </h2>
                
                <p className="text-lg text-primary-foreground/80 leading-relaxed max-w-xl">
                  Erfahren Sie, wie Sie Zutritt, Maschinenfreigaben und Unterweisungen zuverlässig organisieren – für Unternehmenswerkstätten, Hochschulen und Makerspaces.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="h-14 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground border-none">
                        Jetzt kostenlos anfordern
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto bg-card text-foreground">
                      <DialogHeader>
                        <DialogTitle>Whitepaper anfordern</DialogTitle>
                        <DialogDescription>
                          Bitte füllen Sie das Formular aus. Wir senden Ihnen das Whitepaper umgehend per E-Mail zu.
                        </DialogDescription>
                      </DialogHeader>

                      <form
                        method="post"
                        action="https://flow.cleverreach.com/fl/dc9cc0ca-817c-4e47-bad3-f00510d3efc3/confirm"
                        target="_blank"
                        className="space-y-6 pt-4"
                        onSubmit={() => setTimeout(() => setOpen(false), 2000)}
                      >
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          name="email_confirm"
                          aria-hidden
                        />

                        {/* Tag zur Identifizierung in CleverReach für Automations-Trigger */}
                        <input type="hidden" name="tags[]" value="Whitepaper" />

                        <div className="space-y-2">
                          <Label htmlFor="wp.vorname">Vorname</Label>
                          <Input
                            type="text"
                            id="wp.vorname"
                            name="global.vorname"
                            placeholder="Ihr Vorname"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wp.nachname">Nachname</Label>
                          <Input
                            type="text"
                            id="wp.nachname"
                            name="global.nachname"
                            placeholder="Ihr Nachname"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="wp.firma">Firma</Label>
                          <Input
                            type="text"
                            id="wp.firma"
                            name="global.firma"
                            placeholder="Ihre Firma"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="wp.email"
                            className="after:content-['*'] after:ml-0.5 after:text-destructive"
                          >
                            E-Mail
                          </Label>
                          <Input
                            type="email"
                            id="wp.email"
                            name="email"
                            required
                            placeholder="name@example.com"
                          />
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                          <Checkbox
                            id="wp.terms"
                            name="tags[]"
                            value="accept"
                            required
                            className="mt-1"
                          />
                          <Label
                            htmlFor="wp.terms"
                            className="text-xs font-normal leading-relaxed text-muted-foreground"
                          >
                            Ich stimme zu, dass meine Daten zur Zusendung des Whitepapers verarbeitet werden. 
                            Gleichzeitig melde ich mich zum Newsletter an (jederzeit widerrufbar). 
                            Details in der Datenschutzerklärung.
                          </Label>
                        </div>

                        <Button
                          type="submit"
                          className="w-full sm:w-auto h-12 px-6 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-sm tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          Jetzt anfordern
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex justify-center lg:justify-end relative">
                {/* Mockup of a document */}
                <motion.div 
                  className="relative w-64 md:w-80 aspect-[1/1.4] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden rotate-3 hover:rotate-0 transition-all duration-500 ease-out"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Mock Header */}
                  <div className="h-24 bg-accent p-6 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Download className="text-white w-6 h-6" />
                    </div>
                  </div>
                  {/* Mock Content Lines */}
                  <div className="flex-1 p-6 space-y-4 bg-gradient-to-b from-white to-gray-50">
                    <div className="h-4 bg-gray-200 rounded-full w-3/4" />
                    <div className="h-4 bg-gray-200 rounded-full w-1/2" />
                    <div className="space-y-2 pt-6">
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-5/6" />
                    </div>
                     <div className="space-y-2 pt-4">
                      <div className="h-2 bg-gray-100 rounded-full w-full" />
                      <div className="h-2 bg-gray-100 rounded-full w-4/6" />
                    </div>
                  </div>
                  {/* Badge */}
                  <div className="absolute bottom-6 right-6 bg-primary text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                    PDF
                  </div>
                </motion.div>

                {/* Decorative Elements behind */}
                <div className="absolute -z-10 top-10 right-10 w-64 h-80 border-2 border-white/20 rounded-xl rotate-6" />
              </div>

            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
