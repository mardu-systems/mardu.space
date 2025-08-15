"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { FeaturesTabProps } from "@/types/shop";
import { Icon } from "./icon";

export function FeaturesTab({ features }: FeaturesTabProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {features.map((f, i) => (
        <motion.div
          key={f.title + i}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.3, delay: i * 0.03 }}
          className="rounded-2xl border border-neutral-800 p-4 bg-neutral-950/40"
        >
          <div className="flex items-start gap-3">
            <Icon name={f.icon} className="h-5 w-5 text-neutral-300 mt-0.5" />
            <div>
              <h4 className="text-base font-medium text-neutral-100">{f.title}</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">{f.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
