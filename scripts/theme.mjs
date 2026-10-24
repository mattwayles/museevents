import { chromium } from 'playwright';
import { load } from './lib.mjs';
import fs from 'node:fs';
const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
const out = {};
const pick = `(el)=>{ if(!el) return null; const c=getComputedStyle(el); return {text:(el.innerText||'').trim().slice(0,40), fontFamily:c.fontFamily, fontSize:c.fontSize, fontWeight:c.fontWeight, fontStyle:c.fontStyle, color:c.color, backgroundColor:c.backgroundColor, letterSpacing:c.letterSpacing, lineHeight:c.lineHeight, textTransform:c.textTransform, border:c.border}; }`;
for (const p of ['/', '/wedding-planning', '/blog', '/single-post/2019/04/22/camila-and-josh', '/contactform']) {
  await load(pg, 'https://www.museevents.com' + p);
  out[p] = await pg.evaluate(`(()=>{ const pick=${pick}; const q=(s)=>document.querySelector(s);
    const nav=q('nav a, [role=navigation] a, [data-testid=linkElement][href*="about"]');
    const btn=[...document.querySelectorAll('a')].find(a=>/Book a Consultation|View Our Packages|View Photos/.test(a.innerText));
    const btnInner=btn?.querySelector('span')||btn;
    const pbody=[...document.querySelectorAll('p')].find(p=>p.innerText.trim().length>80);
    const navActive=[...document.querySelectorAll('nav a')].find(a=>a.getAttribute('aria-current')==='page');
    return { bodyBg: getComputedStyle(document.body).backgroundColor, pageBg: pick(q('#SITE_CONTAINER')), pageBgLayer: pick(q('[data-testid=page-bg]')), siteBgGroup: pick(q('#BACKGROUND_GROUP')),
      h1: pick(q('h1')), h2: pick(q('h2')), h3: pick(q('h3')), h4: pick(q('h4')), h5:pick(q('h5')), h6:pick(q('h6')), paragraph: pick(pbody), nav: pick(nav), navActive: pick(navActive), button: pick(btn), buttonLabel: pick(btnInner),
      footer: pick(q('#SITE_FOOTER')), footerText: pick(q('#SITE_FOOTER p')), header: pick(q('#SITE_HEADER')), link: pick([...document.querySelectorAll('p a')][0]),
      cssVars: [...document.styleSheets].flatMap(s=>{try{return [...s.cssRules]}catch{return []}}).filter(r=>r.selectorText===':root'||r.selectorText==='body').map(r=>r.cssText).join('\\n').match(/--color_\\d+:[^;]+;|--font_\\d+:[^;]+;/g)?.slice(0,80) || [] }; })()`);
}
// fonts used
out.fontFacesLoaded = await pg.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight + ' ' + f.style));
fs.writeFileSync('out/theme.json', JSON.stringify(out, null, 2));
console.log(JSON.stringify(out['/'], null, 1).slice(0, 3500));
await b.close();
