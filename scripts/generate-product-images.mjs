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

function wrapText(text, maxChars) {
  const words = String(text || '').split(/\s+/).filter(Boolean);
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxChars) {
      if (current) lines.push(current.trim());
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current.trim());
  return lines.slice(0, 3);
}

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
  const id = product.id || 'PRODUCT';
  const brand = product.brand || '';
  const name = product.name || '';
  const desc = product.description || '';
  const subcategory = product.subcategory || '';
  const theme = svgForCategory(product.category);
  const descLines = wrapText(desc, 36);
  const nameLines = wrapText(name, 24);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.bg1}"/>
      <stop offset="100%" stop-color="${theme.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)"/>
  <g opacity="0.9">${theme.shape}</g>
  <g>
    <rect x="40" y="40" width="520" height="80" rx="16" ry="16" fill="white" opacity="0.7"/>
    <text x="60" y="90" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="28" font-weight="700" fill="${theme.text}">${escapeXml(brand)}${subcategory ? ' · ' + escapeXml(subcategory) : ''}</text>
  </g>
  <g>
    <text x="60" y="220" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="36" font-weight="800" fill="${theme.accent}">${escapeXml(nameLines[0] || '')}</text>
    <text x="60" y="262" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="36" font-weight="800" fill="${theme.accent}">${escapeXml(nameLines[1] || '')}</text>
  </g>
  <g opacity="0.9">
    <text x="60" y="340" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="20" font-weight="500" fill="${theme.text}">${escapeXml(descLines[0] || '')}</text>
    <text x="60" y="370" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="20" font-weight="500" fill="${theme.text}">${escapeXml(descLines[1] || '')}</text>
    <text x="60" y="400" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="20" font-weight="500" fill="${theme.text}">${escapeXml(descLines[2] || '')}</text>
  </g>
  <g>
    <rect x="40" y="500" width="240" height="60" rx="12" ry="12" fill="${theme.accent}"/>
    <text x="60" y="540" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="22" font-weight="700" fill="white">${escapeXml(id)}</text>
  </g>
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

