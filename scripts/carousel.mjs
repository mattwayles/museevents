import { chromium } from 'playwright';
import { load } from './lib.mjs';
import fs from 'node:fs';
const b = await chromium.launch(); const pg = await b.newPage({viewport:{width:1440,height:900}});
await load(pg, 'https://www.museevents.com/');
const slides = {}; let total = 0;
const t0 = Date.now();
const g = pg.locator('[data-testid=slide-show-gallery]'); await g.scrollIntoViewIfNeeded(); const bb = await g.boundingBox(); await pg.mouse.click(bb.x+bb.width/2, bb.y+bb.height/2); await pg.waitForTimeout(500);
let tick = 0;
while (Date.now() - t0 < 240000) {
  const s = await pg.evaluate(() => {
    const g = document.querySelector('[data-testid="slide-show-gallery"]'); if (!g) return null;
    const cnt = g.querySelector('[data-testid="gallery-counter"]')?.innerText || '';
    const it = g.querySelector('[data-testid="slide-show-gallery-items"] [data-testid="gallery-item-item"]');
    let uri = ''; try { uri = JSON.parse(it?.querySelector('wow-image')?.getAttribute('data-image-info') || '{}').imageData?.uri || ''; } catch {}
    return { cnt, uri, alt: it?.querySelector('img')?.alt || '', title: it?.querySelector('[data-testid="gallery-item-title"]')?.innerText.trim() || '', description: it?.querySelector('[data-testid="gallery-item-description"]')?.innerText.trim() || '' };
  });
  if (s?.cnt) { const [n, t] = s.cnt.split('/').map(Number); total = t; if (!slides[n] && s.uri) { slides[n] = { index: n, src: 'https://static.wixstatic.com/media/' + s.uri, alt: s.alt, title: s.title, description: s.description }; console.log(n, s.title, s.uri.slice(0, 30)); } if (Object.keys(slides).length >= total) break; }
  if (++tick % 4 === 0) await pg.keyboard.press('ArrowRight');
  await pg.waitForTimeout(400);
}
fs.writeFileSync('out/carousel.json', JSON.stringify(Object.values(slides).sort((a, b) => a.index - b.index), null, 2));
console.log(Object.keys(slides).length, '/', total);
await b.close();
