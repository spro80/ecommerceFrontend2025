import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSEO } from '../../contexts/SEOContext.jsx';

export default function Home() {
  const { t } = useTranslation();
  const { setTitle, setDescription } = useSEO();

  useEffect(() => {
    setTitle('Mundo Belleza — Inicio');
    setDescription('Descubre nuestra colección de productos profesionales para el cuidado del cabello, accesorios y ofertas especiales.');
  }, [setTitle, setDescription]);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero position-relative overflow-hidden rounded-4 p-4 p-md-5 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6">
            <h1 className="display-5 fw-bold mb-3 text-white">
              {t('home.heroTitle')}
            </h1>
            <p className="lead text-white-50 mb-4">
              {t('home.heroSubtitle')}
            </p>
            <div className="d-flex gap-2">
              <Link to="/products" className="btn btn-primary btn-lg">{t('home.cta')}</Link>
              <Link to="/blog" className="btn btn-outline-light btn-lg">Blog</Link>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="hero-gallery rounded-4 shadow-lg">
              <div className="gallery-grid">
                <Link to="/products?category=cabello" className="gallery-card item-a" aria-label="Explorar productos de Cabello">
                  <img src="/images/categories/cabello_1024x1024.png" alt="Colección Cabello" loading="eager" />
                  <span className="gallery-label">Cabello</span>
                </Link>
                <Link to="/products?category=tazon&subcategory=schopero" className="gallery-card item-b" aria-label="Explorar Tazones">
                  <img src="/images/categories/tazones_600x600.png" alt="Colección Tazones" loading="lazy" />
                  <span className="gallery-label">Tazones</span>
                </Link>
                <Link to="/products?category=accesorios" className="gallery-card item-c" aria-label="Explorar Accesorios">
                  <img src="/images/categories/accesorios.svg" alt="Accesorios" loading="lazy" />
                  <span className="gallery-label">Accesorios</span>
                </Link>
                <Link to="/products?category=ofertas" className="gallery-card item-d" aria-label="Ver Ofertas">
                  <img src="/images/categories/ofertas.svg" alt="Ofertas especiales" loading="lazy" />
                  <span className="gallery-label">Ofertas</span>
                </Link>
                <Link to="/products?category=cabello&subcategory=aceite" className="gallery-card item-e" aria-label="Explorar Aceites capilares">
                  <img src="/images/categories/cabello.svg" alt="Aceites capilares" loading="lazy" />
                  <span className="gallery-label">Aceites</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bg" aria-hidden="true" />
      </section>

      {/* Categorías destacadas */}
      <section className="mb-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="h4 mb-0">Categorías destacadas</h2>
          <Link to="/products" className="btn btn-sm btn-outline-secondary">Ver todo</Link>
        </div>
        <div className="row g-3 g-md-4">
          {[
            { title: 'Cabello', slug: 'cabello', image: '/images/categories/cabello_600x600.png', query: 'category=cabello&subcategory=shampoo,conditioner' },
            { title: 'Tazones', slug: 'tazones', image: '/images/categories/tazones_600x600.png', query: 'category=tazon&subcategory=schopero' },
            { title: 'Aceites Capilares', slug: 'aceites capilares', image: '/images/categories/aceites_capilares_600x600.png', query: 'category=cabello&subcategory=aceite' }
          ].map((cat) => (
            <div key={cat.slug} className="col-12 col-md-4">
              <Link to={`/products?${cat.query}`} className="text-decoration-none">
                <div className="card category-card h-100 overflow-hidden">
                  <img src={cat.image} className="card-img-top" alt={cat.title} loading="lazy" style={{ objectFit: 'contain', aspectRatio: '4 / 3', backgroundColor: '#fff' }} />
                  <div className="card-img-overlay d-flex align-items-end p-0">
                    <div className="w-100 p-3 category-overlay">
                      <h3 className="h5 mb-0 text-white">{cat.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}