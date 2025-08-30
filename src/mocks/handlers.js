import { http, HttpResponse } from 'msw';
import { products } from '../data/products.js';

export const handlers = [
  // External extension: mock user info to avoid noisy 401/HTML responses in dev
  http.get('https://www.ag-translate.com/api/userInfo', () => {
    return HttpResponse.json({ authenticated: false, user: null }, { status: 200 });
  }),
  http.get('https://ag-translate.com/api/userInfo', () => {
    return HttpResponse.json({ authenticated: false, user: null }, { status: 200 });
  }),

  // List all products
  http.get('/api/products', () => {
    return HttpResponse.json(products, { status: 200 });
  }),

  // Get product by id
  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === id);
    if (!product) {
      return HttpResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }
    return HttpResponse.json(product, { status: 200 });
  }),
];

