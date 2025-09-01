import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import Gallery, { GalleryImage } from '@/components/gallery';

export const metadata: Metadata = {
  title: 'Fotos',
  description: 'Einblicke in mardu.space.',
};

async function getAllImageFiles(dir: string, baseDir: string = dir): Promise<string[]> {
  const files = await fs.readdir(dir);
  const imageFiles: string[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      // Rekursiv in Unterordnern suchen
      const subImages = await getAllImageFiles(filePath, baseDir);
      imageFiles.push(...subImages);
    } else if (/(png|jpe?g|gif|webp)$/i.test(file)) {
      // Relativen Pfad vom public-Verzeichnis erstellen
      const relativePath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      imageFiles.push(`/${relativePath}`);
    }
  }

  return imageFiles;
}

export default async function FotosPage() {
  const publicDir = path.join(process.cwd(), 'public');
  const imageFiles = await getAllImageFiles(publicDir);

  const images: GalleryImage[] = imageFiles.map((src) => ({
    src,
    alt: path
      .basename(src)
      .replace(/\.[^/.]+$/, '')
      .replace(/^[-_]+/, '')
      .replace(/[-_]/g, ' '),
  }));

  return (
    <main className="pt-[calc(var(--app-header-height,64px)+env(safe-area-inset-top))]">
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="mb-8 text-center text-3xl font-bold">Fotos</h1>
        <Gallery images={images} />
      </section>
    </main>
  );
}
