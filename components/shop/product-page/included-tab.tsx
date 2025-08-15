"use client";

import { Badge } from "@/components/ui/badge";

import type { IncludedTabProps } from "@/types/shop";
import { Icon } from "./icon";

export function IncludedTab({ items }: IncludedTabProps) {
  return (
    <ul className="space-y-2" aria-label="Lieferumfang">
      {items.map((it, i) => (
        <li
          key={it.name + i}
          className="flex items-start gap-3 rounded-xl border border-neutral-800 p-3 bg-neutral-950/40"
        >
          <Icon name={it.icon} className="mt-1 h-4 w-4 text-neutral-300" />
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-neutral-100">
              <span>{it.name}</span>
              {it.qty ? (
                <Badge variant="outline" className="border-neutral-700 text-neutral-300">
                  ×{it.qty}
                </Badge>
              ) : null}
            </div>
            {it.note ? <p className="text-xs text-neutral-400">{it.note}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
