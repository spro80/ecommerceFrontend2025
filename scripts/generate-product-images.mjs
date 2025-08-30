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

function themeFor(product) {
  const category = String(product.category || '').toLowerCase();
  const sub = String(product.subcategory || '').toLowerCase();
  if (category === 'tazon' || sub === 'schopero') {
    return { bg1: '#ecfeff', bg2: '#bae6fd', primary: '#0ea5e9', secondary: '#0369a1' };
  }
  if (sub === 'shampoo') {
    return { bg1: '#fef2f2', bg2: '#fecaca', primary: '#ef4444', secondary: '#991b1b' };
  }
  if (sub === 'conditioner') {
    return { bg1: '#f5f3ff', bg2: '#ddd6fe', primary: '#8b5cf6', secondary: '#6d28d9' };
  }
  if (sub === 'aceite') {
    return { bg1: '#fffbeb', bg2: '#fde68a', primary: '#f59e0b', secondary: '#b45309' };
  }
  if (category === 'cabello') {
    return { bg1: '#fff7ed', bg2: '#fde68a', primary: '#f97316', secondary: '#7c2d12' };
  }
  return { bg1: '#f1f5f9', bg2: '#e2e8f0', primary: '#334155', secondary: '#475569' };
}

function iconFor(product, theme) {
  const sub = String(product.subcategory || '').toLowerCase();
  const category = String(product.category || '').toLowerCase();

  // Common glossy highlight
  const highlight = `<ellipse cx="300" cy="240" rx="90" ry="28" fill="white" opacity="0.25"/>`;

  if (sub === 'shampoo') {
    // Rounded-shoulder bottle with cap
    return `
      <g>
        <rect x="230" y="170" width="140" height="260" rx="36" ry="36" fill="${theme.primary}"/>
        <rect x="250" y="140" width="100" height="40" rx="10" ry="10" fill="${theme.secondary}"/>
        <rect x="245" y="200" width="110" height="18" rx="9" ry="9" fill="white" opacity="0.25"/>
        ${highlight}
        <circle cx="300" cy="405" r="70" fill="white" opacity="0.08"/>
      </g>
    `;
  }

  if (sub === 'conditioner') {
    // Tall oval bottle with pump
    return `
      <g>
        <rect x="230" y="160" width="140" height="280" rx="70" ry="70" fill="${theme.primary}"/>
        <rect x="288" y="110" width="24" height="60" rx="8" ry="8" fill="${theme.secondary}"/>
        <rect x="260" y="100" width="120" height="14" rx="7" ry="7" fill="${theme.secondary}"/>
        <rect x="360" y="100" width="40" height="12" rx="6" ry="6" fill="${theme.secondary}"/>
        ${highlight}
        <rect x="265" y="230" width="90" height="16" rx="8" ry="8" fill="white" opacity="0.25"/>
      </g>
    `;
  }

  if (sub === 'aceite') {
    // Oil drop over a small vial base
    return `
      <g>
        <path d="M300 180 C 280 220, 240 250, 240 300 C 240 350, 275 385, 300 390 C 325 385, 360 350, 360 300 C 360 250, 320 220, 300 180 Z" fill="${theme.primary}"/>
        <circle cx="290" cy="270" r="14" fill="white" opacity="0.45"/>
        <rect x="255" y="390" width="90" height="30" rx="10" ry="10" fill="${theme.secondary}"/>
        <rect x="265" y="360" width="70" height="20" rx="10" ry="10" fill="${theme.secondary}" opacity="0.85"/>
      </g>
    `;
  }

  if (category === 'tazon' || sub === 'schopero') {
    // Bowl / mug silhouette
    return `
      <g>
        <path d="M160 260 Q 180 420, 300 440 Q 420 420, 440 260 L 160 260 Z" fill="${theme.primary}"/>
        <rect x="180" y="240" width="240" height="20" rx="10" ry="10" fill="${theme.secondary}" opacity="0.5"/>
        <path d="M440 280 C 480 280, 500 300, 500 340 C 500 380, 480 400, 450 395" stroke="${theme.secondary}" stroke-width="18" fill="none" stroke-linecap="round"/>
      </g>
    `;
  }

  // Generic circle glyph
  return `
    <g>
      <circle cx="300" cy="300" r="120" fill="${theme.primary}" opacity="0.85"/>
      <circle cx="300" cy="260" r="52" fill="white" opacity="0.25"/>
    </g>
  `;
}

function generateSvg(product) {
  const theme = themeFor(product);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${theme.bg1}"/>
      <stop offset="100%" stop-color="${theme.bg2}"/>
    </linearGradient>
    <radialGradient id="halo" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bgGrad)"/>

  <g opacity="0.6">
    <circle cx="460" cy="120" r="90" fill="url(#halo)"/>
    <circle cx="120" cy="500" r="120" fill="url(#halo)"/>
  </g>

  <g>
    ${iconFor(product, theme)}
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

