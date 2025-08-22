import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Brand Assets",
    description: "Logos und Assets von mardu.space zum Download.",
};

export default function BrandPage() {
    return (
        <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Brand Assets</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-sm leading-relaxed">
                        <p className="text-center">
                            Hier findest du Logos von mardu.space zur Verwendung in Presse und Marketingmaterialien.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                            <a
                                href="/marduspace_logo_bg_white.svg"
                                download
                                className="flex flex-col items-center"
                            >
                                <Image
                                    src="/marduspace_logo_bg_white.svg"
                                    alt="mardu.space Logo auf dunklem Hintergrund"
                                    width={200}
                                    height={200}
                                    className="border rounded-md bg-white p-4"
                                />
                                <span className="underline mt-2">Download (SVG)</span>
                            </a>
                            <a
                                href="/marduspace_logo_bg_black.svg"
                                download
                                className="flex flex-col items-center"
                            >
                                <Image
                                    src="/marduspace_logo_bg_black.svg"
                                    alt="mardu.space Logo auf hellem Hintergrund"
                                    width={200}
                                    height={200}
                                    className="border rounded-md bg-black p-4"
                                />
                                <span className="underline mt-2">Download (SVG)</span>
                            </a>
                        </div>
                        <div className="flex justify-center pt-6">
                            <Link href="/">
                                <Button variant="outline">Zurück zur Startseite</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
