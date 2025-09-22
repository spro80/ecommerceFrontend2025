import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../../contexts/SEOContext.jsx';
import AuthModal from '../../ui/AuthModal.jsx';
import ContactSection from '../../components/ContactSection.jsx';
import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const { title, description } = useSEO();
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_APP_SITE_URL || '';
  const canonicalHref = baseUrl
    ? `${String(baseUrl).replace(/\/$/, '')}${location.pathname}${location.search || ''}`
    : null;
  const isProductDetailPage = /^\/products\/[^/]+$/.test(location.pathname);
  const isProductsListPage = location.pathname === '/products';
  const isCartPage = location.pathname === '/carrito';
  const isCheckoutPage = location.pathname === '/finalizar-compra';
  const isOrderSuccessPage = location.pathname === '/confirmacion-pedido';

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:locale" content="es_ES" />
        {canonicalHref && <link rel="canonical" href={canonicalHref} />}
      </Helmet>
      <Header />
      <main id="main" tabIndex="-1" className="flex-grow-1 py-3" role="main">
        <div className="container">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      {!isProductDetailPage && !isProductsListPage && !isCartPage && !isCheckoutPage && !isOrderSuccessPage && <ContactSection />}
      <Footer />
      <AuthModal />
    </div>
  );
}