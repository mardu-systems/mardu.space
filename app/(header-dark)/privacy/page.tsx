import type {Metadata} from "next";
import Link from "next/link";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {CookieSettingsButton} from "@/components/CookieSettingsButton";
import fs from "fs/promises";
import path from "path";
import Markdown from "react-markdown";

// Hinweis: Diese Datei bleibt eine Server Component (kein "use client").

export const metadata: Metadata = {
    title: "Datenschutzerklärung",
    description: "Informationen zum Datenschutz bei mardu.space."
};

export default async function Privacy() {
    const filePath = path.join(process.cwd(), "privacy.md");
    const fileContent = await fs.readFile(filePath, "utf8");

    const today = new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin"
    }).format(new Date());
    const changed = "20.8.2025"

    return (
        <main
            className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10"
        >
            <div className="max-w-5xl mx-auto px-4">
                <Card className="shadow-lg">
                    <CardHeader className="text-center rounded-t-xl">
                        <CardTitle className="text-3xl font-bold">Datenschutzerklärung</CardTitle>
                        <p className="text-sm text-gray-600">Stand: {today}</p>
                        <p className="text-sm text-gray-600">Geändert: {changed}</p>
                    </CardHeader>

                    <CardContent className="space-y-6 text-base">
                        <article className="prose lg:prose-xl max-w-none">
                            <Markdown>
                                {fileContent}
                            </Markdown>
                        </article>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                            <Link href="/">
                                <Button variant="outline">Zurück zur Startseite</Button>
                            </Link>

                            {/* Der klickbare Button liegt in einer Client Component */}
                            <CookieSettingsButton/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}