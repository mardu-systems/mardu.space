import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CookieSettingsButton } from '@/components/cookie-settings-button';
import fs from 'fs/promises';
import path from 'path';
import Markdown from 'react-markdown';

// Hinweis: Diese Datei bleibt eine Server Component (kein "use client").

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Informationen zum Datenschutz bei mardu.space.',
};

export default async function Privacy() {
  const filePath = path.join(process.cwd(), 'privacy.md');
  const fileContent = await fs.readFile(filePath, 'utf8');

  const today = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
  }).format(new Date());
  const changed = '14.11.2025';

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Datenschutzerklärung</h1>
          <p className="text-sm text-gray-600">Stand: {today}</p>
          <p className="text-sm text-gray-600">Geändert: {changed}</p>
        </div>

        <div className="space-y-6 pt-8 text-base">
          <article className="prose lg:prose-xl max-w-none">
            <Markdown>{fileContent}</Markdown>
          </article>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Link href="/">
              <Button variant="outline">Zurück zur Startseite</Button>
            </Link>

            <CookieSettingsButton />
          </div>
        </div>
      </section>
    </main>
  );
}
