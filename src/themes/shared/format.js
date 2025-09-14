// Simple currency formatter for Chilean Peso with thousands separator and no decimals
// Usage: formatCLP(1234567) => "$1.234.567"

/**
 * Format a number as Chilean Peso currency with thousands separator and no decimals.
 * Returns a string like "$1.234.567". Gracefully handles invalid inputs.
 * @param {number|string|null|undefined} value
 * @returns {string}
 */
export function formatCLP(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "$0";
  try {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(numeric);
  } catch (_) {
    // Fallback formatting if Intl is not available
    const rounded = Math.round(numeric);
    const parts = Math.abs(rounded).toString().split('').reverse();
    const withDots = parts.reduce((acc, ch, idx) => acc + ch + ((idx + 1) % 3 === 0 && idx + 1 < parts.length ? '.' : ''), '').split('').reverse().join('');
    const sign = rounded < 0 ? '-' : '';
    return `${sign}$${withDots}`;
  }
}

