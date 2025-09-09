import React from 'react';

const faqs = [
  {
    question: '¿Cuáles son los tiempos de envío?',
    answer:
      'Realizamos envíos a todo el país. Los tiempos estimados son de 2 a 5 días hábiles en zonas urbanas y de 5 a 8 días hábiles en zonas rurales. Recibirás un correo con tu número de seguimiento.'
  },
  {
    question: '¿Cuánto cuesta el envío?',
    answer:
      'El costo de envío se calcula automáticamente en el checkout según tu dirección y el peso del pedido. Ofrecemos envío gratis a partir de un monto mínimo promocional cuando esté vigente.'
  },
  {
    question: '¿Puedo devolver un producto?',
    answer:
      'Sí. Aceptamos devoluciones dentro de los 10 días corridos desde la recepción, siempre que el producto esté sin uso, en su empaque original y con sellos de seguridad intactos.'
  },
  {
    question: '¿Cómo hago seguimiento de mi pedido?',
    answer:
      'Una vez despachado, te enviaremos un correo con el número de seguimiento y el enlace de la empresa de transporte para ver el estado en tiempo real.'
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito y débito, transferencias bancarias y billeteras digitales compatibles. Todos los pagos son procesados de forma segura.'
  },
  {
    question: '¿Los productos son originales?',
    answer:
      'Sí, trabajamos únicamente con marcas oficiales y distribuidores autorizados. Todos nuestros productos son 100% originales.'
  },
  {
    question: '¿Cómo solicito factura?',
    answer:
      'Puedes solicitar tu factura ingresando los datos de facturación en el checkout o escribiéndonos luego de tu compra con tu número de pedido.'
  },
  {
    question: '¿Hay garantía?',
    answer:
      'Ofrecemos garantía por defectos de fábrica según la política de cada marca. Si tu producto presenta un problema, contáctanos para ayudarte con el proceso.'
  }
];

export default function PreguntasFrecuentes() {
  return (
    <section className="py-3">
      <div className="container">
        <div className="mb-4 text-center">
          <h1 className="mb-1">Preguntas frecuentes</h1>
          <p className="text-muted m-0">Encuentra respuestas rápidas sobre envíos, pagos, cambios y más.</p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((item, index) => {
                const headingId = `faq-heading-${index}`;
                const collapseId = `faq-collapse-${index}`;
                return (
                  <div className="card mb-2" key={index}>
                    <h2 className="m-0" id={headingId}>
                      <button
                        className="btn btn-link text-start w-100 px-3 py-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${collapseId}`}
                        aria-expanded={index === 0 ? 'true' : 'false'}
                        aria-controls={collapseId}
                      >
                        <span className="fw-bold">{item.question}</span>
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className={`collapse ${index === 0 ? 'show' : ''}`}
                      aria-labelledby={headingId}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="card-body">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card contact-form-card p-3">
              <h5 className="mb-2">¿Aún necesitas ayuda?</h5>
              <p className="text-muted mb-3">Escríbenos y te responderemos a la brevedad.</p>
              <a href="#contacto" className="btn btn-secondary w-100">Contactar soporte</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

