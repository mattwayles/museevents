// Collects every wixstatic media URL, downloads originals into src/assets/images/<section>/..., writes out/image-map.json,
// and adds localPath to content.json image blocks.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import * as cheerio from 'cheerio';
import { sleep } from './lib.mjs';
import { originalUrl, slugify } from './download-images-lib.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const IMG = path.join(ROOT, 'src/assets/images');
const inv = JSON.parse(fs.readFileSync('out/inventory.json'));
const KNOWN = ['/', '/about-5', '/wedding-planning', '/wedding-coordination', '/full-wedding-planning', '/partial-planning', '/a-la-carte', '/weddingdesign', '/event-planning', '/events-and-galas', '/amazing-proposals', '/about-1', '/proposal-packages', '/instagram', '/photo-albums', '/contactform', '/blog'];

const isMedia = (u) => /^https:\/\/static\.wixstatic\.com\/media\//.test(u);
const isIcon = (u) => /\/media\/(01c3aff52f2a4dffa526d7a9843|11062b_)/.test(u) || /\.(svg|ico)$/i.test(originalUrl(u)) && false;
const extOf = (u) => { const m = originalUrl(u).match(/\.([a-z0-9]+)$/i); let e = (m?.[1] || 'jpg').toLowerCase(); return e === 'jpeg' ? 'jpg' : e; };
const idOf = (u) => { const f = decodeURIComponent(originalUrl(u).split('/media/')[1] || ''); const m = f.match(/^[a-z0-9]+_([a-f0-9]{32})/i) || f.match(/^([a-f0-9]{6,})/i); return (m ? m[1] : f.replace(/[^a-z0-9]/gi, '')).slice(0, 6); };

const jobs = new Map(); // original url -> {section, hint}
const claim = (url, section, hint) => {
  if (!url || !isMedia(url) || isIcon(url)) return;
  const o = originalUrl(url);
  if (!jobs.has(o)) jobs.set(o, { section, hint: hint || '' });
};
const fileFor = (o, hint) => `${slugify(hint) || 'image'}-${idOf(o)}.${extOf(o)}`;

// site: favicon / og image from home
const homeHtml = fs.readFileSync('out/pages/home/rendered.html', 'utf8');
{
  const $ = cheerio.load(homeHtml);
  $('link[rel*=icon]').each((_, e) => { const h = $(e).attr('href'); if (h && isMedia(h)) claim(h, 'site', 'favicon'); });
  claim($('meta[property="og:image"]').attr('content'), 'site', 'og-image');
}

// pages (known first)
const pageSlugs = (p) => p === '/' ? 'home' : p.slice(1);
const EXTRA = ['/testimonials', '/corporate', '/parties-and-celebrations', '/about', '/contact', '/gallery']; // hidden/unlinked pages worth keeping; the ~50 per-couple hidden wedding pages are skipped (not linked from nav; photos duplicate the albums)
const pageOrder = [...KNOWN, ...EXTRA];
const contentFiles = {};
for (const p of pageOrder) {
  const slug = p === '/' ? 'home' : p.slice(1);
  const f = `out/pages/${slug}/content.json`; if (!fs.existsSync(f)) continue;
  const c = JSON.parse(fs.readFileSync(f)); contentFiles[f] = c;
  if (p === '/blog' || p === '/photo-albums') continue;
  for (const area of ['header', 'main', 'footer']) for (const b of c.blocks[area]) {
    if (b.type === 'image') { if (b.width && b.width < 60 && !b.alt) continue; claim(b.src, `pages/${slug}`, b.alt || b.caption); }
    if (b.type === 'background-image') claim(b.src, `pages/${slug}`, 'background');
  }
  if (c.ogImage) claim(c.ogImage, `pages/${slug}`, 'og');
}
// carousel
const carousel = JSON.parse(fs.readFileSync('out/carousel.json'));
for (const s of carousel) claim(s.src, 'carousel', s.title || s.alt);
// albums
const albumFiles = fs.readdirSync('out/albums').filter(f => f.endsWith('.json')).sort();
const albums = albumFiles.map(f => JSON.parse(fs.readFileSync('out/albums/' + f)));
const albumSlugs = albums.map(a => slugify((a.name || a.tile.title).trim()));
albums.forEach((a, i) => {
  const s = albumSlugs[i];
  const items = (a.sets?.gallery || []).flatMap(g => g.items);
  if (a.cover?.mediaUrl) claim(a.cover.mediaUrl, `albums/${s}`, 'cover');
  for (const it of items) claim(it.mediaUrl, `albums/${s}`, it.title);
});
// blog
const blogPosts = [];
for (const p of inv.blog) {
  const slug = 'single-post__' + p.replace('/single-post/', '').replace(/\//g, '__');
  const f = `out/pages/${slug}/rendered.html`; if (!fs.existsSync(f)) continue;
  const $ = cheerio.load(fs.readFileSync(f, 'utf8'));
  const bslug = p.split('/').pop();
  const imgs = [];
  $('[data-hook=post-description] img').each((_, e) => { const s = $(e).attr('src') || ''; if (isMedia(s)) imgs.push({ src: s, alt: $(e).attr('alt') || '' }); });
  const og = $('meta[property="og:image"]').attr('content');
  if (og) claim(og, `blog/${bslug}`, 'cover');
  for (const im of imgs) claim(im.src, `blog/${bslug}`, im.alt || bslug);
  blogPosts.push({ p, bslug, imgs, og });
}
console.log('unique images to fetch:', jobs.size);

// download
const map = fs.existsSync('out/image-map.json') ? JSON.parse(fs.readFileSync('out/image-map.json')) : {};
const failures = [];
const stats = { downloaded: 0, bytes: 0, resized: 0, skippedExisting: 0 };
async function fetchBuf(u) {
  for (let a = 0; a < 3; a++) {
    try { const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } }); if (r.ok) return Buffer.from(await r.arrayBuffer()); if (r.status === 404) throw new Error('404'); } catch (e) { if (e.message === '404') throw e; }
    await sleep(800 * (a + 1));
  }
  throw new Error('fetch failed');
}
const used = new Set(Object.values(map));
async function one([o, { section, hint }]) {
  if (map[o] && fs.existsSync(path.join(ROOT, map[o]))) { stats.skippedExisting++; return; }
  let name = fileFor(o, hint); let rel = `src/assets/images/${section}/${name}`;
  if (used.has(rel)) { name = name.replace(/(\.[a-z0-9]+)$/, '-2$1'); rel = `src/assets/images/${section}/${name}`; }
  used.add(rel);
  try {
    let buf = await fetchBuf(o);
    const meta = await sharp(buf).metadata().catch(() => null);
    if (meta && (Math.max(meta.width, meta.height) > 4000 || buf.length > 5 * 1024 * 1024) && ['jpg', 'png', 'webp'].includes(extOf(o))) {
      let p = sharp(buf).rotate().resize({ width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true });
      p = extOf(o) === 'png' ? p.png({ compressionLevel: 9 }) : extOf(o) === 'webp' ? p.webp({ quality: 85 }) : p.jpeg({ quality: 86, mozjpeg: true });
      buf = await p.toBuffer(); stats.resized++;
    }
    const out = path.join(ROOT, rel); fs.mkdirSync(path.dirname(out), { recursive: true }); fs.writeFileSync(out, buf);
    map[o] = rel; stats.downloaded++; stats.bytes += buf.length;
  } catch (e) { failures.push({ url: o, error: e.message }); }
}
const queue = [...jobs.entries()];
let idx = 0;
await Promise.all(Array.from({ length: 5 }, async () => { while (idx < queue.length) { const j = queue[idx++]; await one(j); if (idx % 50 === 0) { console.log(idx, '/', queue.length); fs.writeFileSync('out/image-map.json', JSON.stringify(map, null, 1)); } await sleep(80); } }));
// retry failures once
const retry = failures.splice(0).map(f => [f.url, jobs.get(f.url)]);
for (const j of retry) await one(j);
fs.writeFileSync('out/image-map.json', JSON.stringify(map, null, 1));
fs.writeFileSync('out/image-failures.json', JSON.stringify(failures, null, 1));

// localPath into content.json + carousel
const lp = (u) => map[originalUrl(u)] || null;
for (const [f, c] of Object.entries(contentFiles)) {
  for (const area of ['header', 'main', 'footer']) for (const b of c.blocks[area]) if (b.src) b.localPath = lp(b.src);
  c.slideshows = (c.slideshows || []).map(g => g.map(s => ({ ...s, localPath: lp(s.src) })));
  fs.writeFileSync(f, JSON.stringify(c, null, 2));
}
fs.writeFileSync('out/carousel.json', JSON.stringify(carousel.map(s => ({ ...s, localPath: lp(s.src) })), null, 2));
fs.writeFileSync('out/blog-index.json', JSON.stringify(blogPosts.map(b => ({ ...b, imgs: b.imgs.map(i => ({ ...i, localPath: lp(i.src) })), cover: b.og ? lp(b.og) : null })), null, 1));
console.log(JSON.stringify({ ...stats, MB: (stats.bytes / 1048576).toFixed(1), failures: failures.length }));
