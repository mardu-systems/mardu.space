"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

export default function NumberStep({ value, onChange, note }: { value: number; onChange: (v: number) => void; note?: string }) {
  const clamp = (v: number) => Math.max(0, Math.min(999, v));
  return (
    <>
      {note && (
        <div className="text-sm text-ink-700 bg-amber-50 border border-amber-200 mx-auto w-fit p-3 rounded-xl mb-4">
          {note}
        </div>
      )}
      <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-col items-stretch justify-center gap-4">
          <div className="flex-1 rounded-2xl border-2 bg-white text-ink-600">
            <Input
              type="number"
              value={value}
              onChange={(e) => onChange(clamp(Number(e.target.value || 0)))}
              className="h-20 text-center text-4xl font-extrabold border-0 focus-visible:ring-0"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">Tipp: ↑/↓ ändern ebenfalls den Wert.</p>
      </div>
    </>
  );
}

