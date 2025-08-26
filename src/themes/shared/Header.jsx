import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext.jsx';
import { useUser } from '../../contexts/UserContext.jsx';

export default function Header() {
  const { t } = useTranslation();
  const { cartItemsCount } = useCart();
  const { user, openAuthModal, logout } = useUser();

  return (
    <nav className="navbar navbar-expand-lg" role="navigation" aria-label="Main navigation">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          {t('common.siteName')}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" end>
                {t('common.home')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
                {t('common.products')}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link">
                {t('common.blog')}
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <NavLink to="/cart" className="nav-link position-relative">
                {t('common.cart')}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" aria-label={`Items in cart: ${cartItemsCount}`}>
                  {cartItemsCount}
                </span>
              </NavLink>
            </li>
            {!user && (
              <li className="nav-item">
                <button type="button" className="btn btn-outline-primary" onClick={openAuthModal}>
                  {t('common.login')}
                </button>
              </li>
            )}
            {user && (
              <li className="nav-item dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.name || t('common.account')}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={logout}>{t('common.logout')}</button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}