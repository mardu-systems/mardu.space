'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Download, Loader2, CheckSquare } from 'lucide-react';
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
import { useRecaptcha } from '@/lib/recaptcha';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WhitepaperTeaserProps {
  className?: string;
}

export default function WhitepaperTeaser({ className }: WhitepaperTeaserProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const executeRecaptcha = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const token = await executeRecaptcha('whitepaper_signup');
      if (!token) throw new Error('Recaptcha verification failed');

      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role: 'whitepaper', token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
      setConsent(false);
      
      // Close dialog after success (optional, or keep open to show message)
      // setTimeout(() => setOpen(false), 3000); 
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten.');
    } finally {
      setLoading(false);
    }
  };

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
                    <DialogContent className="sm:max-w-md bg-card text-foreground">
                      <DialogHeader>
                        <DialogTitle>Whitepaper anfordern</DialogTitle>
                        <DialogDescription>
                          Melden Sie sich an, um das Whitepaper zu erhalten. Wir senden Ihnen einen Bestätigungslink per E-Mail.
                        </DialogDescription>
                      </DialogHeader>

                      {status === 'success' ? (
                        <div className="py-6 text-center space-y-4">
                          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                             <CheckSquare className="w-6 h-6 text-green-600" />
                          </div>
                          <p className="text-lg font-medium">Vielen Dank!</p>
                          <p className="text-muted-foreground">
                            Wir haben Ihnen eine Bestätigungs-E-Mail gesendet. 
                            Bitte klicken Sie auf den Link darin, um Ihre Anmeldung abzuschließen.
                          </p>
                          <Button variant="outline" onClick={() => setOpen(false)}>Schließen</Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                          <div className="space-y-2">
                            <Label htmlFor="wp.email">E-Mail Adresse</Label>
                            <Input
                              type="email"
                              id="wp.email"
                              required
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>

                          <div className="flex items-start space-x-3">
                            <Checkbox
                              id="wp.terms"
                              checked={consent}
                              onCheckedChange={(c) => setConsent(c === true)}
                              required
                              className="mt-1"
                            />
                            <Label
                              htmlFor="wp.terms"
                              className="text-xs font-normal leading-relaxed text-muted-foreground"
                            >
                              Ich stimme zu, dass ich per E-Mail kontaktiert werde. 
                              Diese Einwilligung kann jederzeit widerrufen werden.
                            </Label>
                          </div>

                          {status === 'error' && (
                             <Alert variant="destructive">
                               <AlertDescription>{errorMessage}</AlertDescription>
                             </Alert>
                          )}

                          <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                            disabled={loading || !consent}
                          >
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Jetzt anfordern
                          </Button>
                        </form>
                      )}
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
