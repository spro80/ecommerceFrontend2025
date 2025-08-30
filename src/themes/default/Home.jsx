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
            <div id="homeHeroCarousel" className="carousel slide rounded-4 shadow-lg" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#homeHeroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#homeHeroCarousel" data-bs-slide-to="1" aria-label="Slide 2" />
                <button type="button" data-bs-target="#homeHeroCarousel" data-bs-slide-to="2" aria-label="Slide 3" />
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src="https://picsum.photos/seed/mb-hero-1/1200/600" className="d-block w-100" alt="Colección premium 1" style={{ objectFit: 'cover', aspectRatio: '2 / 1' }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Lujo que cuida</h5>
                    <p>Fórmulas profesionales para resultados visibles.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://picsum.photos/seed/mb-hero-2/1200/600" className="d-block w-100" alt="Colección premium 2" style={{ objectFit: 'cover', aspectRatio: '2 / 1' }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Rituales de belleza</h5>
                    <p>Todo para tu rutina de cabello y estilo.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="https://picsum.photos/seed/mb-hero-3/1200/600" className="d-block w-100" alt="Colección premium 3" style={{ objectFit: 'cover', aspectRatio: '2 / 1' }} />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Ofertas especiales</h5>
                    <p>Descubre combos y promociones por tiempo limitado.</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#homeHeroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Siguiente</span>
              </button>
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
            { title: 'Cabello', slug: 'cabello', image: '/images/categories/cabello.svg' },
            { title: 'Accesorios', slug: 'accesorios', image: '/images/categories/accesorios.svg' },
            { title: 'Ofertas', slug: 'ofertas', image: '/images/categories/ofertas.svg' }
          ].map((cat) => (
            <div key={cat.slug} className="col-12 col-md-4">
              <Link to={`/products/${cat.slug}`} className="text-decoration-none">
                <div className="card category-card h-100 overflow-hidden">
                  <img src={cat.image} className="card-img-top" alt={cat.title} loading="lazy" style={{ objectFit: 'cover', aspectRatio: '4 / 3' }} />
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