export const posts = [
  {
    id: 'rutina-cabello-2025',
    slug: 'rutina-de-cuidado-del-cabello-2025',
    title: 'Rutina de cuidado del cabello 2025: guía experta',
    excerpt: 'Pasos clave y productos recomendados para un cabello saludable este año.',
    coverImage: '/images/categories/cabello_1024x1024.png',
    author: 'Equipo Mundo Belleza',
    date: '2025-01-20',
    tags: ['cabello', 'rutina', 'tips'],
    readingMinutes: 6,
    content: `
      <p>Un cabello saludable comienza con una rutina simple, constante y adaptada a tu tipo de cabello.</p>
      <h3>1) Limpieza consciente</h3>
      <p>Elige un shampoo acorde a tus necesidades (fuerza, hidratación o control de frizz).</p>
      <h3>2) Acondicionamiento y mascarillas</h3>
      <p>Aplica acondicionador de medios a puntas y usa mascarillas 1-2 veces por semana.</p>
      <h3>3) Protección térmica</h3>
      <p>Si usas calor, nunca olvides un protector térmico.</p>
    `
  },
  {
    id: 'aceites-capilares',
    slug: 'como-usar-aceites-capilares-sin-grasa',
    title: 'Cómo usar aceites capilares sin sensación grasa',
    excerpt: 'Técnicas y cantidades para nutrir el cabello con acabado ligero y brillante.',
    coverImage: '/assets/products/CAB-ACE-001.svg',
    author: 'María Estilista',
    date: '2025-01-12',
    tags: ['aceites', 'nutricion', 'brillo'],
    readingMinutes: 4,
    content: `
      <p>El truco está en la cantidad y el punto de aplicación.</p>
      <ul>
        <li>Empieza con 1-2 gotas para cabello fino.</li>
        <li>Frótalas en las palmas y aplica en medios y puntas.</li>
        <li>Aumenta gradualmente según densidad y largo.</li>
      </ul>
    `
  },
  {
    id: 'ofertas-enero',
    slug: 'ofertas-de-enero-y-combos-recomendados',
    title: 'Ofertas de enero y combos recomendados',
    excerpt: 'Seleccionamos packs con la mejor relación precio/beneficio para tu rutina.',
    coverImage: '/images/categories/ofertas.svg',
    author: 'Equipo Mundo Belleza',
    date: '2025-01-05',
    tags: ['ofertas', 'combos'],
    readingMinutes: 3,
    content: `
      <p>Aprovecha descuentos por tiempo limitado en líneas de hidratación, reparación y styling.</p>
    `
  }
];

export function getAllPosts() {
  return posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug);
}

