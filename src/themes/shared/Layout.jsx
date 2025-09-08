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
  const isProductDetailPage = /^\/products\/[^/]+$/.test(location.pathname);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Header />
      <main id="main" tabIndex="-1" className="flex-grow-1 py-3" role="main">
        <div className="container">
          <Breadcrumbs />
          {children}
        </div>
      </main>
      {!isProductDetailPage && <ContactSection />}
      <Footer />
      <AuthModal />
    </div>
  );
}