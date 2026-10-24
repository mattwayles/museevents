// Builds src/content/albums/*.json and src/content/blog/*.md from raw scrape + out/image-map.json
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';
import { originalUrl, slugify } from './download-images-lib.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const map = JSON.parse(fs.readFileSync('out/image-map.json'));
const inv = JSON.parse(fs.readFileSync('out/inventory.json'));
const local = (u) => map[originalUrl(u)];

// ---- albums
fs.rmSync(path.join(ROOT, 'src/content/albums'), { recursive: true, force: true });
fs.mkdirSync(path.join(ROOT, 'src/content/albums'), { recursive: true });
const albums = fs.readdirSync('out/albums').filter(f => f.endsWith('.json')).sort().map(f => JSON.parse(fs.readFileSync('out/albums/' + f)));
const seen = new Set(); const albumReport = [];
albums.forEach((a, i) => {
  const name = (a.name || a.tile.title).trim(); const slug = slugify(name);
  const prefix = `src/assets/images/albums/${slug}/`;
  const items = (a.sets?.gallery || []).flatMap(g => g.items);
  const rel = (u) => { const l = local(u); if (!l) return null; if (l.startsWith(prefix)) return l.replace(prefix, ''); const fn = path.basename(l); fs.mkdirSync(path.join(ROOT, prefix), { recursive: true }); fs.copyFileSync(path.join(ROOT, l), path.join(ROOT, prefix, fn)); return fn; };
  const images = items.map(it => ({ src: rel(it.mediaUrl), alt: `${name} - photo` })).filter(x => x.src);
  const cover = a.cover?.mediaUrl ? rel(a.cover.mediaUrl) : images[0]?.src;
  const venue = (a.tile.text || '').includes('|') ? a.tile.text.split('|').slice(1).join('|').trim() : '';
  const data = { name, slug, order: i + 1, ...(venue ? { subtitle: venue } : {}), cover, images };
  if (seen.has(slug)) throw new Error('dup album slug ' + slug); seen.add(slug);
  fs.writeFileSync(path.join(ROOT, `src/content/albums/${slug}.json`), JSON.stringify(data, null, 2) + '\n');
  albumReport.push([slug, images.length, items.length]);
});
console.log('albums', albumReport.map(r => r.join(':')).join(' '));

// ---- blog
const outDir = path.join(ROOT, 'src/content/blog'); fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
td.addRule('drop', { filter: ['button', 'svg', 'script', 'style', 'noscript'], replacement: () => '' });
const used = new Set(); const report = [];
for (const p of inv.blog) {
  const dir = 'out/pages/single-post__' + p.replace('/single-post/', '').replace(/\//g, '__');
  const f = dir + '/rendered.html'; if (!fs.existsSync(f)) { console.log('MISSING', p); continue; }
  const $ = cheerio.load(fs.readFileSync(f, 'utf8'));
  let slug = p.split('/').pop(); if (used.has(slug)) slug += '-' + p.split('/')[2]; used.add(slug);
  const title = ($('h1[data-hook=post-title]').first().text() || $('meta[property="og:title"]').attr('content') || slug).trim();
  const pub = $('meta[property="article:published_time"]').attr('content') || '';
  const body = $('[data-hook=post-description]').first().clone();
  body.find('button, svg, [data-hook*=share], [data-hook*=like], [data-hook=post-stats], [data-hook=post-footer], [class*=share], [aria-label*="Share"], noscript, style, script').remove();
  body.find('img').each((_, e) => {
    const src = $(e).attr('src') || ''; const l = local(src);
    if (!l) { $(e).remove(); return; }
    $(e).attr('src', '../../' + l.replace('src/', '')); $(e).removeAttr('srcset');
  });
  // drop images whose parent link points at wixstatic
  body.find('a').each((_, a) => { const h = $(a).attr('href') || ''; if (/wixstatic\.com/.test(h)) { const inner = $(a).html(); $(a).replaceWith(inner); } });
  let md = td.turndown(body.html() || '');
  md = md.replace(/​/g, '').replace(/ /g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').replace(/^\s*\\?\s*$/gm, (m) => m.trim() === '\\' ? '' : m).replace(/\n{3,}/g, '\n\n').trim();
  md = md.replace(/\[(#[^\]]+)\]\(\/?(?:https?:\/\/www\.museevents\.com)?\/blog\/hashtags\/[^)]*\)/g, '$1');
  md = md.replace(/https?:\/\/www\.museevents\.com(\/[^\s)]*)/g, '$1');
  const og = $('meta[property="og:image"]').attr('content');
  let cover = og ? local(og) : null; if (!cover) { const m = md.match(/!\[[^\]]*\]\(\.\.\/\.\.\/(assets\/[^)]+)\)/); if (m) cover = 'src/' + m[1]; }
  const coverRel = cover ? '../../' + cover.replace('src/', '') : '';
  const plain = md.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*_>`-]/g, '').replace(/\s+/g, ' ').trim();
  let desc = plain.slice(0, 160); if (plain.length > 160) desc = desc.replace(/\s+\S*$/, '') + '…';
  const q = (s) => JSON.stringify(s);
  const fm = `---\ntitle: ${q(title)}\npubDate: ${q(pub ? new Date(pub).toISOString() : '')}\noriginalUrl: ${q(p)}\n${coverRel ? `cover: ${q(coverRel)}\n` : ''}description: ${q(desc)}\n---\n\n`;
  fs.writeFileSync(path.join(outDir, slug + '.md'), fm + md + '\n');
  report.push({ slug, words: plain.split(' ').length, imgs: (md.match(/!\[/g) || []).length, hasDate: !!pub, cover: !!cover });
}
fs.writeFileSync('out/blog-build-report.json', JSON.stringify(report, null, 1));
console.log('blog posts', report.length, 'nodate', report.filter(r => !r.hasDate).length, 'nocover', report.filter(r => !r.cover).length, 'empty', report.filter(r => r.words < 5).map(r => r.slug));
