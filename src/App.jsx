import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './themes/shared/Layout.jsx';
import Home from './themes/default/Home.jsx';
import Products from './themes/default/Products.jsx';
import ProductDetail from './themes/default/ProductDetail.jsx';
import Cart from './themes/default/Cart.jsx';
import Checkout from './themes/default/Checkout.jsx';
import OrderSuccess from './themes/default/OrderSuccess.jsx';
import Blog from './themes/default/Blog.jsx';
import BlogDetail from './themes/default/BlogDetail.jsx';
import PreguntasFrecuentes from './themes/default/PreguntasFrecuentes.jsx';
import EnviosYDevoluciones from './themes/default/EnviosYDevoluciones.jsx';
import Garantia from './themes/default/Garantia.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/finalizar-compra" element={<Checkout />} />
        <Route path="/confirmacion-pedido" element={<OrderSuccess />} />
        {/* Redirecciones desde rutas antiguas (client-side) */}
        <Route path="/cart" element={<Navigate to="/carrito" replace />} />
        <Route path="/checkout" element={<Navigate to="/finalizar-compra" replace />} />
        <Route path="/order/success" element={<Navigate to="/confirmacion-pedido" replace />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/envios-y-devoluciones" element={<EnviosYDevoluciones />} />
        <Route path="/garantia" element={<Garantia />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
