'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/motion/scroll-reveal';

interface WhitepaperTeaserProps {
  className?: string;
}

export default function WhitepaperTeaser({ className }: WhitepaperTeaserProps) {
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
                  <Button asChild size="lg" className="h-14 px-8 text-base bg-accent hover:bg-accent/90 text-accent-foreground border-none">
                    <Link href="/whitepaper">
                      Jetzt kostenlos herunterladen
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
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
