import {NavEntry} from "@/types/header";

export const defaultHeaderItems: NavEntry[] = [
    {type: "link", label: "Home", href: "/"},
    {type: "link", label: "Konfigurator", href: "/konfigurator"},
    {
        type: "mega",
        label: "Shop",
        items: [
            {
                label: "Maschinenfreigaben",
                href: "/produkte/maschinenfreigaben",
                description:
                    "Sichere Freigaben für Maschinen inkl. Qualifikationsprüfung und Protokollierung.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
            {
                label: "Türfreigaben",
                href: "/produkte/tuerfreigaben",
                description: "Elektronische Zutrittskontrolle für Türen, Tore und Schränke.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
            {
                label: "Zeiterfassung",
                href: "/produkte/zeiterfassung",
                description: "Intuitive Buchung am Gerät, App oder Web – live synchronisiert.",
                image: {src: "_A7_8631.JPG", aspect: "wide"},
            },
        ],
    },
    {type: "link", label: "Kontakt", href: "/kontakt"},
];