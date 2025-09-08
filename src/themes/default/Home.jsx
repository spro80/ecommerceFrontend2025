import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../../contexts/SEOContext.jsx';

export default function Home() {
  const { setTitle, setDescription } = useSEO();
  const scrollRef = useRef(null);

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setTitle('Mundo Belleza — Inicio');
    setDescription('Descubre nuestra colección de productos profesionales para el cuidado del cabello, accesorios y ofertas especiales.');
  }, [setTitle, setDescription]);

  const categories = [
    { title: 'Cabello', slug: 'cabello', image: '/images/categories/cabello_600x600.png', link: '/products?category=cabello' },
    { title: 'Tazones', slug: 'tazones', image: '/images/categories/tazones_600x600.png', link: '/products?category=tazon&subcategory=schopero' },
    { title: 'Accesorios', slug: 'accesorios', image: '/images/categories/accesorios.svg', link: '/products?category=accesorios' },
    { title: 'Ofertas', slug: 'ofertas', image: '/images/categories/ofertas.svg', link: '/products?category=ofertas' }
  ];

  return (
    <div className="home-page">
      <section className="mb-4 category-carousel">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h2 className="h5 mb-0">Categorías</h2>
          <Link to="/products" className="btn btn-sm btn-outline-secondary">Ver todo</Link>
        </div>
        <div className="position-relative">
          <button type="button" className="btn btn-light btn-sm carousel-btn prev" aria-label="Anterior" onClick={handlePrev}>
            ‹
          </button>
          <div ref={scrollRef} className="category-scroll" role="region" aria-label="Carrusel de categorías">
            {categories.map((cat) => (
              <div key={cat.slug} className="carousel-item-card">
                <Link to={cat.link} className="text-decoration-none d-block">
                  <div className="card h-100 overflow-hidden">
                    <div className="p-2 bg-white">
                      <img src={cat.image} alt={cat.title} loading="lazy" className="w-100" style={{ height: '120px', objectFit: 'contain' }} />
                    </div>
                    <div className="p-2 text-center">
                      <span className="small fw-semibold text-dark">{cat.title}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-light btn-sm carousel-btn next" aria-label="Siguiente" onClick={handleNext}>
            ›
          </button>
        </div>
      </section>
    </div>
  );
}