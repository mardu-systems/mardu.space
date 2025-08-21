"use client";

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export type FaqItem = {
    question: string;
    answer: string;
};

export type FaqProps = {
    items: FaqItem[];
    className?: string;
};

export default function Faq({items, className}: FaqProps) {
    return (
        <Accordion type="single" collapsible className={className}>
            {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-2xl">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-lg">{item.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
