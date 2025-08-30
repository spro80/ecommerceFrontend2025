export async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
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
      message = { message: (text || '').slice(0, 200) };
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

export async function getProducts() {
  try {
    const data = await fetchJson('/api/products');
    return attachImages(data);
  } catch (error) {
    if (shouldFallbackToMock(error)) {
      const { products } = await import('../data/products.js');
      return attachImages(products);
    }
    throw error;
  }
}

export async function getProductByIdApi(id) {
  try {
    const data = await fetchJson(`/api/products/${encodeURIComponent(id)}`);
    return attachImageToProduct(data);
  } catch (error) {
    if (shouldFallbackToMock(error)) {
      const { getProductById } = await import('../data/products.js');
      return attachImageToProduct(getProductById(id));
    }
    throw error;
  }
}

function shouldFallbackToMock(error) {
  const snippet = error?.data?.snippet;
  if (typeof snippet === 'string' && snippet.trim().startsWith('<')) return true;
  // Also fallback when no status and no JSON data
  if (!('status' in (error || {})) && !('data' in (error || {}))) return true;
  return false;
}

