import React from 'react';
import { sendContactEmail } from '../lib/email.js';

export default function ContactSection() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const nombre = form.nombre?.value?.trim() || '';
    const email = form.email?.value?.trim() || '';
    const mensaje = form.mensaje?.value?.trim() || '';

    if (!email) {
      form.email?.focus();
      return;
    }

    const subject = `Mensaje de contacto${nombre ? ' - ' + nombre : ''}`;
    const lines = [];
    if (nombre) lines.push(`Nombre: ${nombre}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push('');
    lines.push('Mensaje:');
    lines.push(mensaje || '');

    const body = encodeURIComponent(lines.join('\n'));
    const href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${body}`;

    try {
      await sendContactEmail({ toEmail: email, toName: nombre || 'Contacto', subject, message: lines.join('\n') });
    } catch (err) {
      window.location.href = href;
    }
  }
  return (
    <section id="contacto" className="contact-section py-5">
      <div className="container">
        <div className="row g-4 align-items-stretch">
          <div className="col-12 col-lg-5">
            <div className="h-100 p-4 p-lg-5 contact-card shadow-sm rounded-3">
              <h2 className="h4 mb-3 fw-bold">Hablemos</h2>
              <p className="mb-4 text-opacity-75">
                ¿Tienes dudas sobre productos, tu pedido o recomendaciones? Escríbenos y te
                respondemos a la brevedad.
              </p>
              <ul className="list-unstyled m-0">
                <li className="d-flex align-items-start gap-3 mb-3">
                  <span className="contact-icon" aria-hidden="true">📧</span>
                  <div>
                    <div className="fw-semibold">Email</div>
                    <a className="link-contact" href="mailto:soporte@mundobelleza.cl">soporte@mundobelleza.cl</a>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3 mb-3">
                  <span className="contact-icon" aria-hidden="true">📞</span>
                  <div>
                    <div className="fw-semibold">Teléfono</div>
                    <a className="link-contact" href="tel:+56989194282">+56 9 8919 4282</a>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-3">
                  <span className="contact-icon" aria-hidden="true">📍</span>
                  <div>
                    <div className="fw-semibold">Ubicación</div>
                    <span>Chile, atención online</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="h-100 p-4 p-lg-5 contact-form-card shadow-sm rounded-3">
              <h3 className="h5 mb-3 fw-semibold">Envíanos un mensaje</h3>
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" id="nombre" name="nombre" className="form-control" placeholder="Tu nombre" required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" placeholder="tu@email.com" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea id="mensaje" name="mensaje" className="form-control" rows="4" placeholder="Cuéntanos en qué podemos ayudarte" required />
                  </div>
                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                    <a href="https://wa.me/56989194282" target="_blank" rel="noreferrer" className="btn btn-secondary">WhatsApp</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

