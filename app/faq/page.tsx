import type { Metadata } from 'next';
import Faq from '@/components/utilities/faq';
import { faqItems } from '@/data/faq-items';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Häufige Fragen rund um mardu.space beantwortet.',
};

export default function FaqPage() {
  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="mb-8 text-center text-3xl font-bold">FAQ</h1>
        <Faq items={faqItems} />
      </section>
    </main>
  );
}
