import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
// Removed local data import. Data now comes from mock API.

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetch(`/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Error al cargar el producto');
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch((err) => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <h2 className="text-center text-gray-600 mt-16 text-2xl font-semibold">Cargando...</h2>;
  }

  if (error || !product) {
    return <h2 className="text-center text-red-600 mt-16 text-2xl font-semibold">Producto no encontrado</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 bg-offwhite rounded-3xl shadow-2xl mt-12">
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* IMAGEN */}
        <div className="lg:w-1/2 relative flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className={`rounded-3xl shadow-xl object-cover w-full max-w-md transition-transform duration-300 hover:scale-105 ${
              product.stock === 0 ? 'opacity-50' : ''
            }`}
          />
          {product.stock === 0 && (
            <span className="absolute top-4 left-4 px-4 py-1 bg-red-600 text-white font-bold rounded-full shadow-lg text-sm">
              AGOTADO
            </span>
          )}
        </div>

        {/* INFORMACIÓN */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          {/* Nombre */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 leading-tight">{product.name}</h1>

          {/* Categoría y Subcategoría */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="bg-jade text-white px-3 py-1 rounded-full text-sm font-semibold shadow">{product.category}</span>
            <span className="bg-gold text-black px-3 py-1 rounded-full text-sm font-semibold shadow">{product.subcategory}</span>
          </div>

          {/* Descripción */}
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          {/* Precio y Botón */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <span className="text-4xl font-bold text-gold mb-4 sm:mb-0">${product.price.toFixed(2)}</span>
            <button
              className={`px-8 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300
                ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-gold text-black hover:bg-[#c09d31]'}
              `}
              disabled={product.stock === 0}
              onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, 1)}
            >
              {product.stock === 0 ? 'No disponible' : 'Agregar al carrito'}
            </button>
          </div>

          {/* Indicador de stock (opcional debajo del botón) */}
          {product.stock > 0 && (
            <span className="mt-4 text-sm text-jade font-semibold">En stock: {product.stock} unidades</span>
          )}
        </div>
      </div>
    </div>
  );
}
