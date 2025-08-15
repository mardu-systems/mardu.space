/*
Ziel & Struktur der Seite

Eine Produktdetail‑Seite für „Das Gateway“ mit:
	1.	Produkt‑Intro (Titel, Kurzbeschreibung)
	2.	Preisbox mit Varianten (z. B. „mit LTE + 75,00 €“), CTAs („Vormerken“, „Produkt konfigurieren“)
	3.	Reiter/Navigation für Features, Enthaltene Komponenten, Bauanleitung
	4.	Rechtliches (Links auf Impressum/Datenschutz existieren bereits im Footer).

ToDo:
Design
	•	Typo‑Skala festlegen (H1/H2/H3, Body, Caption), Kontrast auf Schwarz/Dunkel prüfen.
	•	Icon‑Set (lucide‑react) definieren: z. B. RadioTower (Connectivity), ShieldCheck (Security), Shuffle (Fallback), Server (Edge‑Routing), Wrench (Verwaltung).
	•	Karten‑Styles: abgerundet (2xl), dezente Schatten, ausreichend Padding.
	•	Sticky‑Zonen: Abstand zum bereits vorhandenen Header beachten.
	•	Mobile Sticky‑CTA gestalten (lesbar, barrierearm, nicht über Footer/Legal).

Umsetzung
	•	Komponenten gemäß obigen Props anlegen (ProductIntro, PriceBox, SectionTabs mit FeaturesTab, IncludedTab, BuildGuideTab, StickyMobileCTA).
	•	Preisberechnung: Client‑seitig (optimistisch) + optional Server‑Validierung beim Checkout/Konfigurator.
	•	„Vormerken“: Action‑Handler (Toast/useToast von shadcn) + Persistenz (z. B. LocalStorage oder API).
	•	„Produkt konfigurieren“: öffnet Dialog/Sheet oder navigiert zu /konfigurator?product=gateway&opts=....
	•	A11y: Tabs/Accordion tastatur‑navigierbar, ARIA‑Labels für CTAs, Focus‑Styles sichtbar.
	•	i18n‑Keys anlegen (de/en).
	•	Content‑Schnittstelle (CMS/JSON) verdrahten → ProductPageData laden.
	•	Unit‑/UI‑Tests: Preis‑Summen, Variant‑Toggle, Tab‑Wechsel.

Copy/Content
	•	Kurzbeschreibung straffen (Wiederholungen im PDF entfernen), max. ~120–160 Wörter.
	•	Bauanleitung: ggf. Unterpunkte/Downloads (z. B. „Image“, „Firmware“) ergänzen.
	•	„Zentrale Webplattform“: Linkziel zur Plattform hinzufügen.

Seitenlayout & Interaktionen
	•	Layout: Zwei Spalten (lg+): links Content (Intro + Tabs), rechts PriceBox sticky; auf Mobile einspaltig, PriceBox unter Intro, zusätzlich StickyMobileCTA.
	•	Scroll‑Verhalten: Tab‑Leiste sticky (unter Header), sanftes Scrollen zu Tab‑Inhalten.
	•	Motion (framer‑motion): kleine Fade/Slide‑Ins (respect prefers-reduced-motion), Button‑Hover‑Scale minimal.
	•	Zustand: Variantenselektion beeinflusst Sofortpreis (Basispreis + Zuschläge).
	•	Analytics (optional): Events für feature_view, include_view, guide_expand, variant_select, wishlist_click, configure_click.
 */

// Beispiel idee für Datenmdell
type ProductIntroProps = {
    title: string;
    subtitle?: string;
    descriptionHtml: string;
    badges?: string[];
}
type PriceOption = { id: string; label: string; deltaPriceCents: number; default?: boolean };
type PriceBoxProps = {
    basePriceCents: number;
    options?: PriceOption[];
    onAddToWishlist?: (payload: { optionIds: string[] }) => void;
    onConfigure?: (payload: { optionIds: string[] }) => void;
    ctas?: { wishlistLabel?: string; configureLabel?: string };
    stockInfo?: { status: "in_stock" | "preorder" | "oos"; note?: string };
}
type Feature = { title: string; description: string; icon?: string };
type FeaturesTabProps = { features: Feature[] };
type IncludedItem = { name: string; qty?: number; note?: string; icon?: string };
type IncludedTabProps = { items: IncludedItem[] };
type GuideStep = { title: string; contentHtml: string; assets?: { label: string; href: string }[] };
type BuildGuideTabProps = { steps: GuideStep[] };
export type ProductPageData = {
    slug: string;
    intro: ProductIntroProps;
    pricing: PriceBoxProps;
    tabs: {
        features: FeaturesTabProps;
        included: IncludedTabProps;
        guide: BuildGuideTabProps;
    };
};