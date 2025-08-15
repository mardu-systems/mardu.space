"use client";

import * as React from "react";
import {useMemo, useState} from "react";
import {toast} from "sonner";

import type {ProductPageData} from "@/types/shop";
import {ProductIntro} from "./product-intro";
import {SectionTabs} from "./section-tabs";
import {PriceBox} from "./price-box";
import {StickyMobileCTA} from "./sticky-mobile-cta";

export function ProductPage({
                                data,
                            }: {
    data: ProductPageData;
}) {
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
        <div className="min-h-screen">
            <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,380px)] gap-5">
                    <ProductIntro {...data.intro} />
                    <PriceBox
                        {...data.pricing}
                        selected={selected}
                        onSelectedChange={setSelected}
                    />
                </div>
                <SectionTabs data={data.tabs}/>
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
