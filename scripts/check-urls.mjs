import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2];
if (!dist) { console.error('usage: node scripts/check-urls.mjs <distDir>'); process.exit(2); }

const inv = JSON.parse(readFileSync('scripts/out/inventory.json', 'utf8'));
const urls = [...new Set([...inv.pages, ...inv.blog, ...inv.other])];

const froms = [];
if (existsSync('netlify.toml')) {
  for (const m of readFileSync('netlify.toml', 'utf8').matchAll(/\[\[redirects\]\][^[]*?from\s*=\s*"([^"]+)"/g)) froms.push(m[1]);
}
if (existsSync('public/_redirects')) {
  for (const l of readFileSync('public/_redirects', 'utf8').split('\n')) {
    const t = l.trim();
    if (t && !t.startsWith('#')) froms.push(t.split(/\s+/)[0]);
  }
}
const rx = froms.map((f) => new RegExp('^' + f.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '/?$'));

const fails = [];
let pass = 0;
for (const u of urls) {
  const p = u.replace(/\/+$/, '');
  const file = join(dist, p, 'index.html');
  if (existsSync(file) || rx.some((r) => r.test(u))) pass++;
  else fails.push(u);
}
console.log(`${pass}/${urls.length} URLs OK`);
if (fails.length) { console.error('FAIL:\n' + fails.join('\n')); process.exit(1); }
