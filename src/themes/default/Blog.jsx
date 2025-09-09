import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getBlogPosts } from '../../lib/api.js';
import { useSEO } from '../../contexts/SEOContext.jsx';

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

export default function Blog() {
  const { t } = useTranslation();
  const { setTitle, setDescription } = useSEO();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const q = (searchParams.get('q') || '').toLowerCase();
  const tag = (searchParams.get('tag') || '').toLowerCase();

  useEffect(() => {
    setTitle('Blog | Mundo Belleza');
    setDescription('Consejos, tendencias y guías expertas para tu rutina de belleza.');
  }, [setTitle, setDescription]);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getBlogPosts()
      .then((data) => {
        if (!mounted) return;
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Error cargando blog');
      })
      .finally(() => mounted && setIsLoading(false));
    return () => { mounted = false; };
  }, []);

  const allTags = useMemo(() => {
    const set = new Set();
    for (const p of posts) (p.tags || []).forEach((x) => set.add(String(x).toLowerCase()));
    return Array.from(set).sort();
  }, [posts]);

  const filtered = useMemo(() => {
    let list = posts.slice();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.excerpt, (p.author || ''), (p.tags || []).join(' ')]
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }
    if (tag) {
      list = list.filter((p) => (p.tags || []).map((x) => String(x).toLowerCase()).includes(tag));
    }
    return list;
  }, [posts, q, tag]);

  const [featured, ...rest] = filtered;

  const updateParam = (next) => {
    const current = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...current, ...next });
  };

  return (
    <div className="blog-page">
      <section className="blog-hero rounded-3 p-4 p-md-5 mb-4 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 blog-hero-bg" aria-hidden="true" />
        <div className="position-relative">
          <h1 className="h3 h-md-2 mb-2">{t('blog.title')}</h1>
          <p className="text-muted mb-0">Consejos, tendencias y guías expertas para tu rutina.</p>
        </div>
      </section>

      <div className="row g-3 align-items-center mb-3">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">🔎</span>
            <input
              type="search"
              className="form-control"
              placeholder="Buscar artículos, temas o autores"
              value={q}
              onChange={(e) => updateParam({ q: e.target.value })}
              aria-label="Buscar"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className={`btn btn-sm ${!tag ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => updateParam({ tag: '' })}
            >
              Todas las etiquetas
            </button>
            {allTags.map((t) => (
              <button
                key={t}
                type="button"
                className={`btn btn-sm ${tag === t ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => updateParam({ tag: t })}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading && <div className="text-center text-muted py-5">Cargando artículos…</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="text-center text-muted py-5">No encontramos resultados.</div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <>
          {featured && (
            <section className="mb-4">
              <Link to={`/blog/${featured.slug}`} className="text-decoration-none">
                <article className="card blog-featured shadow-sm overflow-hidden">
                  <div className="row g-0 align-items-stretch">
                    <div className="col-12 col-md-6">
                      <div className="ratio ratio-16x9 h-100">
                        <img src={featured.coverImage} alt={featured.title} className="w-100 h-100 object-fit-cover" loading="lazy" />
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="card-body">
                        <span className="badge text-bg-primary mb-2">Destacado</span>
                        <h2 className="h4 card-title">{featured.title}</h2>
                        <p className="card-text text-muted">{featured.excerpt}</p>
                        <div className="small text-muted d-flex flex-wrap gap-2 align-items-center">
                          <span>{featured.author}</span>
                          <span>•</span>
                          <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                          <span>•</span>
                          <span>{featured.readingMinutes} min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {rest.length > 0 && (
            <section className="mb-4">
              <div className="row g-3">
                {rest.map((p) => (
                  <div className="col-12 col-md-6 col-lg-4" key={p.slug}>
                    <article className="card h-100 blog-card">
                      <Link to={`/blog/${p.slug}`} className="text-decoration-none">
                        <div className="ratio ratio-16x9">
                          <img src={p.coverImage} alt={p.title} className="w-100 h-100 object-fit-cover" loading="lazy" />
                        </div>
                      </Link>
                      <div className="card-body d-flex flex-column">
                        <Link to={`/blog/${p.slug}`} className="text-decoration-none">
                          <h3 className="h6 card-title mb-2">{p.title}</h3>
                        </Link>
                        <p className="card-text text-muted flex-grow-1">{p.excerpt}</p>
                        <div className="d-flex flex-wrap gap-2 small text-muted mt-2">
                          <time dateTime={p.date}>{formatDate(p.date)}</time>
                          <span>•</span>
                          <span>{p.readingMinutes} min</span>
                        </div>
                        <div className="mt-2 d-flex flex-wrap gap-1">
                          {(p.tags || []).slice(0, 3).map((tg) => (
                            <button key={tg} type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"
                              onClick={() => updateParam({ tag: String(tg).toLowerCase() })}
                              aria-label={`Filtrar por ${tg}`}
                            >
                              #{tg}
                            </button>
                          ))}
                        </div>
                        <div className="mt-3">
                          <Link to={`/blog/${p.slug}`} className="btn btn-link p-0">{t('blog.readMore')} →</Link>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}