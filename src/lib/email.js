// Lightweight utility to format and send order confirmation emails via EmailJS
// Expects the following env vars defined in Vite:
// - VITE_EMAILJS_PUBLIC_KEY
// - VITE_EMAILJS_SERVICE_ID
// - VITE_EMAILJS_TEMPLATE_ID

import emailjs from '@emailjs/browser';

function formatCurrency(value) {
  const num = Number(value || 0);
  return `$${num.toFixed(2)}`;
}

export function buildOrderEmailPayload(order) {
  const { id, items, totals, customer, shippingMethod, paymentMethod } = order;

  const lines = [];
  lines.push(`Hola ${customer?.name || ''},`);
  lines.push(' ');
  lines.push(`Gracias por tu compra. Tu pedido #${id} ha sido confirmado.`);
  lines.push(' ');
  lines.push('Detalle de productos:');
  (items || []).forEach((it) => {
    const qty = it.quantity || 1;
    const price = Number(it.price || 0);
    lines.push(`- ${it.name} x${qty} - ${formatCurrency(price * qty)}`);
  });
  lines.push(' ');
  lines.push(`Subtotal: ${formatCurrency(totals?.subtotal)}`);
  lines.push(
    `Envío: ${formatCurrency(totals?.shipping)} (${shippingMethod === 'express' ? 'Express' : 'Estándar'})`
  );
  lines.push(`IVA: ${formatCurrency(totals?.tax)}`);
  lines.push(`Total: ${formatCurrency(totals?.total)}`);
  lines.push(' ');
  lines.push('Datos de envío:');
  if (customer?.name) lines.push(`${customer.name}`);
  if (customer?.address) lines.push(`${customer.address}`);
  if (customer?.city || customer?.postalCode) lines.push(`${customer.city || ''}${customer.city && customer.postalCode ? ', ' : ''}${customer.postalCode || ''}`);
  if (customer?.phone) lines.push(`Tel: ${customer.phone}`);
  if (customer?.email) lines.push(`Email: ${customer.email}`);
  lines.push(' ');
  lines.push('Gracias por comprar con nosotros.');

  const textBody = lines.join('\n');

  return {
    order_id: id,
    to_email: customer?.email || '',
    to_name: customer?.name || 'Cliente',
    subject: `Pedido ${id} - Confirmación de compra`,
    message: textBody,
    total_amount: formatCurrency(totals?.total),
    payment_method: paymentMethod,
  };
}

export async function sendOrderConfirmationEmail(order) {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    const missing = [
      !publicKey && 'VITE_EMAILJS_PUBLIC_KEY',
      !serviceId && 'VITE_EMAILJS_SERVICE_ID',
      !templateId && 'VITE_EMAILJS_TEMPLATE_ID',
    ].filter(Boolean).join(', ');
    throw new Error(`EmailJS config missing: ${missing}`);
  }

  const payload = buildOrderEmailPayload(order);

  emailjs.init({ publicKey });
  const response = await emailjs.send(serviceId, templateId, payload);
  return response;
}

export function buildContactEmailPayload({ toEmail, toName, subject, message }) {
  return {
    to_email: toEmail || '',
    to_name: toName || 'Contacto',
    subject: subject || 'Mensaje de contacto',
    message: message || '',
  };
}

export async function sendContactEmail({ toEmail, toName, subject, message }) {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  if (!publicKey || !serviceId || !templateId) {
    const missing = [
      !publicKey && 'VITE_EMAILJS_PUBLIC_KEY',
      !serviceId && 'VITE_EMAILJS_SERVICE_ID',
      !templateId && 'VITE_EMAILJS_TEMPLATE_ID',
    ].filter(Boolean).join(', ');
    throw new Error(`EmailJS config missing: ${missing}`);
  }

  const payload = buildContactEmailPayload({ toEmail, toName, subject, message });

  emailjs.init({ publicKey });
  const response = await emailjs.send(serviceId, templateId, payload);
  return response;
}

