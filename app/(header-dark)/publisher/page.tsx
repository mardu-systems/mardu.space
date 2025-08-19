import type { Metadata } from "next"
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Impressum",
    description: "Angaben gemäß § 5 TMG für mardu.space."
}

export default function Publisher() {
    return (
        <main className="min-h-screen flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full">
                <CardHeader>
                    <CardTitle className="text-center">Impressum</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-sm">
                    <section>
                        <h3 className="font-semibold text-lg mb-2">Angaben gemäß § 5 TMG</h3>
                        <div className="space-y-1">
                            <p><strong>[Ihr Firmenname]</strong></p>
                            <p>[Ihre Anschrift]</p>
                            <p>[PLZ Ort]</p>
                            <p>[Land]</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg mb-2">Kontakt</h3>
                        <div className="space-y-1">
                            <p>Telefon: [Ihre Telefonnummer]</p>
                            <p>E-Mail:
                                <a href="mailto:info@mardu.space" className="underline ml-1">
                                    info@mardu.space
                                </a>
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2
                            RStV</h3>
                        <div className="space-y-1">
                            <p>[Name des Verantwortlichen]</p>
                            <p>[Anschrift des Verantwortlichen]</p>
                            <p>[PLZ Ort]</p>
                        </div>
                    </section>

                    {/* Optional: Weitere Abschnitte je nach Bedarf */}
                    <section>
                        <h3 className="font-semibold text-lg mb-2">Handelsregister</h3>
                        <div className="space-y-1">
                            <p>Eintragung im Handelsregister.</p>
                            <p>Registergericht: [Registergericht]</p>
                            <p>Registernummer: [Registernummer]</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg mb-2">Umsatzsteuer</h3>
                        <div className="space-y-1">
                            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                            <p>[Ihre USt-IdNr.]</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="font-semibold text-lg mb-2">Haftungsausschluss</h3>
                        <div className="space-y-3 text-xs leading-relaxed">
                            <div>
                                <h4 className="font-semibold">Haftung für Inhalte</h4>
                                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
                                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                                    Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte
                                    fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                                    rechtswidrige Tätigkeit hinweisen.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Haftung für Links</h4>
                                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                                    keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                                    Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                                    Anbieter oder Betreiber der Seiten verantwortlich.</p>
                            </div>
                            <div>
                                <h4 className="font-semibold">Urheberrecht</h4>
                                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                                    unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                                    Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                                    bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                            </div>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </main>
    )
}