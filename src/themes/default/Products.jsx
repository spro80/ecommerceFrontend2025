import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { getProducts } from '../../lib/api.js';



export default function Products() {
  const { addItem } = useCart();
  const PRODUCTS_PER_PAGE = 9;
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedCategory = searchParams.get('category') || '';
  const selectedSubcategoryRaw = searchParams.get('subcategory') || '';
  const selectedSubcategories = useMemo(
    () => selectedSubcategoryRaw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
    [selectedSubcategoryRaw]
  );

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getProducts()
      .then((data) => {
        if (!isMounted) return;
        setAllProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message || 'Error cargando productos');
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const [stock, setStock] = useState(0);

  // Derivar categorías y subcategorías disponibles con contadores
  const categorySummary = useMemo(() => {
    const counts = new Map();
    for (const product of allProducts) {
      const key = (product.category || '').toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const list = Array.from(counts.entries()).map(([key, count]) => ({ key, count }));
    list.sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
    return list;
  }, [allProducts]);

  const subcategorySummary = useMemo(() => {
    if (!selectedCategory) return [];
    const counts = new Map();
    for (const product of allProducts) {
      if ((product.category || '').toLowerCase() !== selectedCategory.toLowerCase()) continue;
      const key = (product.subcategory || '').toLowerCase();
      if (!key) continue;
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    const list = Array.from(counts.entries()).map(([key, count]) => ({ key, count }));
    list.sort((a, b) => b.count - a.count || a.key.localeCompare(b.key));
    return list;
  }, [allProducts, selectedCategory]);

  const toTitle = (str) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedCategory) {
      result = result.filter((p) => (p.category || '').toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes((p.subcategory || '').toLowerCase()));
    }
    return result;
  }, [allProducts, selectedCategory, selectedSubcategories]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

const handleAddToCart = (product) => {
  if (product.stock === 0) return;
  addItem({ id: product.id, name: product.name, price: Number(product.price), image: product.image }, 1);
};

  // Sincronización de filtros con la URL
  const updateSearchParams = (next) => {
    const params = new URLSearchParams(location.search);
    if (Object.prototype.hasOwnProperty.call(next, 'category')) {
      const value = (next.category || '').trim();
      if (value) params.set('category', value); else params.delete('category');
    }
    if (Object.prototype.hasOwnProperty.call(next, 'subcategory')) {
      const value = (next.subcategory || '').trim();
      if (value) params.set('subcategory', value); else params.delete('subcategory');
    }
    const qs = params.toString();
    navigate(qs ? `/products?${qs}` : '/products');
  };

  const handleSelectCategory = (key) => {
    const normalized = (key || '').toLowerCase();
    const isSame = (selectedCategory || '').toLowerCase() === normalized;
    // Toggle: si se hace clic en la categoría activa, limpiar filtros
    if (isSame) {
      updateSearchParams({ category: '', subcategory: '' });
    } else {
      updateSearchParams({ category: normalized, subcategory: '' });
    }
  };

  const handleToggleSubcategory = (key) => {
    const normalized = (key || '').toLowerCase();
    const set = new Set(selectedSubcategories);
    if (set.has(normalized)) set.delete(normalized); else set.add(normalized);
    const value = Array.from(set).join(',');
    updateSearchParams({ subcategory: value });
  };

  // Reiniciar paginación cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [location.search]);


  if (isLoading) {
    return (
      <div className="container py-4">
        <div className="text-center text-muted">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger" role="alert">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Productos</h1>
          <p className="text-muted mb-0">Explora nuestra selección cuidadosamente curada.</p>
          {(selectedCategory || selectedSubcategories.length > 0) && (
            <div className="mt-2 d-flex align-items-center gap-2 flex-wrap">
              {selectedCategory && (
                <span className="badge text-bg-primary">Categoría: {selectedCategory}</span>
              )}
              {selectedSubcategories.length > 0 && (
                <span className="badge text-bg-primary">
                  {selectedSubcategories.length === 1
                    ? `Subcategoría: ${selectedSubcategories[0]}`
                    : `Subcategorías: ${selectedSubcategories.join(', ')}`}
                </span>
              )}
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => navigate('/products', { replace: true })}
              >
                Mostrar todo
              </button>
            </div>
          )}
        </div>
        <span className="badge text-bg-secondary">{filteredProducts.length} items</span>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-3">
        <div className="d-flex align-items-center gap-2 overflow-auto flex-nowrap py-2" role="toolbar" aria-label="Filtrar por categoría">
          <button
            type="button"
            className={`btn btn-sm ${selectedCategory ? 'btn-outline-secondary' : 'btn-primary'}`}
            aria-pressed={!selectedCategory}
            onClick={() => handleSelectCategory('')}
          >
            Todas <span className="badge text-bg-light ms-1">{allProducts.length}</span>
          </button>
          {categorySummary.map((cat) => {
            const active = (selectedCategory || '').toLowerCase() === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                className={`btn btn-sm ${active ? 'btn-primary' : 'btn-outline-secondary'}`}
                aria-pressed={active}
                onClick={() => handleSelectCategory(cat.key)}
              >
                {toTitle(cat.key)} <span className="badge text-bg-light ms-1">{cat.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtros por subcategoría (solo cuando hay categoría seleccionada) */}
      {subcategorySummary.length > 0 && (
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2 overflow-auto flex-nowrap py-1" role="toolbar" aria-label={`Filtrar por subcategoría de ${selectedCategory}`}>
            {subcategorySummary.map((sub) => {
              const active = selectedSubcategories.includes(sub.key);
              return (
                <button
                  key={sub.key}
                  type="button"
                  className={`btn btn-sm ${active ? 'btn-primary' : 'btn-outline-secondary'}`}
                  aria-pressed={active}
                  onClick={() => handleToggleSubcategory(sub.key)}
                >
                  {toTitle(sub.key)} <span className="badge text-bg-light ms-1">{sub.count}</span>
                </button>
              );
            })}
            {selectedSubcategories.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => updateSearchParams({ subcategory: '' })}
              >
                Borrar filtros
              </button>
            )}
          </div>
        </div>
      )}

      <div className="row g-3 g-md-4">
        {pagedProducts.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-4">
            <div className={`card h-100 ${product.stock === 0 ? 'opacity-50' : ''}`}>
              <Link to={`/products/${product.id}`} className="text-decoration-none">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  loading="lazy"
                  style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h2 className="card-title h6 mb-1 text-muted">{product.brand}</h2>
                <h2 className="card-title h5 mb-1">{product.name}</h2>
                <h3 className="card-title h6 mb-1 text-muted">{product.category}</h3>
                <p className="card-text text-muted mb-2" style={{ minHeight: 48 }}>
                  {product.description}
                </p>

                {product.stock === 0 && (
                  <span className="badge text-bg-danger mb-2">Agotado</span>
                )}

                <div className="mt-auto d-flex align-items-center justify-content-between">
                        <span className="price h6 mb-0">${product.price.toFixed(2)}</span>
                        <button
                          className="btn btn-sm btn-primary"
                          disabled={product.stock === 0}
                          onClick={() => handleAddToCart(product)}
                        >
                          {product.stock === 0 ? 'No disponible' : 'Añadir al carrito'}
                        </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Pagination" className="mt-4">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => goToPage(currentPage - 1)} aria-label="Anterior">
              &laquo;
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button className="page-link" onClick={() => goToPage(page)}>{page}</button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => goToPage(currentPage + 1)} aria-label="Siguiente">
              &raquo;
            </button>
          </li>
        </ul>
        <div className="text-center text-muted small">Página {currentPage} de {totalPages}</div>
      </nav>
    </div>
  );
}