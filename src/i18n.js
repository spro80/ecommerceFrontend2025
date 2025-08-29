import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      common: {
        siteName: import.meta.env.VITE_APP_SITE_NAME || 'Mundo Belleza',
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
        previous: 'Anterior',
        login: 'Iniciar sesión',
        logout: 'Cerrar sesión',
        register: 'Registrarse',
        account: 'Cuenta'
      },
      auth: {
        titleLogin: 'Bienvenido de nuevo',
        titleRegister: 'Crear una cuenta',
        email: 'Correo electrónico',
        password: 'Contraseña',
        name: 'Nombre',
        rememberMe: 'Recuérdame',
        forgotPassword: '¿Olvidaste tu contraseña?',
        noAccount: '¿No tienes cuenta?',
        haveAccount: '¿Ya tienes cuenta?',
        or: 'o',
        continueWithGoogle: 'Continuar con Google',
        signIn: 'Entrar',
        signUp: 'Crear cuenta',
        googleClientMissing: 'Falta configurar Google Client ID',
        invalidCredentials: 'Credenciales inválidas',
        emailExists: 'El correo ya está registrado',
        registeredSuccess: 'Cuenta creada, puedes iniciar sesión',
        welcome: '¡Hola, {{name}}!'
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