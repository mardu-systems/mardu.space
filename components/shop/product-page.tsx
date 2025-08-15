"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  RadioTower,
  ShieldCheck,
  Shuffle,
  Server,
  Wrench,
  Check,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type {
  ProductIntroProps,
  PriceBoxProps,
  FeaturesTabProps,
  IncludedTabProps,
  BuildGuideTabProps,
  ProductPageData,
} from "./types";

const ICONS: Record<string, LucideIcon> = {
  RadioTower,
  ShieldCheck,
  Shuffle,
  Server,
  Wrench,
  Check,
};

function Icon({ name, className }: { name?: string; className?: string }) {
  const Cmp = name ? ICONS[name] : undefined;
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden />;
}

function formatPriceCents(
  cents: number,
  locale: string = "de-DE",
  currency: string = "EUR"
) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    cents / 100
  );
}

function ProductIntro({ title, subtitle, descriptionHtml, badges }: ProductIntroProps) {
  const reduceMotion = useReducedMotion();
  return (
    <Card className="rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {badges?.map((b) => (
            <Badge key={b} variant="secondary">
              {b}
            </Badge>
          ))}
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-base text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="prose max-w-none prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
      </CardContent>
    </Card>
  );
}

function PriceBox({
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
  }, [options, basePriceCents]);

  const stockBadge = useMemo(() => {
    switch (stockInfo?.status) {
      case "in_stock":
        return <Badge>Auf Lager</Badge>;
      case "preorder":
        return <Badge variant="secondary">Vorbestellung</Badge>;
      case "oos":
        return <Badge variant="destructive">Aktuell ausverkauft</Badge>;
      default:
        return null;
    }
  }, [stockInfo?.status]);

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
        "rounded-2xl backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "lg:sticky lg:top-[var(--sticky-top,88px)]"
      )}
      aria-label="Preis und Optionen"
    >
      <CardHeader className="space-y-3">
        <div className="flex items-center gap-3 justify-between">
          <h2 className="text-xl font-semibold">Preis</h2>
          {stockBadge}
        </div>
        <div className="text-3xl font-semibold tracking-tight">
          {formatPriceCents(totalCents)}
        </div>
        <p className="text-sm text-muted-foreground">inkl. MwSt., ggf. zzgl. Versand</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.length > 0 && (
          <div className="space-y-3" aria-label="Varianten">
            <h3 className="text-sm font-medium text-muted-foreground">Varianten</h3>
            <div className="space-y-2">
              {options.map((o) => (
                <label
                  key={o.id}
                  className={cn(
                    "flex items-start gap-3 rounded-xl border p-3 hover:bg-muted/50",
                    selected.includes(o.id) && "bg-muted"
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
                      <span className="text-sm">{o.label}</span>
                      {o.deltaPriceCents !== 0 && (
                        <span className="text-xs text-muted-foreground">
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
        <Separator />
        {stockInfo?.note ? (
          <p className="text-xs text-muted-foreground">{stockInfo.note}</p>
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

function FeaturesTab({ features }: FeaturesTabProps) {
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
          className="rounded-2xl border p-4 bg-muted/50"
        >
          <div className="flex items-start gap-3">
            <Icon name={f.icon} className="h-5 w-5 mt-0.5" />
            <div>
              <h4 className="text-base font-medium">{f.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function IncludedTab({ items }: IncludedTabProps) {
  return (
    <ul className="space-y-2" aria-label="Lieferumfang">
      {items.map((it, i) => (
        <li
          key={it.name + i}
          className="flex items-start gap-3 rounded-xl border p-3 bg-muted/50"
        >
          <Icon name={it.icon} className="mt-1 h-4 w-4" />
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

function BuildGuideTab({ steps }: BuildGuideTabProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {steps.map((s, idx) => (
        <AccordionItem key={s.title + idx} value={`step-${idx}`}>
          <AccordionTrigger className="text-left">{s.title}</AccordionTrigger>
          <AccordionContent>
            <div
              className="prose max-w-none prose-p:leading-relaxed"
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

function SectionTabs({ data }: { data: ProductPageData["tabs"] }) {
  return (
    <Tabs defaultValue="features" className="w-full">
      <div
        className={cn(
          "sticky top-[var(--sticky-top,88px)] z-20",
          "bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "rounded-2xl border"
        )}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="features" className="data-[state=active]:bg-muted">
            Features
          </TabsTrigger>
          <TabsTrigger value="included" className="data-[state=active]:bg-muted">
            Enthalten
          </TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-muted">
            Bauanleitung
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="mt-4 space-y-6">
        <TabsContent value="features" className="m-0">
          <FeaturesTab features={data.features.features} />
        </TabsContent>
        <TabsContent value="included" className="m-0">
          <IncludedTab items={data.included.items} />
        </TabsContent>
        <TabsContent value="guide" className="m-0">
          <BuildGuideTab steps={data.guide.steps} />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function StickyMobileCTA({
  totalCents,
  onWishlist,
  onConfigure,
  labels = { wishlist: "Vormerken", configure: "Konfigurieren" },
}: {
  totalCents: number;
  onWishlist: () => void;
  onConfigure: () => void;
  labels?: { wishlist?: string; configure?: string } & Record<string, string | undefined>;
}) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-30 border-t",
        "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        "px-4 py-3 lg:hidden"
      )}
      role="region"
      aria-label="Schnellaktionen"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="block text-xs text-muted-foreground">Preis</span>
          <span className="text-lg font-semibold">
            {formatPriceCents(totalCents)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="rounded-xl" onClick={onWishlist}>
            {labels.wishlist ?? "Vormerken"}
          </Button>
          <Button className="rounded-xl" onClick={onConfigure}>
            {labels.configure ?? "Konfigurieren"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ProductPage({
  data,
  headerOffset = 80,
}: {
  data: ProductPageData;
  headerOffset?: number;
}) {
  const style = {
    "--sticky-top": `calc(${headerOffset}px + 8px)`,
  } as React.CSSProperties;

  const [selected, setSelected] = useState<string[]>(
    data.pricing.options?.filter((o) => o.default).map((o) => o.id) ?? []
  );
  const totalCents = useMemo(() => {
    const delta = (data.pricing.options ?? [])
      .filter((o) => selected.includes(o.id))
      .reduce((s, o) => s + o.deltaPriceCents, 0);
    return data.pricing.basePriceCents + delta;
  }, [data.pricing.basePriceCents, data.pricing.options, selected]);

  return (
    <div className="min-h-screen" style={style}>
      <main className="container mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,380px)] gap-5">
          <div className="space-y-6">
            <ProductIntro {...data.intro} />
            <SectionTabs data={data.tabs} />
          </div>
          <div>
            <PriceBox
              {...data.pricing}
              selected={selected}
              onSelectedChange={setSelected}
            />
          </div>
        </div>
      </main>

      <StickyMobileCTA
        totalCents={totalCents}
        onWishlist={() => toast.success("Zur Merkliste hinzugefügt")}
        onConfigure={() => {
          const query = new URLSearchParams({
            product: data.slug,
            opts: selected.join(","),
          });
          window.location.assign(`/konfigurator?${query.toString()}`);
        }}
        labels={{
          wishlist: data.pricing.ctas?.wishlistLabel,
          configure: data.pricing.ctas?.configureLabel,
        }}
      />
    </div>
  );
}
