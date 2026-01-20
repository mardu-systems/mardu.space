'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';

export default function NumberStep({
  value,
  onChange,
  note,
  ariaLabel = 'Anzahl',
}: {
  value: number;
  onChange: (v: number) => void;
  note?: string;
  ariaLabel?: string;
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
          <div className="flex-1 rounded-2xl border-2 bg-white text-ink-600 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary/50">
            <Input
              type="text"
              min={0}
              inputMode="numeric"
              pattern="[0-9]*"
              aria-label={ariaLabel}
              value={display}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setDisplay('');
                  onChange(0);
                  return;
                }
                setDisplay(raw);
                if (/^\d+$/.test(raw)) {
                  const safe = clamp(Number(raw));
                  onChange(safe);
                }
              }}
              onBlur={(e) => {
                const normalized = e.target.value.replace(/[^\d]/g, '');
                const parsed = normalized ? clamp(Number(normalized)) : 0;
                setDisplay(parsed === 0 ? '' : String(parsed));
                onChange(parsed);
              }}
              placeholder="z. B. 3…"
              className="h-20 text-center text-4xl font-extrabold border-0 focus-visible:ring-0 focus:outline-none rounded-2xl touch-manipulation"
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
