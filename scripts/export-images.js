#!/usr/bin/env node
/*
Exports PNG/WebP variants from all SVGs in public/images/categories
Usage: node scripts/export-images.js
*/

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'public', 'images', 'categories');
const OUT_PNG = path.join(SRC_DIR, 'png');
const OUT_WEBP = path.join(SRC_DIR, 'webp');

const TARGET_SIZES = [128, 256, 512];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function exportFromSvg(svgPath) {
  const base = path.basename(svgPath, '.svg');
  const svg = fs.readFileSync(svgPath);
  for (const size of TARGET_SIZES) {
    const pngOut = path.join(OUT_PNG, `${base}-${size}.png`);
    const webpOut = path.join(OUT_WEBP, `${base}-${size}.webp`);
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(pngOut);
    await sharp(svg, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .webp({ quality: 90 })
      .toFile(webpOut);
    console.log(`✓ ${base} -> ${size}px PNG/WebP`);
  }
}

async function main() {
  ensureDir(OUT_PNG);
  ensureDir(OUT_WEBP);
  const files = fs.readdirSync(SRC_DIR).filter(f => f.endsWith('.svg'));
  if (files.length === 0) {
    console.error('No SVG files found in', SRC_DIR);
    process.exit(1);
  }
  for (const file of files) {
    await exportFromSvg(path.join(SRC_DIR, file));
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

