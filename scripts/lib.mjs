import fs from 'node:fs';
export const BASE = 'https://www.museevents.com';
export const slugOf = (p) => p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '__');
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

export async function load(page, url) {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(e => console.log('goto warn', url, e.message.slice(0, 60)));
  await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
  await page.waitForTimeout(1500);
  await autoScroll(page);
  await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(800);
}
export async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise(res => {
      let y = 0; const step = 500;
      const t = setInterval(() => {
        window.scrollTo(0, y); y += step;
        if (y > document.documentElement.scrollHeight + step) { clearInterval(t); window.scrollTo(0, 0); res(); }
      }, 150);
    });
  });
}

// Runs in the browser. Returns ordered content blocks.
export function extractInPage() {
  const out = { sections: [] };
  const root = document.querySelector('#SITE_CONTAINER') || document.body;
  const imgUrl = (el) => {
    const s = el.currentSrc || el.getAttribute('src') || '';
    return s.startsWith('http') ? s : '';
  };
  const bgUrl = (el) => {
    const m = (getComputedStyle(el).backgroundImage || '').match(/url\("?([^")]+)"?\)/);
    return m && m[1].includes('wixstatic') ? m[1] : '';
  };
  const vis = (el) => { const cs = getComputedStyle(el); return cs.display !== 'none' && cs.visibility !== 'hidden'; };
  const areaOf = (el) => el.closest('#SITE_HEADER') ? 'header' : el.closest('#SITE_FOOTER') ? 'footer' : 'main';
  const blocks = { header: [], main: [], footer: [] };
  const sectionIds = new Map();
  const secOf = (el) => {
    const s = el.closest('section, [data-testid="screenWidthContainerBg"]')?.closest('section') || el.closest('section');
    if (!s) return 0;
    if (!sectionIds.has(s)) sectionIds.set(s, sectionIds.size + 1);
    return sectionIds.get(s);
  };
  const push = (el, b) => { b.section = secOf(el); blocks[areaOf(el)].push(b); };
  const seen = new Set();
  const walk = (el) => {
    if (!(el instanceof Element) || seen.has(el)) return;
    const tag = el.tagName.toLowerCase();
    if (['script', 'style', 'noscript', 'svg', 'template'].includes(tag)) return;
    if (!vis(el)) return;
    if (/^h[1-6]$/.test(tag)) {
      const t = el.innerText.trim(); if (t) push(el, { type: 'heading', level: +tag[1], text: t, html: el.innerHTML.trim() });
      return;
    }
    if (tag === 'p') {
      const t = el.innerText.trim();
      if (t) push(el, { type: 'paragraph', text: t, links: [...el.querySelectorAll('a[href]')].map(a => ({ text: a.innerText.trim(), href: a.href })) });
      return;
    }
    if (tag === 'ul' || tag === 'ol') {
      const items = [...el.querySelectorAll(':scope > li')].map(li => li.innerText.trim()).filter(Boolean);
      if (items.length) push(el, { type: 'list', ordered: tag === 'ol', items });
      return;
    }
    if (tag === 'a' && el.getAttribute('href')) {
      const hasImg = el.querySelector('img');
      const t = el.innerText.trim();
      if (!hasImg) { if (t) push(el, { type: 'button', text: t, href: el.href }); return; }
      push(el, { type: 'link-image', href: el.href, text: t });
    }
    if (tag === 'button') { const t = el.innerText.trim(); if (t) push(el, { type: 'button', text: t, href: null }); return; }
    if (tag === 'img') {
      const src = imgUrl(el);
      if (src) push(el, { type: 'image', src, alt: el.alt || '', width: el.naturalWidth, height: el.naturalHeight, caption: (el.closest('figure')?.querySelector('figcaption')?.innerText || '').trim() });
      return;
    }
    const bg = bgUrl(el);
    if (bg) push(el, { type: 'background-image', src: bg });
    if (tag === 'form' || el.matches?.('[data-testid="formElement"]')) {}
    // text-only divs (Wix rich text without p)
    for (const c of el.children) walk(c);
    if (el.shadowRoot) for (const c of el.shadowRoot.children) walk(c);
  };
  walk(root);
  // dedupe consecutive identical
  for (const k of Object.keys(blocks)) {
    const o = []; for (const b of blocks[k]) { const p = o[o.length - 1]; if (p && JSON.stringify(p) === JSON.stringify(b)) continue; o.push(b); }
    blocks[k] = o;
  }
  const meta = (n) => document.querySelector(`meta[name="${n}"],meta[property="${n}"]`)?.content || '';
  return {
    title: document.title, metaDescription: meta('description'), ogTitle: meta('og:title'), ogImage: meta('og:image'),
    canonical: document.querySelector('link[rel=canonical]')?.href || '', blocks,
    slideshows: [...document.querySelectorAll('[data-testid="slide-show-gallery"]')].map(g => [...g.querySelectorAll('[data-testid="gallery-item-ghost"]')].map(it => {
      let uri = ''; try { uri = JSON.parse(it.querySelector('wow-image')?.getAttribute('data-image-info') || '{}').imageData?.uri || ''; } catch {}
      const im = it.querySelector('img');
      return { src: uri ? 'https://static.wixstatic.com/media/' + uri : (im?.src || ''), alt: im?.alt || '', title: it.querySelector('[data-testid="gallery-item-title"]')?.innerText.trim() || '', description: it.querySelector('[data-testid="gallery-item-description"]')?.innerText.trim() || '' };
    })),
    wixImages: [...new Set([...document.querySelectorAll('img')].map(i => i.currentSrc || i.src).filter(s => s.includes('wixstatic')))],
  };
}
