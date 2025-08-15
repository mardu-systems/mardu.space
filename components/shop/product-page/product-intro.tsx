"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import type {ProductIntroProps} from "@/types/shop";
import Gallery from "@/components/shop/product-page/gallery";

export function ProductIntro({title, subtitle, badges, images}: ProductIntroProps) {
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
                {images?.length ? <Gallery images={images}/> : null}
            </CardContent>
        </Card>
    );
}
