import { chromium } from 'playwright';
import { load } from './lib.mjs';
import fs from 'node:fs';
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
await load(pg, 'https://www.museevents.com/');
const r = await pg.evaluate(() => {
  const pick = (el) => { if (!el) return null; const c = getComputedStyle(el); return { text: (el.innerText || '').trim().slice(0, 30), fontFamily: c.fontFamily, fontSize: c.fontSize, color: c.color, backgroundColor: c.backgroundColor, border: c.border, letterSpacing: c.letterSpacing, padding: c.padding }; };
  const navItems = [...document.querySelectorAll('[role=navigation] a, nav a, [data-testid=linkElement]')].filter(a => ['Home', 'About Muse', 'Blog'].includes(a.innerText.trim()));
  const leaf = (el) => el?.querySelector('span,p') || el;
  const book = [...document.querySelectorAll('a')].find(a => /Book a Consultation/.test(a.innerText));
  const login = [...document.querySelectorAll('a')].find(a => /Client Login/.test(a.innerText));
  const foot = document.querySelector('#SITE_FOOTER');
  const sections = [...document.querySelectorAll('section')].map(s => ({ id: s.id, bg: getComputedStyle(s).backgroundColor, h: Math.round(s.getBoundingClientRect().height) }));
  const colorVars = {}; const cs = getComputedStyle(document.documentElement); for (const n of [...cs]) if (/^--color_\d+$|^--font_\d+$/.test(n)) colorVars[n] = cs.getPropertyValue(n).trim();
  const bgBoxes = [...document.querySelectorAll('[data-testid=container-bg], .wixui-box')].map(e => getComputedStyle(e).backgroundColor).filter(c => c !== 'rgba(0, 0, 0, 0)').slice(0, 6);
  return { navHome: pick(leaf(navItems[0])), navActive: pick(leaf(navItems.find(a => a.getAttribute('aria-current')))), bookBtn: pick(book), bookBtnLeaf: pick(leaf(book)), login: pick(leaf(login)), footerP: pick(foot.querySelector('p')), footerBg: pick(foot), headerH: document.querySelector('#SITE_HEADER')?.getBoundingClientRect().height, sections, bgBoxes, colorVars, h1Services: pick(document.querySelector('h3')), headingHtmlSample: document.querySelector('h3')?.innerHTML.slice(0, 400) };
});
const t = JSON.parse(fs.readFileSync('out/theme.json')); t.extra = r; t.summary = { fonts: { heading: 'didot-w01-italic (Didot italic, serif) - Wix hosted; Google Fonts alternative: "Playfair Display" italic or "Bodoni Moda"', body: 'brandon-grot-w01-light (Brandon Grotesque Light, sans-serif) - Wix hosted; alternative: "Josefin Sans" light/"Jost" light' } }; fs.writeFileSync('out/theme.json', JSON.stringify(t, null, 2));
console.log(JSON.stringify(r, null, 1).slice(0, 4500)); await b.close();
