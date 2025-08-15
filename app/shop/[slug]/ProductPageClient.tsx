"use client";

import {useHeaderVariant} from "@/components/HeaderVariantContext";
import {ProductPage} from "@/components/shop/product-page";
import type {ProductPageData} from "@/types/shop";

export default function ProductPageClient({data}: { data: ProductPageData }) {
    const headerVariant = useHeaderVariant();
    headerVariant.setVariant("light");
    return (
        <div className="pt-16">
            <ProductPage data={data}/>
        </div>
    );
}
