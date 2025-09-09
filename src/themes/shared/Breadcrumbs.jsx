import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

const nameMap = {
  '': 'Inicio',
  products: 'Productos',
  cart: 'Carrito',
  checkout: 'Pagar',
  blog: 'Blog',
  'preguntas-frecuentes': 'Preguntas frecuentes',
  'envios-y-devoluciones': 'Envíos y devoluciones',
  'garantia': 'Garantía',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    const name = nameMap[segment] || segment;
    return { path, name, isLast };
  });

  // Root crumb
  const allCrumbs = [{ path: '/', name: nameMap[''], isLast: segments.length === 0 }, ...crumbs];

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {allCrumbs.map((c, idx) => (
          <li key={idx} className={`breadcrumb-item ${c.isLast ? 'active' : ''}`} aria-current={c.isLast ? 'page' : undefined}>
            {c.isLast ? (
              <span>{c.name}</span>
            ) : (
              <Link to={c.path}>{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}