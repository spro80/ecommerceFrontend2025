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

async function enableMocks() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ serviceWorker: { url: '/mockServiceWorker.js' } });
  }
}

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
