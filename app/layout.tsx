import type { Metadata, Viewport } from 'next';
import './globals.css';
import React from 'react';
import SiteShell from '@/components/layout/site-shell';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mardu.space'),
  title: {
    default: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten | mardu.space',
    template: '%s | mardu.space',
  },
  description:
    'Sichere Maschinenfreigabe & Zutrittskontrolle für Unternehmenswerkstätten, Hochschulen & Makerspaces. Ersetzen Sie Schlüssel durch digitale, qualifikationsbasierte Berechtigungen (RBAC) & lückenlose Protokollierung.',
  keywords: [
    'Maschinenfreigabe',
    'Zutrittskontrolle',
    'Unternehmenswerkstatt',
    'Hochschule',
    'Makerspace',
    'FabLab',
    'Arbeitsschutz',
    'DGUV',
    'Compliance',
    'RBAC',
    'NFC Zugang',
    'Open Education Badges',
    'Maschinensicherheit',
    'Werkstattmanagement',
  ],
  alternates: {
    canonical: 'https://mardu.space',
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten',
    description:
      'Sichere Maschinenfreigabe & Zutrittskontrolle für Unternehmenswerkstätten, Hochschulen & Makerspaces. Rollenbasiert, compliant & vernetzt.',
    url: 'https://mardu.space',
    siteName: 'mardu.space',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/_A7_9072_quer.jpg',
        width: 1200,
        height: 630,
        alt: 'mardu.space Maschinenfreigabe in der Werkstatt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digitale Zutritts- und Maschinenfreigabe für Werkstätten',
    description:
      'Sichere Maschinenfreigabe & Zutrittskontrolle für Unternehmenswerkstätten, Hochschulen & Makerspaces.',
    images: ['/_A7_9072_quer.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'mardu.space',
  url: 'https://mardu.space',
  description:
    'Digitale Zutritts- und Maschinenfreigabe für Unternehmenswerkstätten, Hochschulen und Makerspaces.',
  publisher: {
    '@type': 'Organization',
    name: 'mardu.space',
    url: 'https://mardu.space',
    logo: 'https://mardu.space/marduspace_logo_bg_white.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased overflow-x-hidden">
        <SiteShell>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
