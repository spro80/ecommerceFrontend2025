import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h1 className="h3 mb-2">Administración</h1>
        <p className="text-muted m-0">Gestiona el catálogo y el inventario.</p>
      </div>

      <div className="row g-3 g-md-4">
        <div className="col-12 col-md-6">
          <Link to="/admin/products/new" className="text-decoration-none">
            <div className="card card-hover-lift" style={{ borderRadius: '1rem' }}>
              <div className="card-body d-flex align-items-center" style={{ minHeight: 120 }}>
                <div className="me-3" style={{ width: 56, height: 56, borderRadius: 12, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--color-gold), #c09d31)', color: '#1E1E1E', fontWeight: 800 }}>+
                </div>
                <div>
                  <h2 className="h5 m-0">Crear producto</h2>
                  <p className="text-muted m-0">Agrega nuevos productos al catálogo.</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-md-6">
          <div className="card" style={{ borderRadius: '1rem', opacity: .75 }}>
            <div className="card-body d-flex align-items-center" style={{ minHeight: 120 }}>
              <div className="me-3" style={{ width: 56, height: 56, borderRadius: 12, display: 'grid', placeItems: 'center', backgroundColor: 'var(--color-jade)', color: '#fff', fontWeight: 800 }}>ℹ️</div>
              <div>
                <h2 className="h5 m-0">Gestión de inventario</h2>
                <p className="text-muted m-0">Próximamente: ver/editar stock por sucursal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

