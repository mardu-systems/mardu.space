"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import type { BuildGuideTabProps } from "@/types/shop";

export function BuildGuideTab({ steps }: BuildGuideTabProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {steps.map((s, idx) => (
        <AccordionItem key={s.title + idx} value={`step-${idx}`}>
          <AccordionTrigger className="text-left">{s.title}</AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-invert max-w-none prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: s.contentHtml }}
            />
            {s.assets?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {s.assets.map((a, i) => (
                  <Button key={a.href + i} asChild variant="outline" size="sm">
                    <a href={a.href} target="_blank" rel="noopener noreferrer">
                      {a.label}
                    </a>
                  </Button>
                ))}
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
