import React, { useEffect, useRef, useState } from 'react';
import { PAYPAL_CLIENT_ID } from '../lib/config.js';

function loadPayPalSdk(clientId, currency) {
  const existing = document.querySelector('script[data-paypal-sdk]');
  if (existing) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const params = new URLSearchParams({
      'client-id': clientId,
      currency: currency || 'USD',
      intent: 'CAPTURE',
      components: 'buttons',
    });
    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.dataset.paypalSdk = 'true';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar el SDK de PayPal'));
    document.head.appendChild(script);
  });
}

export default function PayPalCheckout({
  amount,
  currency = 'USD',
  onApprove,
  onCancel,
  onError,
  className = '',
  style = { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
}) {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!PAYPAL_CLIENT_ID) {
      setError('Falta VITE_PAYPAL_CLIENT_ID en variables de entorno');
      return;
    }
    let cancelled = false;
    loadPayPalSdk(PAYPAL_CLIENT_ID, currency)
      .then(() => {
        if (cancelled) return;
        setIsReady(true);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || 'Error inicializando PayPal');
        onError && onError(err);
      });
    return () => {
      cancelled = true;
    };
  }, [currency, onError]);

  useEffect(() => {
    if (!isReady || !window.paypal || !containerRef.current) return;
    const paypal = window.paypal;
    containerRef.current.innerHTML = '';
    try {
      paypal.Buttons({
        style,
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: String(Number(amount || 0).toFixed(2)), currency_code: currency },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
            onApprove && onApprove({ data, details });
          });
        },
        onCancel: function (data) {
          onCancel && onCancel(data);
        },
        onError: function (err) {
          setError(err?.message || 'Ocurrió un error con PayPal');
          onError && onError(err);
        },
      }).render(containerRef.current);
    } catch (err) {
      setError(err?.message || 'No fue posible renderizar PayPal');
      onError && onError(err);
    }
  }, [isReady, amount, currency, onApprove, onCancel, onError, style]);

  return (
    <div className={className}>
      {error && <div className="alert alert-danger small" role="alert">{error}</div>}
      <div ref={containerRef} />
    </div>
  );
}

