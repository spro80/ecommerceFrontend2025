import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      common: {
        siteName: import.meta.env.VITE_APP_SITE_NAME || 'eCommerce',
        currency: 'CLP',
        addToCart: 'Agregar al carrito',
        remove: 'Eliminar',
        subtotal: 'Subtotal',
        total: 'Total',
        checkout: 'Pagar',
        continueShopping: 'Seguir comprando',
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        blog: 'Blog',
        products: 'Productos',
        cart: 'Carrito',
        home: 'Inicio',
        search: 'Buscar',
        next: 'Siguiente',
        previous: 'Anterior'
      },
      home: {
        heroTitle: 'Descubre nuestra colección',
        heroSubtitle: 'Calidad, estilo y buen precio',
        cta: 'Explorar productos'
      },
      product: {
        details: 'Detalles del producto',
        description: 'Descripción',
        price: 'Precio'
      },
      cart: {
        title: 'Tu carrito',
        empty: 'Tu carrito está vacío',
        proceedToCheckout: 'Ir a checkout'
      },
      checkout: {
        title: 'Checkout',
        stepCart: 'Carrito',
        stepShipping: 'Envío',
        stepPayment: 'Pago',
        stepConfirmation: 'Confirmación',
        shippingInfo: 'Información de envío',
        paymentMethod: 'Método de pago',
        placeOrder: 'Confirmar orden',
        orderConfirmed: '¡Orden confirmada!'
      },
      blog: {
        title: 'Blog',
        readMore: 'Leer más'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18n;