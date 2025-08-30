export async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    const message = await safeReadJson(response);
    const error = new Error(message?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = message;
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

export function getProducts() {
  return fetchJson('/api/products');
}

export function getProductByIdApi(id) {
  return fetchJson(`/api/products/${encodeURIComponent(id)}`);
}

