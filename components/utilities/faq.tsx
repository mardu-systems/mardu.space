'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export type FaqItem = {
  question: string;
  answer: React.ReactNode; // flexibler als string
};

export type FaqProps = {
  items: FaqItem[];
  className?: string;
};

export default function Faq({ items, className }: FaqProps) {
  return (
    <Accordion type="single" collapsible className={cn('w-full space-y-2', className)}>
      {items.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger className="text-xl font-semibold text-foreground">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
