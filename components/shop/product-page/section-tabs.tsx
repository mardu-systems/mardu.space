"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import type { ProductPageData } from "@/types/shop";
import { FeaturesTab } from "./features-tab";
import { IncludedTab } from "./included-tab";
import { BuildGuideTab } from "./build-guide-tab";

export function SectionTabs({ data }: { data: ProductPageData["tabs"] }) {
  return (
    <Tabs defaultValue="features" className="w-full">
      <div
        className={cn(
          "sticky top-[var(--sticky-top,88px)] z-20",
          "bg-neutral-950/60 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60",
          "rounded-2xl border border-neutral-800"
        )}
      >
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="features" className="data-[state=active]:bg-neutral-800">
            Features
          </TabsTrigger>
          <TabsTrigger value="included" className="data-[state=active]:bg-neutral-800">
            Enthalten
          </TabsTrigger>
          <TabsTrigger value="guide" className="data-[state=active]:bg-neutral-800">
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
