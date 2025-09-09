import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { useUser } from '../../contexts/UserContext.jsx';
import { useSEO } from '../../contexts/SEOContext.jsx';
import PayPalCheckout from '../../ui/PayPalCheckout.jsx';
import { IVA_RATE } from '../../lib/config.js';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartSubtotal, clearCart } = useCart();
  const { user, openAuthModal } = useUser();
  const { setTitle, setDescription } = useSEO();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTitle('Checkout');
    setDescription('Completa tu compra de forma segura.');
  }, [setTitle, setDescription]);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  const shippingCost = useMemo(() => {
    if (form.shippingMethod === 'express') return 4990;
    if (cartSubtotal === 0) return 0;
    return 4990;
  }, [form.shippingMethod, cartSubtotal]);

  const tax = useMemo(() => {
    return Math.round(cartSubtotal * IVA_RATE * 100) / 100;
  }, [cartSubtotal]);

  const total = useMemo(() => {
    return Math.round((cartSubtotal + shippingCost + tax) * 100) / 100;
  }, [cartSubtotal, shippingCost, tax]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Ingresa tu nombre';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) next.email = 'Correo inválido';
    if (!form.phone.trim()) next.phone = 'Ingresa tu teléfono';
    if (!form.address.trim()) next.address = 'Ingresa tu dirección';
    if (!form.city.trim()) next.city = 'Ingresa tu ciudad';
    if (!form.postalCode.trim()) next.postalCode = 'Ingresa tu código postal';

    if (form.paymentMethod === 'card') {
      if (!form.cardNumber.replace(/\s+/g, '').match(/^\d{13,19}$/)) next.cardNumber = 'Número de tarjeta inválido';
      if (!form.cardName.trim()) next.cardName = 'Nombre en la tarjeta requerido';
      if (!form.cardExpiry.match(/^(0[1-9]|1[0-2])\/(\d{2})$/)) next.cardExpiry = 'MM/AA';
      if (!form.cardCvc.match(/^\d{3,4}$/)) next.cardCvc = 'CVC inválido';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function completeOrder(paymentMethodOverride) {
    const paymentMethod = paymentMethodOverride || form.paymentMethod;
    const orderId = Math.random().toString(36).slice(2, 10).toUpperCase();
    const shippingCostSnapshot = (function () {
      if (form.shippingMethod === 'express') return 4990;
      if (cartSubtotal === 0) return 0;
      return 4990;
    })();
    const taxSnapshot = Math.round(cartSubtotal * IVA_RATE * 100) / 100;
    const totalSnapshot = Math.round((cartSubtotal + shippingCostSnapshot + taxSnapshot) * 100) / 100;
    const orderSnapshot = {
      id: orderId,
      items: items.map((it) => ({ id: it.id, name: it.name, price: it.price, quantity: it.quantity, image: it.image })),
      totals: {
        subtotal: cartSubtotal,
        shipping: shippingCostSnapshot,
        tax: taxSnapshot,
        total: totalSnapshot
      },
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        postalCode: form.postalCode
      },
      shippingMethod: form.shippingMethod,
      paymentMethod,
    };
    try {
      sessionStorage.setItem('last_order', JSON.stringify(orderSnapshot));
    } catch {}
    clearCart();
    navigate(`/order/success?orderId=${orderId}`);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await completeOrder(form.paymentMethod);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-5">
        <h1 className="h4 mb-2">Tu carrito está vacío</h1>
        <p className="text-muted mb-4">Agrega productos para continuar al checkout.</p>
        <Link className="btn btn-primary" to="/products">Explorar productos</Link>
      </div>
    );
  }

  return (
    <div className="row g-4 py-2">
      <div className="col-12 col-lg-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h5 mb-0">Información de contacto</h2>
                {!user && (
                  <button type="button" className="btn btn-sm btn-outline-secondary" onClick={openAuthModal}>Iniciar sesión</button>
                )}
              </div>

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label htmlFor="name" className="form-label">Nombre</label>
                  <input id="name" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={form.name} onChange={handleChange} />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input id="email" type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={form.email} onChange={handleChange} />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <input id="phone" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={form.phone} onChange={handleChange} />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Dirección de envío</h2>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="address" className="form-label">Dirección</label>
                  <input id="address" name="address" className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={form.address} onChange={handleChange} />
                  {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="city" className="form-label">Ciudad</label>
                  <input id="city" name="city" className={`form-control ${errors.city ? 'is-invalid' : ''}`} value={form.city} onChange={handleChange} />
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="postalCode" className="form-label">Código postal</label>
                  <input id="postalCode" name="postalCode" className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`} value={form.postalCode} onChange={handleChange} />
                  {errors.postalCode && <div className="invalid-feedback">{errors.postalCode}</div>}
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label">Método de envío</label>
                <div className="d-flex gap-3 flex-wrap">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="shippingMethod" id="shippingStandard" value="standard" checked={form.shippingMethod === 'standard'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="shippingStandard">Estándar (3-5 días) - $4.99</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="shippingMethod" id="shippingExpress" value="express" checked={form.shippingMethod === 'express'} onChange={handleChange} />
                    <label className="form-check-label" htmlFor="shippingExpress">Express (1-2 días) - $9.99</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h2 className="h5 mb-3">Pago</h2>
              <div className="mb-3">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="payCard" value="card" checked={form.paymentMethod === 'card'} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="payCard">Tarjeta</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="payCash" value="cash" checked={form.paymentMethod === 'cash'} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="payCash">Efectivo/Transferencia</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="paymentMethod" id="payPaypal" value="paypal" checked={form.paymentMethod === 'paypal'} onChange={handleChange} />
                  <label className="form-check-label" htmlFor="payPaypal">PayPal</label>
                </div>
              </div>

              {form.paymentMethod === 'card' && (
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="cardNumber" className="form-label">Número de tarjeta</label>
                    <input id="cardNumber" name="cardNumber" inputMode="numeric" className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`} value={form.cardNumber} onChange={handleChange} placeholder="4242 4242 4242 4242" />
                    {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="cardName" className="form-label">Nombre en la tarjeta</label>
                    <input id="cardName" name="cardName" className={`form-control ${errors.cardName ? 'is-invalid' : ''}`} value={form.cardName} onChange={handleChange} />
                    {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                  </div>
                  <div className="col-6 col-md-3">
                    <label htmlFor="cardExpiry" className="form-label">Vencimiento</label>
                    <input id="cardExpiry" name="cardExpiry" className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`} value={form.cardExpiry} onChange={handleChange} placeholder="MM/AA" />
                    {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                  </div>
                  <div className="col-6 col-md-3">
                    <label htmlFor="cardCvc" className="form-label">CVC</label>
                    <input id="cardCvc" name="cardCvc" inputMode="numeric" className={`form-control ${errors.cardCvc ? 'is-invalid' : ''}`} value={form.cardCvc} onChange={handleChange} placeholder="123" />
                    {errors.cardCvc && <div className="invalid-feedback">{errors.cardCvc}</div>}
                  </div>
                </div>
              )}

              {form.paymentMethod === 'paypal' && (
                <div className="mt-2">
                  <div className="text-muted small mb-2">Completa el pago con PayPal:</div>
                  <PayPalCheckout
                    amount={total}
                    currency="USD"
                    onApprove={() => completeOrder('paypal')}
                    onError={() => {}}
                    onCancel={() => {}}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <Link to="/cart" className="btn btn-outline-secondary">Volver al carrito</Link>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting || form.paymentMethod === 'paypal'}>
              {isSubmitting ? 'Procesando…' : 'Confirmar pedido'}
            </button>
          </div>
        </form>
      </div>

      <div className="col-12 col-lg-4">
        <div className="card">
          <div className="card-body">
            <h2 className="h5 mb-3">Resumen del pedido</h2>
            <ul className="list-group list-group-flush mb-3">
              {items.map((it) => (
                <li key={it.id} className="list-group-item px-0 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <img src={it.image} alt={it.name} width="48" height="48" style={{ objectFit: 'cover' }} className="rounded" />
                    <div>
                      <div className="small fw-semibold">{it.name}</div>
                      <div className="text-muted small">Cantidad: {it.quantity || 1}</div>
                    </div>
                  </div>
                  <div className="small fw-semibold">${((it.price || 0) * (it.quantity || 1))}</div>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <strong>${cartSubtotal}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Envío</span>
              <strong>${shippingCost}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>IVA</span>
              <strong>${tax}</strong>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <strong>${total}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}