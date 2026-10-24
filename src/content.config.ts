import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      // Exact path the post lived at on Wix; routes are generated from this
      originalUrl: z.string(),
      cover: image().optional(),
      description: z.string().default(''),
    }),
});

// Album image `src`/`cover` are filenames under src/assets/images/albums/<slug>/
const albums = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/albums' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    order: z.number(),
    subtitle: z.string().optional(),
    cover: z.string(),
    images: z.array(z.object({ src: z.string(), alt: z.string() })),
  }),
});

export const collections = { blog, albums };
