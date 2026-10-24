// One-time pass: cap downloaded images at 2000px on the long edge and recompress
// JPEGs at quality 82. Run from the repo root: node scripts/shrink-images.mjs
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets/images';
const MAX = 2000;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0, after = 0, changed = 0;
for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
  const input = await readFile(file);
  const { width = 0, height = 0 } = await sharp(input).metadata();
  // Leave small files (logos, icons) untouched
  if (Math.max(width, height) <= MAX && input.length < 600_000) continue;

  let pipeline = sharp(input).rotate().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true });
  pipeline = ext === '.png' ? pipeline.png({ compressionLevel: 9, palette: true }) : pipeline.jpeg({ quality: 82, mozjpeg: true });
  const output = await pipeline.toBuffer();
  if (output.length >= input.length) continue;

  await writeFile(file, output);
  before += input.length;
  after += output.length;
  changed++;
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`Recompressed ${changed} files: ${mb(before)} MB -> ${mb(after)} MB`);
