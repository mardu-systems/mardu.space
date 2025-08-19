import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";

// Hinweis: Diese Datei bleibt eine Server Component (kein "use client").

export const metadata: Metadata = {
    title: "Datenschutzerklärung",
    description: "Informationen zum Datenschutz bei mardu.space."
};

export default function Privacy() {
    const today = new Intl.DateTimeFormat("de-DE", {
        timeZone: "Europe/Berlin"
    }).format(new Date());

    return (
        <main className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Datenschutzerklärung</CardTitle>
                        <p className="text-sm text-gray-600">Stand: {today}</p>
                    </CardHeader>

                    <CardContent className="space-y-6 text-sm leading-relaxed">
                        {/* 1. Verantwortlicher */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">1. Verantwortlicher</h2>
                            <div className="space-y-1">
                                <p><strong>[Ihr Firmenname]</strong></p>
                                <p>[Ihre Anschrift]</p>
                                <p>[PLZ Ort]</p>
                                <p>
                                    E-Mail:
                                    <a
                                        href="mailto:info@mardu.space"
                                        className="underline ml-1 text-blue-600"
                                    >
                                        info@mardu.space
                                    </a>
                                </p>
                                <p>Telefon: [Ihre Telefonnummer]</p>
                            </div>
                        </section>

                        {/* 2. Allgemeine Hinweise */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">2. Allgemeine Hinweise</h2>
                            <p>
                                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                                passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                                persönlich identifiziert werden können.
                            </p>
                        </section>

                        {/* 3. Datenerfassung auf unserer Website */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">3. Datenerfassung auf unserer Website</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">
                                        Wer ist verantwortlich für die Datenerfassung auf dieser Website?
                                    </h3>
                                    <p>
                                        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                                        können Sie dem Impressum dieser Website entnehmen.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Wie erfassen wir Ihre Daten?</h3>
                                    <p>
                                        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                                        z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                                    </p>
                                    <p className="mt-2">
                                        Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind
                                        vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Wofür nutzen wir Ihre Daten?</h3>
                                    <p>
                                        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                                        Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Hosting */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">
                                4. Hosting und Content Delivery Networks (CDN)
                            </h2>
                            <div>
                                <h3 className="font-medium mb-2">Externes Hosting</h3>
                                <p>
                                    Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten,
                                    die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es
                                    sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
                                    Kontaktdaten, Namen, Websitezugriffe und sonstige Daten handeln, die über eine Website generiert
                                    werden.
                                </p>
                                <p className="mt-2">
                                    Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                                    bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                                    effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1
                                    lit. f DSGVO).
                                </p>
                            </div>
                        </section>

                        {/* 5. Hinweise & Pflichtinformationen */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">5. Allgemeine Hinweise und Pflichtinformationen</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Datenschutz</h3>
                                    <p>
                                        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                                        Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften
                                        sowie dieser Datenschutzerklärung.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Hinweis zur verantwortlichen Stelle</h3>
                                    <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                                    <div className="mt-2 pl-4">
                                        <p>[Ihr Firmenname]</p>
                                        <p>[Ihre Anschrift]</p>
                                        <p>[PLZ Ort]</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
                                    <p>
                                        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können
                                        eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per
                                        E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom
                                        Widerruf unberührt.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">
                                        Beschwerderecht bei der zuständigen Aufsichtsbehörde
                                    </h3>
                                    <p>
                                        Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der
                                        zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in datenschutzrechtlichen Fragen ist
                                        der Landesdatenschutzbeauftragte des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Recht auf Datenübertragbarkeit</h3>
                                    <p>
                                        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                                        Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                                        maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
                                        einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
                                    <p>
                                        Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie
                                        zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
                                        TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am „https://“ und am
                                        Schloss-Symbol in der Adresszeile Ihres Browsers.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Auskunft, Sperrung, Löschung</h3>
                                    <p>
                                        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                                        Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
                                        der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                                        Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der
                                        im Impressum angegebenen Adresse an uns wenden.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Datenerfassung */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">6. Datenerfassung auf unserer Website</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-medium mb-2">Cookies</h3>
                                    <p>
                                        Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen
                                        Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher,
                                        effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt
                                        werden und die Ihr Browser speichert.
                                    </p>
                                    <p className="mt-2">
                                        Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies“. Sie werden nach Ende
                                        Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie
                                        diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Server-Log-Dateien</h3>
                                    <p>
                                        Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                                        Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>Browsertyp und Browserversion</li>
                                        <li>verwendetes Betriebssystem</li>
                                        <li>Referrer URL</li>
                                        <li>Hostname des zugreifenden Rechners</li>
                                        <li>Uhrzeit der Serveranfrage</li>
                                        <li>IP-Adresse</li>
                                    </ul>
                                    <p className="mt-2">
                                        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die
                                        Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-medium mb-2">Kontaktformular</h3>
                                    <p>
                                        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                                        Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                                        und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre
                                        Einwilligung weiter.
                                    </p>
                                    <p className="mt-2">
                                        Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt auf Grundlage Ihrer
                                        Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 7/8: Platzhalter Analytics/Plugins */}
                        <section>
                            <h2 className="font-semibold text-lg mb-3">7. Analyse Tools und Werbung</h2>
                            <p>
                                Wir verwenden derzeit keine Analyse-Tools oder Werbemittel auf dieser Website. Sollte sich dies ändern,
                                werden wir Sie entsprechend informieren und diese Datenschutzerklärung aktualisieren.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-semibold text-lg mb-3">8. Plugins und Tools</h2>
                            <p>
                                Diese Website verwendet derzeit keine externen Plugins oder Tools von Drittanbietern. Sollte sich dies
                                ändern, werden wir Sie entsprechend informieren und diese Datenschutzerklärung aktualisieren.
                            </p>
                        </section>

                        {/* Kontakt & Aktionen */}
                        <section className="border-t pt-6">
                            <h2 className="font-semibold text-lg mb-3">Kontakt bei Datenschutzfragen</h2>
                            <p>Bei Fragen zum Datenschutz wenden Sie sich bitte an:</p>
                            <div className="mt-2">
                                <p>
                                    E-Mail:
                                    <a
                                        href="mailto:info@mardu.space"
                                        className="underline ml-1 text-blue-600"
                                    >
                                        info@mardu.space
                                    </a>
                                </p>
                            </div>
                        </section>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                            <Link href="/">
                                <Button variant="outline">Zurück zur Startseite</Button>
                            </Link>

                            {/* Der klickbare Button liegt in einer Client Component */}
                            <CookieSettingsButton />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}