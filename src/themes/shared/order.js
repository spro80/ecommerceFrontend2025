// Order number generator - unique and user-friendly

/**
 * Generates a unique order number string.
 * Format example: ORD-20250914-4F7K-8M2Q
 * - Prefix for readability
 * - Date for sorting and traceability (YYYYMMDD)
 * - Two 4-char random base36 segments, uppercase
 */
export function generateOrderNumber() {
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const date = `${y}${m}${d}`;

  const rand = () => Math.random().toString(36).slice(2, 6).toUpperCase();

  return `ORD-${date}-${rand()}-${rand()}`;
}

/**
 * Generates a compact unique order id without prefix, e.g. 20250914-4F7K8M2Q
 */
export function generateCompactOrderId() {
  const now = new Date();
  const y = String(now.getFullYear());
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const date = `${y}${m}${d}`;
  const rand = () => Math.random().toString(36).slice(2, 10).toUpperCase();
  return `${date}-${rand()}`;
}

