"use client";

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {formatPriceCents} from "./utils";

export function StickyMobileCTA({
                                    totalCents,
                                    onWishlist,
                                    onConfigure,
                                    labels = {wishlist: "Vormerken", configure: "Konfigurieren"},
                                }: {
    labels?: { wishlist?: string; configure?: string } & Record<string, string | undefined>;
    onConfigure: () => void;
    onWishlist: () => void;
    totalCents: number;
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
