import fs from "fs/promises";
import path from "path";
import type {ProductPageData} from "@/types/shop";

const productsDir = path.join(process.cwd(), "data", "products");

export async function getProductData(slug: string): Promise<ProductPageData | null> {
  try {
    const file = await fs.readFile(path.join(productsDir, `${slug}.json`), "utf8");
    return JSON.parse(file) as ProductPageData;
  } catch {
    return null;
  }
}

export async function listProducts(): Promise<ProductPageData[]> {
  const entries = await fs.readdir(productsDir);
  const products: ProductPageData[] = [];
  for (const entry of entries) {
    if (entry.endsWith(".json")) {
      const data = await getProductData(entry.replace(/\.json$/, ""));
      if (data) products.push(data);
    }
  }
  return products;
}
