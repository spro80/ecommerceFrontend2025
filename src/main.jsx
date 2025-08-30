import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './themes/shared/theme.css';
import App from './App.jsx';
import WhatsAppBot from './components/WhatsAppBot.jsx';
import { UserProvider } from './contexts/UserContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { SEOProvider } from './contexts/SEOContext.jsx';
import { installDevConsoleFilter } from './utils/devConsoleFilter.js';

async function enableMocks() {
  if (import.meta.env.DEV || ['localhost', '127.0.0.1'].includes(window.location.hostname)) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
  }
}

installDevConsoleFilter();
enableMocks().finally(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <HelmetProvider>
        <SEOProvider>
          <UserProvider>
            <CartProvider>
              <BrowserRouter>
                <App />
                <WhatsAppBot />
              </BrowserRouter>
            </CartProvider>
          </UserProvider>
        </SEOProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
});
