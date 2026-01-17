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
    // Contabilizar productos por categoría
    const counts = new Map();
    for (const product of allProducts) {
      const key = String(product.category || '').toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }

    // Definir solo las dos categorías visibles en HOME con sus imágenes públicas
    const predefined = [
      { key: 'cabello', image: '/assets/categories/cabello_600x600.png' },
      { key: 'tazon', image: '/assets/categories/tazones_600x600.png' },
      { key: 'souvenirs', image: '/assets/categories/souvenirs_600x600.png' },
    ];

    // Enriquecer con conteos actuales
    return predefined.map((item) => ({
      key: item.key,
      image: item.image,
      count: counts.get(item.key) || 0,
    }));
  }, [allProducts]);

  const scrollerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listId = 'category-carousel';
  const autoplayTimerRef = useRef(null);
  const interactionPauseTimerRef = useRef(null);
  const [isAutoplayOn, setIsAutoplayOn] = useState(false);
  const [isPausedByInteraction, setIsPausedByInteraction] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Track desktop viewport
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Track reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(!!mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // Autoplay logic (desktop only, off by default, respects reduced-motion, pauses on interaction)
  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    const canRun = isAutoplayOn && isDesktop && !prefersReducedMotion && categories.length > 0 && !isPausedByInteraction;
    if (!canRun) return;
    autoplayTimerRef.current = setInterval(() => {
      // Advance right; if at end, jump to start for an infinite loop feel
      const el = scrollerRef.current;
      if (!el) return;
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      if (el.scrollLeft >= maxScrollLeft - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollByAmount('right');
      }
    }, 5000); // slow interval for readability
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [isAutoplayOn, isDesktop, prefersReducedMotion, isPausedByInteraction, categories.length]);

  const handleUserInteraction = () => {
    setIsPausedByInteraction(true);
    if (interactionPauseTimerRef.current) {
      clearTimeout(interactionPauseTimerRef.current);
      interactionPauseTimerRef.current = null;
    }
    // Resume after brief inactivity, only if autoplay remains enabled and no hover/focus
    interactionPauseTimerRef.current = setTimeout(() => {
      setIsPausedByInteraction(false);
    }, 4000);
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
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className={`btn btn-sm ${isAutoplayOn ? 'btn-primary' : 'btn-outline-secondary'} d-none d-md-inline-flex`}
                aria-pressed={isAutoplayOn}
                aria-label={isAutoplayOn ? 'Pausar carrusel' : 'Reproducir carrusel'}
                onClick={() => setIsAutoplayOn((v) => !v)}
                title={isAutoplayOn ? 'Pausar carrusel' : 'Reproducir carrusel'}
              >
                {isAutoplayOn ? 'Pausar' : 'Reproducir'}
              </button>
              <Link to="/products" className="btn btn-sm btn-outline-secondary">Ver todo</Link>
            </div>
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
              onMouseEnter={() => setIsPausedByInteraction(true)}
              onMouseLeave={() => setIsPausedByInteraction(false)}
              onFocus={() => setIsPausedByInteraction(true)}
              onBlur={() => setIsPausedByInteraction(false)}
              onPointerDown={handleUserInteraction}
              onWheel={handleUserInteraction}
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