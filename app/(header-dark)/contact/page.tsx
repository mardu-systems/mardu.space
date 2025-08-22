import type {Metadata} from "next";
import Link from "next/link";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
    title: "Kontakt",
    description:
        "Kontaktiere das Team von mardu.space und erfahre, wie du uns im Alten Schlachthof erreichst.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))] pb-10">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Kontakt</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 text-sm leading-relaxed">
                        <p>
                            Du hast Fragen oder möchtest uns besuchen? Melde dich gerne bei uns.
                        </p>
                        <div className="space-y-1">
                            <p>
                                <strong>Mardu A1</strong>
                                <br/>
                                Alter Schlachthof 39
                                <br/>
                                76131 Karlsruhe
                                <br/>
                                Deutschland
                            </p>
                            <p>
                                Telefon: <a href="tel:015202189213" className="underline">015202189213</a>
                                <br/>
                                E-Mail: <a href="mailto:info@mardu.de" className="underline">info@mardu.de</a>
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Anfahrt</h2>
                            <p>
                                Unser Büro befindet sich im Kreativpark Alter Schlachthof in Karlsruhe.
                                Die Straßenbahnhaltestellen Tullastraße sowie Gottesauer Platz/BGV (Linien 1 und 2)
                                liegen nur wenige Minuten zu Fuß entfernt.
                            </p>
                            <p>
                                Mit dem Auto erreichst du uns über die Durlacher Allee. Folge der Beschilderung zum
                                Alten Schlachthof
                                und nutze die Parkplätze auf dem Gelände.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Schreib uns</h2>
                            <ContactForm/>
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
