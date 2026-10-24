import { getImage } from 'astro:assets';

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/albums/**/*.{jpg,jpeg,png,webp}',
  { eager: true },
);

export function resolveAlbumImage(slug: string, filename: string): ImageMetadata {
  const key = `/src/assets/images/albums/${slug}/${filename}`;
  const mod = modules[key];
  if (!mod) throw new Error(`Album "${slug}": image file not found: ${key}`);
  return mod.default;
}

export async function albumVariant(slug: string, filename: string, width: number) {
  return getImage({ src: resolveAlbumImage(slug, filename), width, format: 'webp', quality: 75 });
}
