// Filters console errors/warnings from known noisy browser extensions during development.
// This does not affect production builds.

export function installDevConsoleFilter() {
  if (typeof window === 'undefined') return;
  if (!import.meta || import.meta.env.PROD) return;

  const noisyPatterns = [
    /ag-translate\.com\/api\/userInfo/i,
    /chrome-extension:\/\//i,
    /Unexpected token '<', "<!doctype "/i,
  ];

  const originalError = console.error;
  const originalWarn = console.warn;

  function shouldSuppress(args) {
    try {
      const text = args.map((a) => {
        if (a && typeof a.stack === 'string') return a.stack;
        return typeof a === 'string' ? a : JSON.stringify(a);
      }).join(' ');
      return noisyPatterns.some((re) => re.test(text));
    } catch {
      return false;
    }
  }

  console.error = (...args) => {
    if (shouldSuppress(args)) return;
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    if (shouldSuppress(args)) return;
    originalWarn.apply(console, args);
  };
}

