import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../../lib/api.js';
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

export default function BlogDetail() {
  const { slug } = useParams();
  const { setTitle, setDescription } = useSEO();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    getBlogPostBySlug(slug)
      .then((data) => {
        if (!mounted) return;
        setPost(data || null);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err?.message || 'Error cargando artículo');
      })
      .finally(() => mounted && setIsLoading(false));
    return () => { mounted = false; };
  }, [slug]);

  useEffect(() => {
    const title = post?.title ? `${post.title} | Mundo Belleza` : 'Blog | Mundo Belleza';
    const description = post?.excerpt || 'Consejos y guías de belleza.';
    setTitle(title);
    setDescription(description);
  }, [post, setTitle, setDescription]);

  if (isLoading) return <div className="text-center text-muted py-5">Cargando…</div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;
  if (!post) return <div className="text-center text-muted py-5">Artículo no encontrado.</div>;

  return (
    <article className="blog-post">
      {post.coverImage && (
        <section className="blog-post-hero rounded-3 overflow-hidden position-relative mb-4">
          <div className="ratio ratio-21x9 d-none d-md-block">
            <img src={post.coverImage} alt="" className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="ratio ratio-16x9 d-block d-md-none">
            <img src={post.coverImage} alt="" className="w-100 h-100 object-fit-cover" />
          </div>
          <div className="hero-overlay" aria-hidden="true" />
          <div className="position-absolute bottom-0 start-0 end-0 p-3 p-md-4">
            <h1 className="h3 h-md-2 text-white mb-2">{post.title}</h1>
            <div className="small text-white-50 d-flex flex-wrap gap-2">
              <span>{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readingMinutes} min</span>
            </div>
          </div>
        </section>
      )}

      {!post.coverImage && (
        <header className="mb-3">
          <h1 className="h3 h-md-2">{post.title}</h1>
          <div className="small text-muted d-flex flex-wrap gap-2">
            <span>{post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingMinutes} min</span>
          </div>
        </header>
      )}

      <div className="blog-content card p-3 p-md-4 shadow-sm">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <footer className="mt-4 d-flex flex-wrap gap-2 align-items-center">
        {(post.tags || []).map((tg) => (
          <Link key={tg} to={`/blog?tag=${encodeURIComponent(String(tg).toLowerCase())}`} className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1">#{tg}</Link>
        ))}
      </footer>
    </article>
  );
}