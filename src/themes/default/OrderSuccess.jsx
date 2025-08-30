import React, { useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSEO } from '../../contexts/SEOContext.jsx';
import { sendOrderConfirmationEmail, buildOrderEmailPayload } from '../../lib/email.js';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function OrderSuccess() {
  const query = useQuery();
  const navigate = useNavigate();
  const { setTitle, setDescription } = useSEO();

  const orderId = query.get('orderId') || '';

  // Read order info from sessionStorage
  const raw = typeof window !== 'undefined' ? sessionStorage.getItem('last_order') : null;
  const order = raw ? JSON.parse(raw) : null;

  useEffect(() => {
    setTitle('Pedido confirmado');
    setDescription('Resumen de tu compra');
  }, [setTitle, setDescription]);

  useEffect(() => {
    if (!order || !orderId) {
      navigate('/');
    }
  }, [order, orderId, navigate]);

  // Auto-send confirmation email once per order (if email configured)
  useEffect(() => {
    if (!order || !orderId) return;
    const key = `email_sent_for_${orderId}`;
    try {
      const sent = sessionStorage.getItem(key);
      if (sent === '1') return;
    } catch {}

    async function maybeSend() {
      try {
        await sendOrderConfirmationEmail(order);
        try { sessionStorage.setItem(key, '1'); } catch {}
      } catch (err) {
        // Silently ignore to avoid blocking UI; user still has mailto fallback
        // Optionally, we could log to console for debugging
        // console.warn('Email send skipped/failure:', err);
      }
    }

    maybeSend();
  }, [order, orderId]);

  if (!order) return null;

  const { items, totals, customer } = order;

  const emailSubject = encodeURIComponent(`Pedido ${orderId} - Confirmación de compra`);
  const lines = [];
  lines.push(`Hola,`);
  lines.push(' ');
  lines.push(`Por favor preparar el envío para el pedido ${orderId}.`);
  lines.push(' ');
  lines.push('Detalle de productos:');
  items.forEach((it) => {
    const qty = it.quantity || 1;
    const price = Number(it.price || 0);
    lines.push(`- ${it.name} x${qty} - $${(price * qty).toFixed(2)}`);
  });
  lines.push(' ');
  lines.push(`Subtotal: $${Number(totals.subtotal || 0).toFixed(2)}`);
  lines.push(`Envío: $${Number(totals.shipping || 0).toFixed(2)} (${order.shippingMethod === 'express' ? 'Express' : 'Estándar'})`);
  lines.push(`IVA: $${Number(totals.tax || 0).toFixed(2)}`);
  lines.push(`Total: $${Number(totals.total || 0).toFixed(2)}`);
  lines.push(' ');
  lines.push('Datos de envío:');
  lines.push(`${customer.name}`);
  lines.push(`${customer.address}`);
  lines.push(`${customer.city}, ${customer.postalCode}`);
  if (customer.phone) lines.push(`Tel: ${customer.phone}`);
  if (customer.email) lines.push(`Email: ${customer.email}`);
  lines.push(' ');
  lines.push('Gracias');

  const emailBody = encodeURIComponent(lines.join('\n'));
  const mailtoHref = `mailto:${customer.email || ''}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h1 className="h3">¡Gracias por tu compra!</h1>
        <p className="text-muted">Tu número de pedido es <strong>#{orderId}</strong>.</p>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Resumen de compra</h2>
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
                    <div className="small fw-semibold">${((it.price || 0) * (it.quantity || 1)).toFixed(2)}</div>
                  </li>
                ))}
              </ul>

              <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><strong>${Number(totals.subtotal).toFixed(2)}</strong></div>
              <div className="d-flex justify-content-between mb-2"><span>Envío</span><strong>${Number(totals.shipping).toFixed(2)}</strong></div>
              <div className="d-flex justify-content-between mb-2"><span>IVA</span><strong>${Number(totals.tax).toFixed(2)}</strong></div>
              <hr />
              <div className="d-flex justify-content-between"><span>Total</span><strong>${Number(totals.total).toFixed(2)}</strong></div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="h5 mb-3">Acciones</h2>
              <a href={mailtoHref} className="btn btn-primary w-100 mb-2">Preparar correo de confirmación</a>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  navigator.clipboard.writeText(decodeURIComponent(emailBody));
                }}
              >Copiar detalle</button>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h2 className="h5 mb-3">Datos de envío</h2>
              <div className="small">{customer.name}</div>
              <div className="small">{customer.address}</div>
              <div className="small">{customer.city}, {customer.postalCode}</div>
              {customer.email && <div className="small">{customer.email}</div>}
              {customer.phone && <div className="small">{customer.phone}</div>}
            </div>
          </div>

          <div className="d-grid mt-3">
            <Link to="/products" className="btn btn-link">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

