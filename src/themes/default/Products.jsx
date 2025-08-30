import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { products as catalog } from '../../data/products.js';



export default function Products() {
  const { addItem } = useCart();
  const PRODUCTS_PER_PAGE = 9;
  const allProducts = useMemo(() => catalog, []);

  const [stock, setStock] = useState(0);

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

const handleAddToCart = (product) => {
  if (product.stock === 0) return;
  addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image }, 1);
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
                        <span className="price h6 mb-0">${product.price.toFixed(2)}</span>
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={product.stock === 0}
                          onClick={() => handleAddToCart(product)}
                        >
                          {product.stock === 0 ? 'No disponible' : 'Añadir al carrito'}
                        </button>
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