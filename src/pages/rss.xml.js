import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('blog')).sort((a, b) => b.data.pubDate - a.data.pubDate);
  return rss({
    title: 'Muse Events Blog',
    description: 'Real weddings, planning tips and inspiration from Muse Events.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.pubDate,
      description: p.data.description,
      link: p.data.originalUrl,
    })),
  });
}
