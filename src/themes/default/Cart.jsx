import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { formatCLP } from '../shared/format.js';

export default function Cart() {
  const {
    items,
    cartItemsCount,
    cartSubtotal,
    clearCart,
    incrementItem,
    decrementItem,
    updateQuantity,
    removeItem,
  } = useCart();

  const formatCurrency = (value) => formatCLP(value);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h1 className="h3 mb-1">Carrito</h1>
          <p className="text-muted mb-0">{cartItemsCount} {cartItemsCount === 1 ? 'artículo' : 'artículos'}</p>
        </div>
        {items.length > 0 && (
          <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Vaciar carrito</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-3">Tu carrito está vacío.</p>
          <Link className="btn btn-primary" to="/products">Explorar productos</Link>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="list-group">
              {items.map((it) => (
                <div key={it.id} className="list-group-item p-3">
                  <div className="d-flex align-items-start gap-3">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="rounded"
                      style={{ width: 96, height: 96, objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <div className="fw-semibold">{it.name}</div>
                          <div className="text-muted small">Precio: {formatCurrency(Number(it.price || 0))}</div>
                        </div>
                        <div className="text-end">
                          <div className="fw-semibold">{formatCurrency(Number(it.price || 0) * (it.quantity || 1))}</div>
                          <div className="text-muted small">Subtotal</div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center mt-3 gap-2">
                        <div
                          className="input-group input-group-sm"
                          role="group"
                          aria-label={`Cambiar cantidad para ${it.name}`}
                          style={{ maxWidth: 180 }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => decrementItem(it.id)}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="form-control text-center cart-qty-input"
                            min={1}
                            value={it.quantity || 1}
                            onChange={(e) => {
                              const next = parseInt(e.target.value, 10);
                              updateQuantity(it.id, Number.isFinite(next) ? next : 1);
                            }}
                            aria-label="Cantidad"
                          />
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => incrementItem(it.id)}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-link text-danger ms-2"
                          onClick={() => removeItem(it.id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="h5 mb-3">Resumen</h2>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <strong>{formatCurrency(cartSubtotal)}</strong>
                </div>
                <div className="text-muted small mb-3">El envío y los impuestos se calculan al finalizar la compra.</div>
                <Link to="/finalizar-compra" className="btn btn-primary w-100">Proceder al pago</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}