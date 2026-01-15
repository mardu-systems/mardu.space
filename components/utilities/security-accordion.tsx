import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type AccordionData = {
  id: string;
  title: string;
  content: string | ReactNode;
};

interface SecurityAccordionProps {
  title: string;
  items: AccordionData[];
  className?: string;
}

export default function SecurityAccordion({ title, items, className }: SecurityAccordionProps) {
  return (
    <section
      className={cn('bg-background py-20 px-6 md:px-8 w-full border-t border-border', className)}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary">{title}</h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              // Using border-border which is consistent with shadcn theme.
              // Adding bg-card to make it distinct from the section background.
              className="border border-border rounded-[16px] px-6 overflow-hidden data-[state=open]:border-primary/20 transition-all duration-300 shadow-sm bg-card"
            >
              <AccordionTrigger className="text-lg md:text-xl font-bold text-left text-primary hover:no-underline hover:text-primary/80 py-6">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-[16px] leading-relaxed pb-6">
                {typeof item.content === 'string' ? <p>{item.content}</p> : item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
