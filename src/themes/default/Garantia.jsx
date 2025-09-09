import React, { useEffect } from 'react';
import { useSEO } from '../../contexts/SEOContext.jsx';

const items = [
  {
    title: 'Cobertura de la garantía',
    content:
      'Nuestros productos cuentan con garantía por defectos de fabricación según la política vigente de cada marca. La garantía no cubre daños por uso indebido, golpes, humedad, intervención de terceros ni desgaste normal.'
  },
  {
    title: 'Plazos de garantía',
    content:
      'El plazo estándar de garantía es de 3 a 6 meses desde la fecha de compra, salvo que la marca especifique un período distinto en su empaque o documentación.'
  },
  {
    title: 'Requisitos para solicitar garantía',
    content:
      'Debes contar con tu comprobante de compra (boleta o factura), el producto completo con su empaque y accesorios, y una descripción clara del problema presentado.'
  },
  {
    title: 'Proceso de evaluación',
    content:
      'Recibiremos el producto para una evaluación técnica. Si corresponde a un defecto de fábrica, gestionaremos reparación o reemplazo según disponibilidad. Si no es aplicable, te informaremos el diagnóstico.'
  },
  {
    title: 'Tiempos de resolución',
    content:
      'El tiempo estimado de evaluación y resolución es de 5 a 10 días hábiles desde la recepción del producto, pudiendo extenderse en casos que requieran soporte del fabricante.'
  },
  {
    title: 'Costos de envío',
    content:
      'Si la falla es atribuible a fábrica, cubriremos los costos de envío de retorno. En otros casos, los traslados corren por cuenta del cliente.'
  }
];

export default function Garantia() {
  const { setTitle, setDescription } = useSEO();

  useEffect(() => {
    setTitle('Garantía');
    setDescription('Conoce los plazos, cobertura y proceso para solicitar garantía.');
  }, [setTitle, setDescription]);

  return (
    <section className="py-3">
      <div className="container">
        <div className="mb-4 text-center">
          <h1 className="mb-1">Garantía</h1>
          <p className="text-muted m-0">Información sobre cobertura, plazos y cómo gestionar tu garantía.</p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="accordion" id="warrantyAccordion">
              {items.map((item, index) => {
                const headingId = `warranty-heading-${index}`;
                const collapseId = `warranty-collapse-${index}`;
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
                        <span className="fw-bold">{item.title}</span>
                      </button>
                    </h2>
                    <div
                      id={collapseId}
                      className={`collapse ${index === 0 ? 'show' : ''}`}
                      aria-labelledby={headingId}
                      data-bs-parent="#warrantyAccordion"
                    >
                      <div className="card-body">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card contact-form-card p-3">
              <h3 className="h5 mb-2">¿Aún necesitas ayuda?</h3>
              <p className="text-muted mb-3">Escríbenos y te responderemos a la brevedad.</p>
              <a href="#contacto" className="btn btn-secondary w-100">Contactar soporte</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

