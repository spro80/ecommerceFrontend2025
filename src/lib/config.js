export const APP_ENVIRONMENT = import.meta.env.MODE;

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

// IVA/VAT configuration
export const IVA_RATE = 0.19; // 19%

export function buildApiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL}${normalizedPath}`;
}

