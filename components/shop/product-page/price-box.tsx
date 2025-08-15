"use client";

import {useMemo, useState} from "react";
import {useRouter} from "next/navigation";
import {ChevronRight} from "lucide-react";
import {toast} from "sonner";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Checkbox} from "@/components/ui/checkbox";
import {cn} from "@/lib/utils";
import type {PriceBoxProps} from "@/types/shop";
import {formatPriceCents} from "./utils";

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
        const payload = {optionIds: selected};
        try {
            const key = "wishlist:gateway";
            const raw = window.localStorage.getItem(key);
            const arr = raw ? JSON.parse(raw) : [];
            arr.push({when: Date.now(), payload});
            window.localStorage.setItem(key, JSON.stringify(arr));
        } catch {
        }
        onAddToWishlist?.(payload);
        toast.success("Zur Merkliste hinzugefügt");
    }

    function handleConfigure() {
        const payload = {optionIds: selected};
        if (onConfigure) {
            onConfigure(payload);
        } else {
            const query = new URLSearchParams({product: "gateway", opts: selected.join(",")});
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
                <Separator/>
                {stockInfo?.note ? (
                    <p className="text-xs text-muted-foreground">{stockInfo.note}</p>
                ) : null}
                <div className="flex gap-2">
                    <Button
                        size="lg"
                        aria-label={ctas?.wishlistLabel ?? "Vormerken"}
                        onClick={handleWishlist}
                        variant="secondary"
                    >
                        {ctas?.wishlistLabel ?? "Vormerken"}
                    </Button>
                    <Button
                        size="lg"
                        aria-label={ctas?.configureLabel ?? "Produkt konfigurieren"}
                        onClick={handleConfigure}
                    >
                        {ctas?.configureLabel ?? "Produkt konfigurieren"}
                        <ChevronRight className="ml-1 h-4 w-4" aria-hidden/>
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
}
