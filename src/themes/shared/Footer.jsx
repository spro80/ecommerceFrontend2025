import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <h5>Sitemap</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/products">Productos</Link></li>
              <li><Link to="/cart">Carrito</Link></li>
              <li><Link to="/checkout">Checkout</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled d-flex gap-3">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a></li>
            </ul>
            <small className="text-muted">© {new Date().getFullYear()} eCommerce</small>
          </div>
        </div>
      </div>
    </footer>
  );
}