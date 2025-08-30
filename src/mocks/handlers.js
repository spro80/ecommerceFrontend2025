import { http, HttpResponse } from 'msw';
import { products } from '../data/products.js';

export const handlers = [
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

