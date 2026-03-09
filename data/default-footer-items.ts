import { FooterLink } from '@/components/nav/footer/footer';

export const defaultFooterNavLinks: FooterLink[] = [
  { href: '/#home', label: 'Startseite' },
  { href: '/#loesung', label: 'Lösung' },
  { href: '/#produkte', label: 'Angebote' },
  { href: '/#argumente', label: 'Vorteile' },
  { href: '/contact', label: 'Kontakt' },
];

export const defaultFooterMetaLinks: FooterLink[] = [
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/privacy', label: 'Datenschutz' },
  { href: '/publisher', label: 'Impressum' },
];
