import { chromium } from 'playwright';
import { load, sleep } from './lib.mjs';
import fs from 'node:fs';
fs.mkdirSync('out/albums', { recursive: true });
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
let last = null;
pg.on('response', async r => { if (r.url().includes('albums-node-server/getAlbum')) { try { last = JSON.parse(await r.text()); } catch {} } });
await load(pg, 'https://www.museevents.com/photo-albums');
const tiles = await pg.evaluate(() => [...document.querySelectorAll('[data-hook=item-container]')].map(c => ({ title: c.querySelector('[data-hook=item-title]')?.innerText?.trim() || '', text: c.innerText.trim().replace(/\n+/g, ' | '), img: (c.querySelector('img')?.src || '').split('/v1/')[0] })));
console.log(tiles.length, 'tiles');
const results = [];
for (let i = 0; i < tiles.length; i++) {
  last = null;
  if (i > 0) await load(pg, 'https://www.museevents.com/photo-albums');
  for (let attempt = 0; attempt < 3 && !last; attempt++) {
    await pg.locator('[data-hook=item-container]').nth(i).click({ force: true });
    for (let k = 0; k < 60 && !last; k++) await sleep(250);
    if (!last) { await pg.keyboard.press('Escape'); await sleep(500); }
  }
  if (!last) { console.log('FAIL tile', i, tiles[i].text); results.push({ tile: tiles[i], failed: true }); continue; }
  const sets = Object.values(last.settings.setsSummary || {});
  const album = { tile: tiles[i], name: last.settings.albumName, cover: last.settings.cover, sets: last.sets ?? null, setsSummary: sets, settings: { id: last.settings.id, layout: last.settings.layout, welcome: last.settings.welcome, albumDate: last.settings.albumDate } };
  fs.writeFileSync(`out/albums/${String(i).padStart(2, '0')}.json`, JSON.stringify(album, null, 1));
  console.log(i, tiles[i].text, '->', album.name, sets.map(s => s.name + ':' + s.items.length).join(','));
  results.push(album);
  await sleep(500);
}
await b.close();
