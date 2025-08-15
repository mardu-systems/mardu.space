"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { PriceBoxProps } from "@/types/shop";
import { formatPriceCents } from "./utils";

export function PriceBox({
  basePriceCents,
  options = [],
  onAddToWishlist,
  onConfigure,
  ctas,
  stockInfo,
  selected: controlledSelected,
  onSelectedChange,
}: PriceBoxProps) {
  const router = useRouter();
  const [internalSelected, setInternalSelected] = useState<string[]>(
    options.filter((o) => o.default).map((o) => o.id)
  );
  const selected = controlledSelected ?? internalSelected;
  const setSelected = onSelectedChange ?? setInternalSelected;

  const totalCents = useMemo(() => {
    const delta = options
      .filter((o) => selected.includes(o.id))
      .reduce((s, o) => s + o.deltaPriceCents, 0);
    return basePriceCents + delta;
  }, [options, selected, basePriceCents]);

  const stockBadge = useMemo(() => {
    switch (stockInfo?.status) {
      case "in_stock":
        return (
          <Badge className="bg-emerald-600/20 text-emerald-300 border-emerald-700">
            Auf Lager
          </Badge>
        );
      case "preorder":
        return (
          <Badge className="bg-amber-600/20 text-amber-300 border-amber-700">
            Vorbestellung
          </Badge>
        );
      case "oos":
        return (
          <Badge className="bg-rose-600/20 text-rose-300 border-rose-700">
            Aktuell ausverkauft
          </Badge>
        );
      default:
        return null;
    }
  }, [stockInfo]);

  function handleWishlist() {
    const payload = { optionIds: selected };
    try {
      const key = "wishlist:gateway";
      const raw = window.localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      arr.push({ when: Date.now(), payload });
      window.localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    onAddToWishlist?.(payload);
    toast.success("Zur Merkliste hinzugefügt");
  }

  function handleConfigure() {
    const payload = { optionIds: selected };
    if (onConfigure) {
      onConfigure(payload);
    } else {
      const query = new URLSearchParams({ product: "gateway", opts: selected.join(",") });
      router.push(`/konfigurator?${query.toString()}`);
    }
  }

  return (
    <Card
      className={cn(
        "rounded-2xl border-neutral-800 bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60",
        "lg:sticky lg:top-[var(--sticky-top,88px)]"
      )}
      aria-label="Preis und Optionen"
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="text-xl font-semibold text-neutral-100">Preis</h2>
          {stockBadge}
        </div>
        <div className="text-3xl font-semibold tracking-tight text-neutral-50">
          {formatPriceCents(totalCents)}
        </div>
        <p className="text-sm text-neutral-400">inkl. MwSt., ggf. zzgl. Versand</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.length > 0 && (
          <div className="space-y-3" aria-label="Varianten">
            <h3 className="text-sm font-medium text-neutral-300">Varianten</h3>
            <div className="space-y-2">
              {options.map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border border-neutral-800 p-3 hover:bg-neutral-900/40",
                    selected.includes(o.id) && "bg-neutral-900/50"
                  )}
                >
                  <Checkbox
                    checked={selected.includes(o.id)}
                    onCheckedChange={(v) =>
                      setSelected(
                        v ? [...selected, o.id] : selected.filter((id) => id !== o.id)
                      )
                    }
                    aria-label={o.label}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-100">{o.label}</span>
                      {o.deltaPriceCents !== 0 && (
                        <span className="text-xs text-neutral-400">
                          {o.deltaPriceCents > 0 ? "+" : ""}
                          {formatPriceCents(o.deltaPriceCents)}
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
        <Separator className="bg-neutral-800" />
        {stockInfo?.note ? (
          <p className="text-xs text-neutral-400">{stockInfo.note}</p>
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button
            size="lg"
            className="rounded-xl"
            aria-label={ctas?.wishlistLabel ?? "Vormerken"}
            onClick={handleWishlist}
            variant="secondary"
          >
            {ctas?.wishlistLabel ?? "Vormerken"}
          </Button>
          <Button
            size="lg"
            className="rounded-xl"
            aria-label={ctas?.configureLabel ?? "Produkt konfigurieren"}
            onClick={handleConfigure}
          >
            {ctas?.configureLabel ?? "Produkt konfigurieren"}
            <ChevronRight className="ml-1 h-4 w-4" aria-hidden />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
