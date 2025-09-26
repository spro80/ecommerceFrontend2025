// Local storage utilities for admin-managed data

const CUSTOM_PRODUCTS_KEY = 'custom_products';
const BRANCHES_KEY = 'branches_list';

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getCustomProducts() {
  const list = safeRead(CUSTOM_PRODUCTS_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveCustomProduct(product) {
  const list = getCustomProducts();
  const index = list.findIndex((p) => p.id === product.id);
  const now = new Date().toISOString();
  const record = { ...product, createdAt: product.createdAt || now, updatedAt: now };
  let next;
  if (index >= 0) {
    next = [...list];
    next[index] = { ...list[index], ...record };
  } else {
    next = [record, ...list];
  }
  safeWrite(CUSTOM_PRODUCTS_KEY, next);
  return record;
}

export function getBranches() {
  const list = safeRead(BRANCHES_KEY, []);
  return Array.isArray(list) ? list : [];
}

export function saveBranch(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return null;
  const list = getBranches();
  const exists = list.find((b) => b.name.toLowerCase() === trimmed.toLowerCase());
  if (exists) return exists;
  const branch = { id: crypto.randomUUID(), name: trimmed };
  const next = [...list, branch];
  safeWrite(BRANCHES_KEY, next);
  return branch;
}

export function ensureBranches(names = []) {
  const created = [];
  for (const name of names) {
    const b = saveBranch(name);
    if (b) created.push(b);
  }
  return created;
}

