import type {Metadata} from "next"
import path from "path";
import fs from "fs/promises";
import Markdown from "react-markdown";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Impressum",
    description: "Angaben gemäß § 5 TMG für mardu.space."
}

export default async function Publisher() {
    const filePath = path.join(process.cwd(), "publisher.md");
    const fileContent = await fs.readFile(filePath, "utf8");

    return (
        <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
            <section className="max-w-4xl mx-auto px-4 py-10">
                <div className="text-center">
                    <div className="text-center rounded-t-xl">
                        <h1 className="text-3xl font-bold">Impressum</h1>
                    </div>
                </div>
                <div className="space-y-6 pt-8 text-base">
                    <article className="prose lg:prose-xl max-w-none">
                        <Markdown>
                            {fileContent}
                        </Markdown>
                    </article>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                        <Link href="/">
                            <Button variant="outline">Zurück zur Startseite</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}