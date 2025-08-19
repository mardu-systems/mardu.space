import type { Metadata } from "next";
import Link from "next/link";
import {listProducts} from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Entdecke Produkte und Lösungen von mardu.space."
};

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <div className="space-y-8 pt-16">
      {products.map((p) => (
        <div key={p.slug} className="space-y-2">
          <h2 className="text-2xl font-semibold">{p.intro.title}</h2>
          {p.intro.subtitle ? (
            <p className="text-muted-foreground">{p.intro.subtitle}</p>
          ) : null}
          <Link href={`/shop/${p.slug}`} className="underline">
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}
