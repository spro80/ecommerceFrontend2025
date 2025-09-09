import React, { useEffect } from 'react';
import { useSEO } from '../../contexts/SEOContext.jsx';

export default function EnviosYDevoluciones() {
  const { setTitle, setDescription } = useSEO();

  useEffect(() => {
    setTitle('Envíos y devoluciones');
    setDescription('Información sobre tiempos de envío, costos, devoluciones y cambios.');
  }, [setTitle, setDescription]);

  return (
    <section className="py-3">
      <div className="container">
        <div className="mb-4 text-center">
          <h1 className="mb-1">Envíos y devoluciones</h1>
          <p className="text-muted m-0">Conoce nuestros tiempos, costos y políticas de cambios.</p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card mb-3">
              <div className="card-body">
                <h2 className="h5 mb-2">Tiempos de envío</h2>
                <p className="mb-2">
                  Realizamos envíos a todo el país. Los tiempos estimados son de 2 a 5 días hábiles
                  en zonas urbanas y de 5 a 8 días hábiles en zonas rurales. Recibirás un correo con
                  tu número de seguimiento cuando tu pedido sea despachado.
                </p>
                <ul className="mb-0">
                  <li>Estándar: 3–5 días hábiles</li>
                  <li>Express: 1–2 días hábiles</li>
                </ul>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h2 className="h5 mb-2">Costos de envío</h2>
                <p className="mb-0">
                  El costo se calcula automáticamente en el checkout según tu dirección y el peso del pedido.
                  Ofrecemos envío gratis desde montos promocionales cuando estén vigentes.
                </p>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body">
                <h2 className="h5 mb-2">Devoluciones y cambios</h2>
                <p>
                  Aceptamos devoluciones dentro de los 10 días corridos desde la recepción, siempre que el
                  producto esté sin uso, en su empaque original y con sellos de seguridad intactos.
                </p>
                <ul className="mb-0">
                  <li>Los costos de envío por devolución corren por cuenta del cliente, salvo producto defectuoso.</li>
                  <li>Para iniciar un cambio o devolución, contáctanos indicando tu número de pedido.</li>
                  <li>Procesamos reembolsos al mismo método de pago utilizado.</li>
                </ul>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h2 className="h5 mb-2">Seguimiento de tu pedido</h2>
                <p className="mb-0">
                  Una vez despachado, te enviaremos un correo con el enlace de seguimiento de la empresa de transporte
                  para ver el estado en tiempo real.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card contact-form-card p-3">
              <h3 className="h5 mb-2">¿Necesitas ayuda?</h3>
              <p className="text-muted mb-3">Escríbenos y te responderemos a la brevedad.</p>
              <a href="#contacto" className="btn btn-secondary w-100">Contactar soporte</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

