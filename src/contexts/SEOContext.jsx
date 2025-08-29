import React, { createContext, useContext, useMemo, useState } from 'react';

const SEOContext = createContext(null);

export function SEOProvider({ children }) {
  const [title, setTitle] = useState('Mundo Belleza');
  const [description, setDescription] = useState('');

  const value = useMemo(
    () => ({ title, setTitle, description, setDescription }),
    [title, description]
  );

  return <SEOContext.Provider value={value}>{children}</SEOContext.Provider>;
}

export function useSEO() {
  const ctx = useContext(SEOContext);
  if (!ctx) throw new Error('useSEO must be used within a SEOProvider');
  return ctx;
}