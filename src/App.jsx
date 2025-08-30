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

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
