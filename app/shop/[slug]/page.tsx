import {notFound} from "next/navigation";
import ProductPageClient from "./ProductPageClient";
import {getProductData, listProducts} from "@/lib/products";

export async function generateStaticParams() {
    const products = await listProducts();
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({params}: { params: { slug: string } }) {
    const data = await getProductData(params.slug);
    if (!data) {
        notFound();
    }
    return <ProductPageClient data={data}/>;
}

