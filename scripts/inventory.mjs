import { XMLParser } from 'fast-xml-parser';
import fs from 'node:fs';
const p = new XMLParser();
const base = 'https://www.museevents.com';
const locs = async (u) => { const x = p.parse(await (await fetch(u)).text()); const r = x.urlset?.url ?? x.sitemapindex?.sitemap ?? []; return (Array.isArray(r) ? r : [r]).map(e => e.loc); };
const inv = { pages: [], blog: [], other: [] };
for (const s of await locs(base + '/sitemap.xml')) {
  for (const u of await locs(s)) {
    const path = u.replace(base, '') || '/';
    if (s.includes('blog-posts')) inv.blog.push(path);
    else if (s.includes('pages-sitemap')) inv.pages.push(path);
    else inv.other.push(path);
  }
}
if (!inv.pages.includes('/')) inv.pages.unshift('/');
fs.mkdirSync('out', { recursive: true });
fs.writeFileSync('out/inventory.json', JSON.stringify(inv, null, 2));
console.log(inv.pages.length, inv.blog.length, inv.other.length);
