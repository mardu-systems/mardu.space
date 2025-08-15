"use client";

import {useState} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";

export type GalleryProductType = {
    images: string[];
};

export default function Gallery({images}: GalleryProductType) {
    const [active, setActive] = useState(0);
    const featImage = images[active];

    return (
        <section className="flex flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-lg aspect-square">
                <Image
                    src={featImage}
                    alt=""
                    fill
                    sizes="44vw, 66vw"
                    className="object-cover"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto">
                {images.map((image, idx) => (
                    <button
                        type="button"
                        key={image}
                        onClick={() => setActive(idx)}
                        className={cn(
                            "relative h-20 w-20 flex-shrink-0 overflow-hidden border",
                            active === idx && "ring-2 ring-ring"
                        )}>
                        <Image src={image} alt="" fill sizes="80px" className="object-cover"/>
                    </button>
                ))}
            </div>
        </section>
    );
}