import { buildApiUrl } from './config.js';

export async function fetchJson(url, options = {}) {
  const response = await fetch(buildApiUrl(url), {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok) {
    let message = null;
    if (contentType.includes('application/json')) {
      message = await safeReadJson(response);
    } else {
      const text = await response.text();
      const snippet = (text || '').slice(0, 200);
      // Include both message and snippet so fallback logic can detect HTML responses
      message = { message: snippet, snippet };
    }
    const error = new Error(message?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = message;
    throw error;
  }
  if (!contentType.includes('application/json')) {
    const text = await response.text();
    const snippet = (text || '').slice(0, 200);
    const error = new Error('La respuesta no es JSON. ¿Está activo el endpoint /api?');
    error.data = { snippet };
    throw error;
  }
  return response.json();
}

async function safeReadJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

import { attachImages, attachImageToProduct } from './images.js';
import { getCustomProducts } from '../lib/localStore.js';

export async function getProducts() {
  // Force using local mock data to avoid hitting non-existent API in production
  const { products } = await import('../data/products.js');
  const custom = getCustomProducts();
  const merged = Array.isArray(custom) && custom.length > 0 ? [...custom, ...products] : products;
  return attachImages(merged);
}

export async function getProductByIdApi(id) {
  // Force using local mock data to avoid hitting non-existent API in production
  const { getProductById } = await import('../data/products.js');
  return attachImageToProduct(getProductById(id));
}

function shouldFallbackToMock(error) {
  const snippet = error?.data?.snippet;
  if (typeof snippet === 'string' && snippet.trim().startsWith('<')) return true;
  // Also fallback when no status and no JSON data
  if (!('status' in (error || {})) && !('data' in (error || {}))) return true;
  return false;
}

// =====================
// Blog API (with fallback)
// =====================
export async function getBlogPosts() {
  try {
    const data = await fetchJson('/api/blog');
    // Expected shape from API: array of posts
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (shouldFallbackToMock(error)) {
      const { getAllPosts } = await import('../data/blog.js');
      return getAllPosts();
    }
    throw error;
  }
}

export async function getBlogPostBySlug(slug) {
  try {
    const data = await fetchJson(`/api/blog/${encodeURIComponent(slug)}`);
    return data;
  } catch (error) {
    if (shouldFallbackToMock(error)) {
      const { getPostBySlug } = await import('../data/blog.js');
      return getPostBySlug(slug);
    }
    throw error;
  }
}

