export const products = [
  {
    id: "CAB-SHA-001",
    name: "Shampoo Collagen - 1000 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "shampoo",
    price: 19.99,
    image: "https://picsum.photos/seed/product-1/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 0
  },
  {
    id: "CAB-ACO-001",
    name: "Acondicionador Collagen - 1000 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "conditioner",
    price: 24.99,
    image: "https://picsum.photos/seed/product-2/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 0
  },
  {
    id: "CAB-ACE-001",
    name: "Aceite de Argan con Colageno - 1000 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "aceite",
    price: 29.99,
    image: "https://picsum.photos/seed/product-3/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-SHA-002",
    name: "Shampoo Curl Perfect 3 en 1 - 500 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "shampoo",
    price: 34.99,
    image: "https://picsum.photos/seed/product-4/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACO-002",
    name: "Acondicionador Curl Perfect 3 en 1 - 500 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "conditioner",
    price: 22.99,
    image: "https://picsum.photos/seed/product-5/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-SHA-003",
    name: "Shampoo Jalea Real Anticaida - 400 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "shampoo",
    price: 18.99,
    image: "https://picsum.photos/seed/product-6/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACO-003",
    name: "Acondicionador Jalea Real Anticaida 400 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "conditioner",
    price: 21.49,
    image: "https://picsum.photos/seed/product-7/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-002",
    name: "Aceite Luxury Moroccan Argan Oil - 60 ml",
    brand: "Moroccan",
    category: "cabello",
    subcategory: "aceite",
    price: 27.49,
    image: "https://picsum.photos/seed/product-8/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-003",
    name: "Aceite extreme caviar Haircare Luxe Line - 100 ml",
    brand: "Luxe Line",
    category: "cabello",
    subcategory: "aceite",
    price: 32.99,
    image: "https://picsum.photos/seed/product-9/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-004",
    name: "Aceite de Nuez Marroqui Profesional - 55 ml",
    brand: "Marca",
    category: "cabello",
    subcategory: "aceite",
    price: 14.99,
    image: "https://picsum.photos/seed/product-10/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "TAZ-SCH-001",
    name: "Tazon Schopero de Cobre Kunstmann 485 ml",
    brand: "Kunstmann",
    category: "tazon",
    subcategory: "schopero",
    price: 12.99,
    image: "https://picsum.photos/seed/product-11/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "TAZ-SCH-002",
    name: "Tazon Schopero Acero Inoxidable Kunstmann 485 ml",
    brand: "Kunstmann",
    category: "tazon",
    subcategory: "schopero",
    price: 13.99,
    image: "https://picsum.photos/seed/product-12/600/600",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  }
];

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
