import {FooterLink} from "@/components/nav/footer/footer";

export const defaultFooterNavLinks: FooterLink[] = [
    {href: "/faq", label: "FAQ"},
    {href: "/brand", label: "Brand Assets"},
    {href: "/fotos", label: "Fotos"},
];

export const defaultFooterMetaLinks: FooterLink[] = [
    {href: "/publisher", label: "Impressum"},
    {href: "/privacy", label: "Datenschutz"},
    {
        href: "#",
        label: "Cookie-Einstellungen",
        onClick: (e) => {
            e.preventDefault();
            window.openCookieSettings?.();
        },
    },
];
