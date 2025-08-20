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
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
                <CardHeader>
                    <CardTitle className="text-center">Impressum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <article className="prose lg:prose-xl max-w-none"><Markdown>{fileContent}</Markdown></article>
                </CardContent>
            </Card>
        </main>
    )
}