// Image mapping utilities for products

export const CATEGORY_IMAGE_PATHS = {
  cabello: "/images/category/cabello.svg",
  tazon: "/images/category/tazon.svg",
};

function buildProductImagePathById(productId) {
  if (typeof productId !== "string" || productId.trim() === "") return null;
  return `/images/products/${productId}.svg`;
}

export function mapProductImage(product) {
  if (!product || typeof product !== "object") return product;
  const category = (product.category || "").toLowerCase();
  const idImagePath = buildProductImagePathById(product.id);
  const categoryFallback = CATEGORY_IMAGE_PATHS[category] || CATEGORY_IMAGE_PATHS.cabello;

  return {
    ...product,
    image: idImagePath || categoryFallback,
  };
}

export function mapProductCollection(products) {
  if (!Array.isArray(products)) return [];
  return products.map((p) => mapProductImage(p));
}

