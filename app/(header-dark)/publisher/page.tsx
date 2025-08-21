import type {Metadata} from "next"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"
import path from "path";
import fs from "fs/promises";
import Markdown from "react-markdown";

export const metadata: Metadata = {
    title: "Impressum",
    description: "Angaben gemäß § 5 TMG für mardu.space."
}

export default async function Publisher() {
    const filePath = path.join(process.cwd(), "publisher.md");
    const fileContent = await fs.readFile(filePath, "utf8");

    return (
        <main
            className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10"
        >
            <div className="max-w-5xl mx-auto px-4">
                <Card className="shadow-lg">
                    <CardHeader className="text-center rounded-t-xl">
                        <CardTitle className="text-3xl font-bold">Impressum</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-base">
                        <article className="prose lg:prose-xl max-w-none">
                            <Markdown>{fileContent}</Markdown>
                        </article>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}