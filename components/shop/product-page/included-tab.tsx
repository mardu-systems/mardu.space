"use client";

import {Badge} from "@/components/ui/badge";

import type {IncludedTabProps} from "@/types/shop";
import {Icon} from "./icon";

export function IncludedTab({items}: IncludedTabProps) {
    return (
        <ul className="space-y-2" aria-label="Lieferumfang">
            {items.map((it, i) => (
                <li
                    key={it.name + i}
                    className="flex items-start gap-3 rounded-xl border p-3 bg-muted/50"
                >
                    <Icon name={it.icon} className="mt-1 h-4 w-4"/>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-sm">
                            <span>{it.name}</span>
                            {it.qty ? (
                                <Badge variant="outline">×{it.qty}</Badge>
                            ) : null}
                        </div>
                        {it.note ? <p className="text-xs text-muted-foreground">{it.note}</p> : null}
                    </div>
                </li>
            ))}
        </ul>
    );
}
