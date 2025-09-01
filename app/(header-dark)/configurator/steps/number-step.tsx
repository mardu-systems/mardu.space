'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

export default function NumberStep({
  value,
  onChange,
  note,
}: {
  value: number;
  onChange: (v: number) => void;
  note?: string;
}) {
  const clamp = React.useCallback((v: number) => Math.max(0, Math.min(999, v)), []);
  const [display, setDisplay] = React.useState(value === 0 ? '' : String(value));

  React.useEffect(() => {
    const numericDisplay = clamp(Number(display || 0));
    if (value !== numericDisplay) {
      setDisplay(value === 0 ? '' : String(value));
    }
  }, [value, display, clamp]);

  return (
    <>
      {note && (
        <div className="text-sm text-ink-700 bg-amber-50 border border-amber-200 mx-auto w-fit p-3 rounded-xl mb-4">
          {note}
        </div>
      )}
      <div className="mx-auto w-full max-w-sm">
        <div className="flex flex-col items-stretch justify-center gap-4">
          <div className="flex-1 rounded-2xl border-2 bg-white text-ink-600 focus-within:ring-2">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              value={display}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setDisplay('');
                  onChange(0);
                  return;
                }
                const parsed = Number(raw);
                const safe = Number.isFinite(parsed) ? clamp(parsed) : 0;
                setDisplay(safe === 0 ? '' : String(safe));
                onChange(safe);
              }}
              onKeyDown={(e) => {
                // Prevent entering characters like '-', '+', 'e'
                if (e.key === '-' || e.key === '+' || e.key.toLowerCase() === 'e') {
                  e.preventDefault();
                }
              }}
              placeholder="0"
              className="h-20 text-center text-4xl font-extrabold border-0 focus-visible:ring-0 focus:outline-none rounded-2xl"
            />
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-ink-400">
          Tipp: ↑/↓ ändern ebenfalls den Wert.
        </p>
      </div>
    </>
  );
}
