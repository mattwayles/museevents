import { chromium } from 'playwright';
import fs from 'node:fs';
import { BASE, slugOf, sleep, load, extractInPage } from './lib.mjs';
const inv = JSON.parse(fs.readFileSync('out/inventory.json'));
const only = process.argv.slice(2);
const targets = [...inv.pages, ...inv.blog].filter(p => !only.length || only.includes(p));
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const failures = [];
for (const p of targets) {
  const slug = slugOf(p); const dir = `out/pages/${slug}`;
  if (!only.length && fs.existsSync(`${dir}/content.json`)) { continue; }
  try {
    await load(page, BASE + p);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(`${dir}/rendered.html`, await page.content());
    const data = await page.evaluate(extractInPage);
    data.path = p; data.slug = slug; data.type = p.startsWith('/single-post/') ? 'blog' : 'page';
    data.extra = {};
    data.iframes = page.frames().slice(1).map(f => f.url()).filter(u => !/engage\.wixapps|visitor-analytics|about:blank/.test(u));
    if (p === '/contactform') {
      const fr = page.frames().find(f => f.url().includes('aisleplanner.com/inquiries'));
      if (fr) {
        await fr.waitForSelector('input,select,textarea', { timeout: 15000 }).catch(() => {});
        data.extra.form = { action: fr.url(), fields: await fr.evaluate(() => {
          const out = [];
          for (const el of document.querySelectorAll('input,select,textarea,button')) {
            const lab = el.closest('div,li,tr,p')?.querySelector('label')?.innerText.trim() || '';
            out.push({ tag: el.tagName.toLowerCase(), label: lab, type: el.getAttribute('type') || '', name: el.getAttribute('ng-model') || el.name || '', placeholder: el.placeholder || '', cls: el.className, required: el.required || el.hasAttribute('required') || /require/i.test(el.className),
              options: el.tagName === 'SELECT' ? [...el.options].map(o => o.text) : undefined, text: el.tagName === 'BUTTON' ? el.innerText : undefined });
          } return out; }), labels: await fr.evaluate(() => [...document.querySelectorAll('label')].map(l => l.innerText.trim())), text: await fr.evaluate(() => document.body.innerText) };
        await fr.screenshot?.call?.(fr).catch?.(() => {});
      }
    }
    await page.screenshot({ path: `${dir}/screenshot.png`, fullPage: true }).catch(e => console.log('shot fail', p));
    fs.writeFileSync(`${dir}/content.json`, JSON.stringify(data, null, 2));
    console.log('ok', p, data.blocks.main.length);
  } catch (e) { console.log('FAIL', p, e.message.slice(0, 100)); failures.push(p); }
  await sleep(600);
}
fs.writeFileSync('out/crawl-failures.json', JSON.stringify(failures));
await b.close();
