import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';



export default function Products(items) {
  const PRODUCTS_PER_PAGE = 9;

  const allProducts = useMemo(() => {

    /*
    const items = [];
    for (let index = 1; index <= 48; index += 1) {
      items.push({
        id: index,
        name: `Producto ${index}`,
        category: "cabello",
        price: (Math.random() * 90 + 10).toFixed(2),
        image: `https://picsum.photos/seed/product-${index}/600/600`,
        description: 'Un producto de alta calidad con excelente diseño y rendimiento.'
      });
    }*/

      const items = [
        {
          id: "CAB-SHA-001",
          name: `Shampoo Collagen - 1000 ml`,
          brand: "Plus Vinge",
          category: "cabello",
          subcategory: "shampoo",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-1/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 0
        },
        {
          id: "CAB-ACO-001",
          name: `Acondicionador Collagen - 1000 ml`,
          brand: "Plus Vinge",
          category: "cabello",
          subcategory: "conditioner",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-2/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 0
        },
        {
          id: "CAB-ACE-001",
          name: `Aceite de Argan con Colageno - 1000 ml`,
          brand: "Plus Vinge",
          category: "cabello",
          subcategory: "aceite",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-3/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-SHA-002",
          name: `Shampoo Curl Perfect 3 en 1 - 500 ml`,
          brand: "Rocco",
          category: "cabello",
          subcategory: "shampoo",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-4/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-ACO-002",
          name: `Acondicionador Curl Perfect 3 en 1 - 500 ml`,
          brand: "Rocco",
          category: "cabello",
          subcategory: "conditioner",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-5/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-SHA-003",
          name: `Shampoo Jalea Real Anticaida - 400 ml`,
          brand: "Rocco",
          category: "cabello",
          subcategory: "shampoo",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-6/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-ACO-003",
          name: `Acondicionador Jalea Real Anticaida 400 ml`,
          brand: "Rocco",
          category: "cabello",
          subcategory: "conditioner",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-7/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-ACE-002",
          name: `Aceite Luxury Moroccan Argan Oil - 60 ml`,
          brand: "Moroccan",
          category: "cabello",
          subcategory: "aceite",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-8/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-ACE-003",
          name: `Aceite extreme caviar Haircare Luxe Line - 100 ml`,
          brand: "Luxe Line",
          category: "cabello",
          subcategory: "aceite",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-9/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "CAB-ACE-004",
          name: `Aceite de Nuez Marroqui Profesional - 55 ml`,
          brand: "Marca",
          category: "cabello",
          subcategory: "aceite",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-10/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "TAZ-SCH-001",
          name: `Tazon Schopero de Cobre Kunstmann 485 ml`,
          brand: "Kunstmann",
          category: "tazon",
          subcategory: "schopero",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-11/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        },
        {
          id: "TAZ-SCH-002",
          name: `Tazon Schopero Acero Inoxidable Kunstmann 485 ml`,
          brand: "Kunstmann",
          category: "tazon",
          subcategory: "schopero",
          price: (Math.random() * 90 + 10).toFixed(2),
          image: `https://picsum.photos/seed/product-12/600/600`,
          description: 'Un producto de alta calidad con excelente diseño y rendimiento.',
          stock: 1
        }
      ]
    
    return items;

  }, []);

  const [stock, setStock] = useState(items ? items.stock : 0);
  const [productsState, setProductsState] = useState(items);

  if (!items) {
    return <h2 className="text-center text-red-600 mt-16">Producto no encontrado</h2>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE);

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return allProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [allProducts, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleAddToCart = (productId) => {
  setProductsState(prevProducts =>
    prevProducts.map(p => {
      if (p.id === productId && p.stock > 0) {
        return { ...p, stock: p.stock - 1 }; // reducimos stock
      }
      return p;
    })
  );

  const product = productsState.find(p => p.id === productId);
  if (product && product.stock > 0) {
    console.log(`Agregaste 1 unidad de ${product.name} al carrito`);
  }
};


  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Productos</h1>
          <p className="text-muted mb-0">Explora nuestra selección cuidadosamente curada.</p>
        </div>
        <span className="badge text-bg-secondary">{allProducts.length} items</span>
      </div>

      <div className="row g-3 g-md-4">
        {pagedProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-4">
            <div className={`card h-100 ${product.stock === 0 ? 'opacity-50' : ''}`}>
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  loading="lazy"
                  style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h2 className="card-title h6 mb-1 text-muted">{product.brand}</h2>
                <h2 className="card-title h5 mb-1">{product.name}</h2>
                <h3 className="card-title h6 mb-1 text-muted">{product.category}</h3>
                <p className="card-text text-muted mb-2" style={{ minHeight: 48 }}>
                  {product.description}
                </p>

                {product.stock === 0 && (
                  <span className="badge text-bg-danger mb-2">Agotado</span>
                )}

                <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="price h6 mb-0">${product.price}</span>
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={product.stock === 0}
                        >
                          {product.stock === 0 ? 'No disponible' : 'Añadir al carrito'}
                        </button>

                        <button onClick={() => handleAddToCart(product.id)}>Agregar al carrito</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Anterior">
              &laquo;
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Siguiente">
              &raquo;
            </button>
          </li>
        </ul>
        <div className="text-center text-muted small">Página {currentPage} de {totalPages}</div>
      </nav>
    </div>
  );
}