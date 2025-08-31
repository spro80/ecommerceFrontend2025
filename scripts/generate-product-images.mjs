#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const assetsDir = path.join(repoRoot, 'public', 'assets', 'products');

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

function escapeXml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

// No text wrapping needed anymore as we removed textual overlays from SVGs

function svgForCategory(category) {
  const c = String(category || '').toLowerCase();
  if (c === 'cabello') {
    return {
      bg1: '#fff7ed', // warm background
      bg2: '#fde68a', // accent gradient
      shape: `<path d="M120 460 C 200 380, 260 520, 340 440 S 500 500, 540 420" stroke="#7c3e0a" stroke-width="10" fill="none" stroke-linecap="round" />
              <path d="M80 380 C 160 300, 220 440, 300 360 S 460 420, 520 340" stroke="#a16207" stroke-width="8" fill="none" stroke-linecap="round" />`,
      accent: '#7c3e0a',
      text: '#1f2937'
    };
  }
  if (c === 'tazon') {
    return {
      bg1: '#ecfeff',
      bg2: '#bae6fd',
      shape: `<rect x="120" y="200" rx="24" ry="24" width="360" height="220" fill="#0ea5e9"/>
              <rect x="380" y="240" rx="40" ry="40" width="120" height="140" fill="none" stroke="#0ea5e9" stroke-width="20"/>
              <rect x="140" y="190" width="320" height="20" fill="#0c4a6e" opacity="0.4"/>`,
      accent: '#0ea5e9',
      text: '#0c4a6e'
    };
  }
  return {
    bg1: '#f1f5f9',
    bg2: '#e2e8f0',
    shape: `<circle cx="300" cy="300" r="120" fill="#64748b" opacity="0.35"/>`,
    accent: '#334155',
    text: '#0f172a'
  };
}

function generateSvg(product) {
  const theme = svgForCategory(product.category);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-label="Product image">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.bg1}"/>
      <stop offset="100%" stop-color="${theme.bg2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
    <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18" />
    </filter>
    <pattern id="subtleGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" stroke-opacity="0.03" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)"/>
  <rect width="600" height="600" fill="url(#subtleGrid)"/>
  <g opacity="0.9">${theme.shape}</g>
  <circle cx="460" cy="160" r="120" fill="url(#glow)" filter="url(#softBlur)" />
  <circle cx="140" cy="460" r="140" fill="url(#glow)" filter="url(#softBlur)" />
</svg>`;
}

async function run() {
  const productsModulePath = pathToFileURL(path.join(repoRoot, 'src', 'data', 'products.js')).href;
  const { products } = await import(productsModulePath);
  await ensureDir(assetsDir);

  // Also create a couple of category defaults
  const defaults = [
    { id: 'default', category: 'default', name: 'Producto', brand: 'Marca', description: 'Imagen por defecto' },
    { id: 'default-cabello', category: 'cabello', name: 'Cabello', brand: 'Genérico', description: 'Cuidado del cabello' },
    { id: 'default-tazon', category: 'tazon', name: 'Tazón', brand: 'Genérico', description: 'Utensilios de cocina' }
  ];
  const all = [...defaults, ...products];

  let created = 0;
  for (const p of all) {
    const outfile = path.join(assetsDir, `${p.id}.svg`);
    const svg = generateSvg(p);
    await fs.writeFile(outfile, svg, 'utf8');
    created += 1;
  }

  console.log(`Generated ${created} images at ${path.relative(repoRoot, assetsDir)}`);
}

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

