import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { getProductByIdApi } from '../../lib/api.js';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getProductByIdApi(id)
      .then((data) => {
        if (!isMounted) return;
        setProduct(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || 'Error cargando producto');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="text-center text-muted my-5 h4 fw-semibold">Cargando...</div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger my-4" role="alert">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="alert alert-warning my-4" role="alert">Producto no encontrado</div>
    );
  }

  return (
    <section className="product-detail my-3">
      <div className="product-detail-card position-relative p-3 p-md-4 p-lg-5">
        <div className="row g-4 g-lg-5 align-items-start">
          {/* Imagen */}
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-start">
            <div className={`image-frame w-100 ${product.stock === 0 ? 'opacity-75' : ''}`}>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
                loading="eager"
              />
              {product.stock === 0 && (
                <span className="soldout-badge">Agotado</span>
              )}
            </div>
          </div>

          {/* Información */}
          <div className="col-12 col-lg-6 d-flex flex-column">
            <div className="d-flex align-items-center gap-2 mb-2 flex-wrap product-badges">
              <span className="badge badge-jade text-uppercase">{product.category}</span>
              <span className="badge badge-gold text-uppercase">{product.subcategory}</span>
            </div>

            <h1 className="product-title display-6 fw-bold mb-2">{product.name}</h1>
            {product.brand && (
              <div className="text-muted mb-3">Marca: <strong>{product.brand}</strong></div>
            )}

            <p className="product-description lead mb-4">{product.description}</p>

            <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
              <div className="price-highlight">${product.price.toFixed(2)}</div>
              <button
                type="button"
                className="btn btn-primary btn-lg btn-add-cart"
                disabled={product.stock === 0}
                onClick={() => addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image }, 1)}
              >
                {product.stock === 0 ? 'No disponible' : 'Agregar al carrito'}
              </button>
            </div>

            {product.stock > 0 && (
              <small className="stock-indicator mt-3">En stock: {product.stock} unidades</small>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
