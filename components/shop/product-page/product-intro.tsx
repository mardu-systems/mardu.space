"use client";

import { motion, useReducedMotion } from "framer-motion";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ProductIntroProps } from "@/types/shop";

export function ProductIntro({ title, subtitle, descriptionHtml, badges }: ProductIntroProps) {
  const reduceMotion = useReducedMotion();
  return (
    <Card className="rounded-2xl bg-neutral-950/40 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/40 border-neutral-800">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {badges?.map((b) => (
            <Badge key={b} variant="secondary" className="bg-neutral-800 text-neutral-100">
              {b}
            </Badge>
          ))}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-50">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-base text-neutral-300">{subtitle}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="prose prose-invert max-w-none prose-p:leading-relaxed prose-a:text-neutral-100"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </CardContent>
    </Card>
  );
}
