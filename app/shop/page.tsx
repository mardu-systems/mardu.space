import {ProductPage} from "@/components/shop/product-page";
import {ProductPageData} from "@/components/shop/types";


const demoData: ProductPageData = {
    slug: "gateway",
    intro: {
        title: "Das Gateway",
        subtitle: "Edge‑Connector für Maschinen und Türen",
        descriptionHtml:
            "<p>Unser Gateway verbindet Maschinen, Türen und Sensorik sicher mit der zentralen Plattform. <strong>Offline‑fähig</strong> mit Edge‑Caching, <em>fail‑safe</em> Fallbacks und granularen Berechtigungen. Entwickelt für rauen Einsatz, wartungsarm, fernadministrierbar.</p>",
        badges: ["Edge", "Industrial", "Made in DE"],
    },
    pricing: {
        basePriceCents: 39900,
        options: [
            { id: "lte", label: "LTE‑Modul", deltaPriceCents: 7500 },
            { id: "wall-mount", label: "Wandhalterung", deltaPriceCents: 1500 },
            { id: "ext-temp", label: "Erweiterter Temperaturbereich", deltaPriceCents: 2500 },
        ],
        ctas: { wishlistLabel: "Vormerken", configureLabel: "Produkt konfigurieren" },
        stockInfo: {
            status: "preorder",
            note: "Auslieferung voraussichtlich ab Oktober.",
        },
    },
    tabs: {
        features: {
            features: [
                {
                    title: "Konnektivität",
                    description: "Ethernet, optional LTE; MQTT/HTTPS; lokales Edge‑Routing.",
                    icon: "RadioTower",
                },
                {
                    title: "Sicherheit",
                    description: "HSM‑basierte Schlüssel, signierte Updates, Rollen & Rechte.",
                    icon: "ShieldCheck",
                },
                {
                    title: "Fallback",
                    description: "Offline‑Betrieb mit Cache; definierte Safe‑States.",
                    icon: "Shuffle",
                },
                {
                    title: "Verwaltung",
                    description: "Zentrale Webplattform, Telemetrie, Remote‑Konfiguration.",
                    icon: "Wrench",
                },
                {
                    title: "Edge‑Routing",
                    description: "Niedrige Latenzen dank lokaler Entscheidungslogik.",
                    icon: "Server",
                },
            ],
        },
        included: {
            items: [
                { name: "Gateway‑Einheit", qty: 1, icon: "Check" },
                { name: "Netzteil (24 V)", qty: 1 },
                { name: "Montagematerial", qty: 1 },
                { name: "Schnellstart‑Guide (PDF)", qty: 1 },
            ],
        },
        guide: {
            steps: [
                {
                    title: "Hardware montieren",
                    contentHtml:
                        "<p>Befestige die Einheit mit der Wandhalterung oder auf der Hutschiene. Achte auf ausreichende Belüftung.</p>",
                    assets: [{ label: "Montage‑PDF", href: "/downloads/gateway-montage.pdf" }],
                },
                {
                    title: "Anschlüsse & Strom",
                    contentHtml:
                        "<p>Verbinde Ethernet (oder LTE‑Antenne) und versorge mit 24 V. Status‑LEDs zeigen den Boot‑ und Verbindungsstatus an.</p>",
                },
                {
                    title: "Erstinbetriebnahme",
                    contentHtml:
                        "<p>Rufe die lokale Web‑UI unter <code>http://gateway.local</code> auf und kopple das Gerät mit der zentralen Webplattform.</p>",
                    assets: [
                        { label: "Firmware‑Image", href: "/downloads/gateway-fw.img" },
                        { label: "Release Notes", href: "/downloads/release-notes.html" },
                    ],
                },
            ],
        },
    },
};
export default function ShopPage() {
  return <ProductPage data={demoData} />;
}
