# Muse Events — museevents.com

Static site for [Muse Events](https://www.museevents.com), migrated off Wix. Built with [Astro](https://astro.build) and Tailwind CSS, hosted on Netlify.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs dist/
npm run preview   # serve dist/ locally
```

Requires Node 22.23.4 or newer (Netlify builds with Node 24, set in `netlify.toml`).

## Where things live

| What | Where |
| --- | --- |
| Pages (one file per URL, slugs kept from Wix) | `src/pages/*.astro` |
| Nav, footer, page shell | `src/components/Nav.astro`, `src/components/Footer.astro`, `src/layouts/BaseLayout.astro` |
| Colors and fonts | `@theme` in `src/styles/global.css` |
| Blog posts (Markdown) | `src/content/blog/*.md` |
| Photo albums | `src/content/albums/*.json` + images in `src/assets/images/albums/<slug>/` |
| Home page carousel | `src/data/carousel.json` |
| Images | `src/assets/images/` (Astro resizes and converts to WebP at build time) |
| Redirects, headers, build settings | `netlify.toml` |

### Common edits

- **New blog post:** add `src/content/blog/<slug>.md` with frontmatter `title`, `pubDate`, `originalUrl: "/single-post/<slug>"`, `description`, and optionally `cover` (a relative path to an image in `src/assets/images/blog/<slug>/`). The post is served at `originalUrl`.
- **New album:** put the photos in `src/assets/images/albums/<slug>/` and add `src/content/albums/<slug>.json` (`name`, `slug`, `order`, optional `subtitle`, `cover`, `images: [{ src, alt }]`, where `src` and `cover` are filenames).
- **Contact form:** the form on `/contactform` is the Aisle Planner inquiry form embedded in an iframe (`src/components/ContactForm.astro`). Inquiries land in Aisle Planner, as before.
- **Large photos:** `node scripts/shrink-images.mjs` caps images at 2000px and recompresses them (run `npm install` in `scripts/` first).

## Checks

```sh
npm run build
node scripts/check-urls.mjs dist   # every URL from the old Wix sitemap resolves (page or redirect)
```

`check-urls.mjs` and the other files in `scripts/` were used for the one-time Wix scrape; the scrape output (`scripts/out/`) is not committed.

## Going live (cutover checklist)

1. **Deploy to Netlify:** in Netlify, *Add new site → Import from GitHub →* `mattwayles/museevents`. The settings come from `netlify.toml`. Review the `*.netlify.app` preview against the live Wix site.
2. **Before touching DNS, find out where the domain and email live.** Check who the registrar for museevents.com is (e.g. `whois museevents.com`) and where @museevents.com email is hosted (look up the MX records).
   - If the **domain was bought through Wix**, transfer it to a registrar such as Cloudflare or Namecheap first (unlock it and get the transfer code in Wix → Domains). Transfers take up to about 5 days.
   - If **email** (e.g. Google Workspace) was bought through Wix or its DNS is managed at Wix, copy every MX, SPF (TXT), DKIM, and DMARC record into the new DNS provider *before* switching nameservers, or email to info@ and Danielle@ will stop arriving.
3. **Point the domain at Netlify:** in Netlify, *Domain management → Add domain* `www.museevents.com` (and `museevents.com`), then follow its DNS instructions. Netlify issues the HTTPS certificate automatically.
4. **Verify:** browse the live domain, submit a test inquiry through `/contactform` and confirm it reaches Aisle Planner, and send a test email to info@museevents.com.
5. **Cancel the Wix premium plan** after a week or so of the new site running cleanly. Keep the free Wix account (and its media) until you're sure nothing is missing.
6. In Google Search Console, submit `https://www.museevents.com/sitemap-index.xml`.
