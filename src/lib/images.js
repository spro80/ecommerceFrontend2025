// Image resolution for products
// Picks a local SVG based on category/subcategory and falls back to defaults

const IMAGE_BASE_PATH = '/images/products';

const KNOWN_SUBCATEGORY_FILES = {
  'cabello:shampoo': `${IMAGE_BASE_PATH}/cabello_shampoo.svg`,
  'cabello:conditioner': `${IMAGE_BASE_PATH}/cabello_conditioner.svg`,
  'cabello:aceite': `${IMAGE_BASE_PATH}/cabello_aceite.svg`,
  'tazon:schopero': `${IMAGE_BASE_PATH}/tazon_schopero.svg`,
};

const KNOWN_CATEGORY_FILES = {
  cabello: `${IMAGE_BASE_PATH}/cabello.svg`,
  tazon: `${IMAGE_BASE_PATH}/tazon.svg`,
};

const DEFAULT_IMAGE = `${IMAGE_BASE_PATH}/default.svg`;

export function resolveProductImage(product) {
  if (!product || typeof product !== 'object') return DEFAULT_IMAGE;
  const rawCategory = String(product.category || '').toLowerCase().trim();
  const rawSubcategory = String(product.subcategory || '').toLowerCase().trim();

  // 1) Exact subcategory match
  const key = `${rawCategory}:${rawSubcategory}`;
  if (key in KNOWN_SUBCATEGORY_FILES) {
    return KNOWN_SUBCATEGORY_FILES[key];
  }

  // 2) Category fallback
  if (rawCategory in KNOWN_CATEGORY_FILES) {
    return KNOWN_CATEGORY_FILES[rawCategory];
  }

  // 3) Default
  return DEFAULT_IMAGE;
}

export function enhanceProductWithImage(product) {
  if (!product) return product;
  const image = resolveProductImage(product);
  return { ...product, image };
}

export function enhanceProductsWithImage(products) {
  if (!Array.isArray(products)) return [];
  return products.map(enhanceProductWithImage);
}

