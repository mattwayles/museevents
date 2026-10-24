import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getSortedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const postPath = (p: Post) => p.data.originalUrl.replace(/\/+$/, '');

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export const monthKey = (d: Date) =>
  `${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, '0')}`;

export const monthLabel = (key: string) => {
  const [y, m] = key.split('/').map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
};

export function getArchive(posts: Post[]) {
  const map = new Map<string, number>();
  for (const p of posts) map.set(monthKey(p.data.pubDate), (map.get(monthKey(p.data.pubDate)) ?? 0) + 1);
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0])).map(([key, count]) => ({ key, count, label: monthLabel(key) }));
}

/** True when the first body image is the cover file, so the cover shouldn't be repeated. */
export function coverInBody(p: Post): boolean {
  if (!p.data.cover) return false;
  const m = (p.body ?? '').match(/!\[[^\]]*\]\(([^)\s]+)/);
  if (!m) return false;
  const stem = m[1].split('/').pop()!.replace(/\.[^.]+$/, '');
  return p.data.cover.src.includes(stem);
}
