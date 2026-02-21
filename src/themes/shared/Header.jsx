import React, { useState, useContext } from 'react';

import { AuthContext } from "./../../contexts/AuthContext";

import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext.jsx';
import { useUser } from '../../contexts/UserContext.jsx';
import { APP_ENVIRONMENT } from '../../lib/config.js';
import LoginRequiredModal from './../../components/Login/LoginRequireModal';

import { useNavigate } from "react-router-dom";


export default function Header() {


  const { t } = useTranslation();
  const { cartItemsCount } = useCart();
  //const { user, openAuthModal, logout } = useUser();
  
  const { userContext, setUserContext } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();



  const handleLogout = () => {
    
    localStorage.removeItem("userLogin");
    setUserContext(null);

  };


  const handleProtectedLink = (e, path) => {

    e.preventDefault();
    
    if (userContext) {
      //history.push(path)
      navigate(push)

    } else {
      //setShowModal(true);
      //history.push('inicio-de-sesion')
      navigate('inicio-de-sesion')

    }
  }

  
  /*
  const categories = [
    {
      name: "Cabello",
      slug: "cabello",
      subcategories: [
        { name: "Shampoo", slug: "shampoo" },
        { name: "Acondicionador", slug: "acondicionador" },
        { name: "Tratamientos", slug: "tratamientos" },
        { name: "Aceites capilares", slug: "aceites" },
        { name: "Mascarillas", slug: "mascarillas" },
        { name: "Ampollas", slug: "ampollas" }
      ]
    },
    {
      name: "Accesorios",
      slug: "accesorios",
      subcategories: [
        { name: "Peines y cepillos", slug: "peines-cepillos" },
        { name: "Tijeras", slug: "tijeras" },
        { name: "Planchas y secadores", slug: "planchas-seca" }
      ]
    },
    {
      name: "Ofertas",
      slug: "ofertas",
      subcategories: [
        { name: "Promociones", slug: "promociones" },
        { name: "Combos", slug: "combos" }
      ]
    }
  ];*/

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

            {/*
            <li className="nav-item">
              <NavLink to="/blog" className="nav-link">
                {t('common.blog')}
              </NavLink>
            </li>
            */}

            {/*
            {(APP_ENVIRONMENT !== 'prod' || user?.role === 'admin') && (
              <li className="nav-item">
                <NavLink to="/admin" className="nav-link">
                  Admin
                </NavLink>
              </li>
            )}
            */}

            {/* <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Categorías
              </button>
              <ul className="dropdown-menu">
                {categories.map(cat => (
                  <li key={cat.slug} className="dropdown-submenu">
                    <NavLink className="dropdown-item" to={`/products/${cat.slug}`}>
                      {cat.name}
                    </NavLink>
                    {cat.subcategories && (
                      <ul className="dropdown-menu">
                        {cat.subcategories.map(sub => (
                          <li key={sub.slug}>
                            <NavLink
                              className="dropdown-item"
                              to={`/products/${cat.slug}/${sub.slug}`}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li> */}




          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-2">
              <NavLink to="/carrito" className="nav-link position-relative">
                {t('common.cart')}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" aria-label={`Artículos en el carrito: ${cartItemsCount}`}>
                  {cartItemsCount}
                </span>
              </NavLink>
            </li>


{/*
            {!user && (
              <li className="nav-item">
                <button type="button" className="btn btn-primary" onClick={openAuthModal}>
                  {t('common.login')}
                </button>
              </li>
            )}
*/}            

            {/*
            {user && (
              <li className="nav-item dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.name || t('common.account')}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  {user?.role === 'admin' && (
                    <li>
                      <Link className="dropdown-item" to="/admin">Panel de administración</Link>
                    </li>
                  )}
                  <li>
                    <button className="dropdown-item" onClick={logout}>{t('common.logout')}</button>
                  </li>
                </ul>
              </li>
            )}
            */}

            {userContext ? (
                <>
                  <li className="nav-item d-flex align-items-center ms-auto me-3">
                    <i className="bi bi-person-circle me-2 text-white"></i>
                    <span className="text-white text-nowrap">👤 {userContext.name}</span>
                  </li>

                  <li className="nav-item d-flex align-items-center ms-auto me-3">
                    <i className="bi bi-person-circle me-2 text-white"></i>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        className="text-white text-nowrap text-decoration-none"
                      >
                        Cerrar sesión
                      </a>

                  </li>

                </>
              ) : (
                <li className="nav-item d-flex align-items-center ms-auto">
                  <i className="bi bi-person me-2 text-white"></i>

                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={() => navigate("/inicio-de-sesion")}
                  >
                    {t('common.login')}
                  </button>
                </li>
              )}


          </ul>
        </div>
      </div>

      <LoginRequiredModal show={showModal} onClose={() => setShowModal(false)} ></LoginRequiredModal>


    </nav>

    
  );
}