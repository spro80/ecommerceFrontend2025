import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../../lib/api.js';

function toTitle(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getProducts()
      .then((data) => {
        if (!isMounted) return;
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || 'Error cargando contenido');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const map = new Map();
    for (const product of allProducts) {
      const key = String(product.category || '').toLowerCase();
      if (!key) continue;
      if (!map.has(key)) {
        map.set(key, { key, count: 0, image: product.image });
      }
      const entry = map.get(key);
      entry.count += 1;
      // Mantener la primera imagen como representativa
    }
    const list = Array.from(map.values());
    list.sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
    return list;
  }, [allProducts]);

  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listId = 'category-carousel';

  const updateScrollButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateScrollButtons();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [categories.length]);

  const scrollByAmount = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.85);
    const next = direction === 'left' ? -amount : amount;
    el.scrollBy({ left: next, behavior: 'smooth' });
  };

  return (
    <div className="container py-4">
      <section className="text-center p-4 p-md-5 bg-light rounded-3 mb-4">
        <h1 className="h3 h-md-2 mb-2">Cuidado profesional, resultados reales</h1>
        <p className="text-muted mb-3 mb-md-4">Descubre productos seleccionados para tu rutina diaria.</p>
        <Link to="/products" className="btn btn-primary btn-lg">Ver todos los productos</Link>
      </section>

      {isLoading && (
        <div className="text-center text-muted py-5">Cargando categorías…</div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {!isLoading && !error && categories.length > 0 && (
        <section aria-labelledby="home-categories-title" className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <h2 id="home-categories-title" className="h5 m-0">Explora por categoría</h2>
            <Link to="/products" className="btn btn-sm btn-outline-secondary">Ver todo</Link>
          </div>

          <div className="position-relative">
            <button
              type="button"
              className="btn btn-light border position-absolute top-50 start-0 translate-middle-y z-1 d-none d-md-inline-flex"
              aria-label="Desplazar categorías a la izquierda"
              aria-controls={listId}
              disabled={!canScrollLeft}
              onClick={() => scrollByAmount('left')}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
            >
              ‹
            </button>
            <button
              type="button"
              className="btn btn-light border position-absolute top-50 end-0 translate-middle-y z-1 d-none d-md-inline-flex"
              aria-label="Desplazar categorías a la derecha"
              aria-controls={listId}
              disabled={!canScrollRight}
              onClick={() => scrollByAmount('right')}
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }}
            >
              ›
            </button>

            <div
              id={listId}
              ref={scrollerRef}
              className="d-flex gap-3 overflow-auto flex-nowrap py-2 px-1"
              role="list"
              aria-label="Carrusel de categorías"
              style={{ scrollBehavior: 'smooth' }}
            >
              {categories.map((cat) => (
                <div key={cat.key} role="listitem" className="flex-shrink-0" style={{ minWidth: 200, maxWidth: 280 }}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.key)}`}
                    className="text-decoration-none"
                    aria-label={`Ver ${toTitle(cat.key)} (${cat.count})`}
                  >
                    <div className="card h-100 shadow-sm" style={{ width: '100%' }}>
                      <div className="position-relative" style={{ aspectRatio: '4 / 3' }}>
                        <img
                          src={cat.image}
                          alt={toTitle(cat.key)}
                          loading="lazy"
                          className="w-100 h-100"
                          style={{ objectFit: 'cover', borderTopLeftRadius: '.375rem', borderTopRightRadius: '.375rem' }}
                        />
                        <span className="badge text-bg-primary position-absolute top-0 end-0 m-2">{cat.count}</span>
                      </div>
                      <div className="card-body">
                        <h3 className="h6 m-0">{toTitle(cat.key)}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}