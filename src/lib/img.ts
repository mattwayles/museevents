import type { ImageMetadata } from 'astro';

const all = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp}', { eager: true });

/** Resolve a scraped path like "pages/home/foo.jpg" or "src/assets/images/pages/home/foo.jpg". */
export function img(path: string): ImageMetadata {
  const key = '/' + path.replace(/^\/?(src\/assets\/images\/)?/, 'src/assets/images/');
  const m = all[key];
  if (!m) throw new Error(`Image not found: ${key}`);
  return m.default;
}
