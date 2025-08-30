import { http, HttpResponse } from 'msw';
import { products } from '../data/products.js';

export const handlers = [
  http.get('/api/products', async () => {
    return HttpResponse.json(products);
  }),

  http.get('/api/products/:id', async ({ params }) => {
    const { id } = params;
    const product = products.find((p) => p.id === id);
    if (!product) {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json(product);
  })
];

