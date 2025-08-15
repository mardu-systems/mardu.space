"use client";

import {ProductPage} from "@/components/shop/product-page";
import type {ProductPageData} from "@/types/shop";

export default function ProductPageClient({data}: { data: ProductPageData }) {
    return (
        <div className="pt-16">
            <ProductPage data={data}/>
        </div>
    );
}
