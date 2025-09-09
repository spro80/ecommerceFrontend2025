import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleNewsletterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') || '').trim();
    if (!email) {
      return;
    }
    // Placeholder: integrate with a newsletter provider here
    // Keeping UX feedback minimal to avoid intrusive alerts
    event.currentTarget.reset();
  };

  return (
    <footer className="footer mt-auto">
      <div className="footer-top py-5 position-relative overflow-hidden">
        <div className="container position-relative">
          <div className="row g-4 g-lg-5 align-items-start">
            <div className="col-12 col-md-6 col-lg-4">
              <div className="footer-brand">
                <Link to="/" className="brand-name d-inline-flex align-items-center gap-2 fw-bold text-decoration-none">
                  <span className="brand-mark" aria-hidden="true">MB</span>
                  <span>Mundo Belleza</span>
                </Link>
                <p className="brand-copy mt-3 mb-0">
                  Cuidado profesional, resultados reales. Productos de belleza seleccionados con
                  estándares de calidad para tu rutina diaria.
                </p>
                <div className="footer-social mt-3 d-flex gap-2">
                  <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9V12.06h2.54V9.86c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32v7.03C18.34 21.25 22 17.08 22 12.06z"/></svg>
                  </a>
                  <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7.001zM18.5 6a1 1 0 1 1-.001 2.001A1 1 0 0 1 18.5 6z"/></svg>
                  </a>
                  <a className="social-link" href="https://x.com" target="_blank" rel="noreferrer" aria-label="X" title="X">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 3h5.2l4.2 6.4L18.8 3H21l-7.1 8.1L21 21h-5.2l-4.4-6.8L9.2 21H3l7.4-8.4L3 3zm3.6 2 11 14h1.8l-11-14H6.6z"/></svg>
                  </a>
                  <a className="social-link" href="https://wa.me/56989194282" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.03 0C5.5 0 .22 5.28.22 11.8c0 2.08.55 4.1 1.6 5.9L0 24l6.47-1.78a11.8 11.8 0 0 0 5.55 1.41h.01c6.53 0 11.81-5.28 11.81-11.8 0-3.15-1.23-6.11-3.32-8.35zM12.03 21.4h-.01a9.55 9.55 0 0 1-4.86-1.33l-.35-.2-3.84 1.06 1.03-3.74-.23-.38a9.55 9.55 0 0 1-1.48-5.06c0-5.28 4.3-9.58 9.6-9.58 2.56 0 4.96 1 6.77 2.82 1.81 1.81 2.82 4.21 2.82 6.76 0 5.28-4.3 9.58-9.6 9.58zm5.48-7.19c-.29-.15-1.71-.84-1.98-.94-.27-.1-.47-.15-.67.15-.2.29-.77.94-.95 1.13-.18.2-.35.22-.64.07-.29-.15-1.22-.45-2.32-1.45a8.7 8.7 0 0 1-1.62-2.01c-.17-.29-.02-.44.13-.59.13-.13.29-.35.44-.53.15-.2.2-.35.29-.59.09-.22.04-.44-.02-.59-.07-.15-.67-1.62-.91-2.23-.24-.58-.48-.49-.67-.5h-.57c-.2 0-.53.08-.81.37-.29.29-1.1 1.07-1.1 2.6 0 1.53 1.13 3 1.29 3.21.15.2 2.24 3.42 5.41 4.79.76.33 1.36.52 1.82.66.76.24 1.45.2 2 .12.61-.09 1.88-.77 2.14-1.53.27-.76.27-1.41.2-1.53-.09-.13-.27-.2-.55-.35z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">Mapa del sitio</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/products">Productos</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/cart">Carrito</Link></li>
                <li><Link to="/checkout">Pagar</Link></li>
              </ul>
            </div>

            <div className="col-6 col-md-3 col-lg-2">
              <h6 className="footer-title">Soporte</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/preguntas-frecuentes">Preguntas frecuentes</Link></li>
                <li><Link to="/envios-y-devoluciones">Envíos y devoluciones</Link></li>
                <li><Link to="/garantia">Garantía</Link></li>
                <li><a href="#contacto">Contacto</a></li>
              </ul>
            </div>

            <div className="col-12 col-lg-4">
              <h6 className="footer-title">Suscríbete al newsletter</h6>
              <p className="mb-3 text-opacity-75">Ofertas exclusivas, novedades y tips de belleza.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit} noValidate>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    className="form-control"
                    placeholder="Tu email"
                    aria-label="Tu email"
                  />
                  <button type="submit" className="btn btn-primary">
                    Suscribirme
                  </button>
                </div>
                <small className="d-block mt-2 text-muted">Puedes darte de baja en cualquier momento.</small>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom py-3 border-top border-0">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
          <small className="m-0 text-muted">© {new Date().getFullYear()} Mundo Belleza. Todos los derechos reservados.</small>
          <ul className="list-unstyled d-flex gap-3 m-0 footer-bottom-links">
            <li><a href="#privacidad">Política de privacidad</a></li>
            <li><a href="#terminos">Términos y condiciones</a></li>
            <li><a href="#cookies">Política de cookies</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}