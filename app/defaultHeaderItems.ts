import {NavEntry} from "@/types/header";

export const defaultHeaderItems: NavEntry[] = [
    {type: "link", label: "Home", href: "/"},
    {type: "link", label: "Konfigurator", href: "/konfigurator"},
    {
        type: "mega",
        label: "Shop",
        items: [
            {
                label: "Die Elektronik",
                href: "/shop/reader",
                description:
                    "Sichere Freigaben für Maschinen inkl. Qualifikationsprüfung und Protokollierung.",
                image: {src: "/_A7_8631.jpg", aspect: "wide"},
            },
            {
                label: "Das Gateway",
                href: "/shop/gateway",
                description: "Elektronische Zutrittskontrolle für Türen, Tore und Schränke.",
                image: {src: "/_A7_8631.jpg", aspect: "wide"},
            },
        ],
    },
    {type: "link", label: "Kontakt", href: "/kontakt"},
];