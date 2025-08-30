// Image utilities for resolving product image paths based on product data
// and providing sensible local defaults.

/**
 * Return the absolute public URL path to the image for a product.
 * Prefers a deterministic local asset path by product id.
 * Falls back to category defaults when id is missing.
 *
 * @param {Object} product
 * @param {string} [product.id]
 * @param {string} [product.category]
 * @returns {string}
 */
export function resolveProductImage(product = {}) {
  const productId = (product.id || '').trim();
  if (productId) {
    return `/assets/products/${productId}.svg`;
  }
  const category = String(product.category || '').toLowerCase();
  if (category === 'cabello') return '/assets/products/default-cabello.svg';
  if (category === 'tazon') return '/assets/products/default-tazon.svg';
  return '/assets/products/default.svg';
}

/**
 * Return a shallow-cloned product object with the image field set to the
 * resolved local image path. This intentionally overrides any remote image
 * URL to ensure repository-local assets are used consistently.
 *
 * @param {Object} product
 * @returns {Object}
 */
export function attachImageToProduct(product) {
  const image = resolveProductImage(product);
  return { ...product, image };
}

/**
 * Map helper for arrays of products.
 * @param {Array<Object>} products
 * @returns {Array<Object>}
 */
export function attachImages(products) {
  if (!Array.isArray(products)) return [];
  return products.map((p) => attachImageToProduct(p));
}

