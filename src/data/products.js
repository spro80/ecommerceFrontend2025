export const products = [
  {
    id: "CAB-SHA-001",
    name: "Shampoo Collagen - 1000 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "shampoo",
    price: 9990,
    image: "/images/productos/shampoo_collagen_plus_vinge_1000_ml.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACO-001",
    name: "Acondicionador Collagen - 1000 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "conditioner",
    price: 9990,
    image: "/images/productos/acondicionador_collagen_plus_vinge_1000_ml.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-001",
    name: "Aceite de Argan con Colageno - 100 ml",
    brand: "Plus Vinge",
    category: "cabello",
    subcategory: "aceite",
    price: 5990,
    image: "/images/productos/aceite_de_argan_con_colageno_plus_vinge_100ml.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-SHA-002",
    name: "Shampoo Curl Perfect 3 en 1 - 500 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "shampoo",
    price: 5990,
    image: "/images/productos/shampoo_curl_perfect_3_en_1_rocco_500_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACO-002",
    name: "Acondicionador Curl Perfect 3 en 1 - 500 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "conditioner",
    price: 5990,
    image: "/images/productos/acondicionador_curl_perfect_3_en_1_rocco_500_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-SHA-003",
    name: "Shampoo Jalea Real Anticaida - 400 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "shampoo",
    price: 5390,
    image: "/images/productos/shampoo_jalea_real_anticaida_rocco_400_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACO-003",
    name: "Acondicionador Jalea Real Anticaida 400 ml",
    brand: "Rocco",
    category: "cabello",
    subcategory: "conditioner",
    price: 5390,
    image: "/images/productos/acondicionador_jalea_real_anticaida_rocco_400_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-002",
    name: "Aceite Luxury Moroccan Argan Oil - 60 ml",
    brand: "Moroccan",
    category: "cabello",
    subcategory: "aceite",
    price: 7990,
    image: "/images/productos/aceite_luxury_moroccan_argan_oil_60_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-003",
    name: "Aceite extreme caviar Haircare Luxe Line - 100 ml",
    brand: "Luxe Line",
    category: "cabello",
    subcategory: "aceite",
    price: 8990,
    image: "/images/productos/aceite_extreme_caviar_hair_oil_maxcare_100_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "CAB-ACE-004",
    name: "Aceite de Nuez Marroqui Profesional - 55 ml",
    brand: "Marca",
    category: "cabello",
    subcategory: "aceite",
    price: 5990,
    image: "/images/productos/aceite_capilar_de_nuez_marroqui_obopekal_55_ml_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "TAZ-SCH-001",
    name: "Tazon Schopero de Cobre Kunstmann 485 ml",
    brand: "Kunstmann",
    category: "tazon",
    subcategory: "schopero",
    price: 24990,
    image: "/images/productos/tazon_schopero_cobre_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  },
  {
    id: "TAZ-SCH-002",
    name: "Tazon Schopero Acero Inoxidable Kunstmann 485 ml",
    brand: "Kunstmann",
    category: "tazon",
    subcategory: "schopero",
    price: 24990,
    image: "/images/productos/tazon_schopero_acero_inoxidable_600x600.png",
    description: "Un producto de alta calidad con excelente diseño y rendimiento.",
    stock: 1
  }
];

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
