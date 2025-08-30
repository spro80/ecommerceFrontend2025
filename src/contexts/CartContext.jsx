import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = useCallback((item, quantity = 1) => {
    setItems((previousItems) => {
      const existingItemIndex = previousItems.findIndex((existing) => existing.id === item.id);
      if (existingItemIndex !== -1) {
        return previousItems.map((existing) =>
          existing.id === item.id
            ? { ...existing, quantity: (existing.quantity || 1) + quantity }
            : existing
        );
      }
      return [...previousItems, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setItems((previousItems) => previousItems.filter((existing) => existing.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const updateQuantity = useCallback((id, quantity) => {
    const nextQuantity = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
    setItems((previousItems) => {
      if (nextQuantity <= 0) {
        return previousItems.filter((existing) => existing.id !== id);
      }
      return previousItems.map((existing) =>
        existing.id === id ? { ...existing, quantity: nextQuantity } : existing
      );
    });
  }, []);

  const incrementItem = useCallback((id) => {
    setItems((previousItems) =>
      previousItems.map((existing) =>
        existing.id === id
          ? { ...existing, quantity: (existing.quantity || 1) + 1 }
          : existing
      )
    );
  }, []);

  const decrementItem = useCallback((id) => {
    setItems((previousItems) => {
      return previousItems
        .map((existing) =>
          existing.id === id
            ? { ...existing, quantity: Math.max((existing.quantity || 1) - 1, 0) }
            : existing
        )
        .filter((existing) => (existing.quantity || 0) > 0);
    });
  }, []);

  const cartItemsCount = useMemo(
    () => items.reduce((accumulator, current) => accumulator + (current.quantity || 1), 0),
    [items]
  );

  const cartSubtotal = useMemo(
    () => items.reduce((sum, current) => sum + (current.price || 0) * (current.quantity || 1), 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      updateQuantity,
      incrementItem,
      decrementItem,
      cartItemsCount,
      cartSubtotal,
    }),
    [items, addItem, removeItem, clearCart, updateQuantity, incrementItem, decrementItem, cartItemsCount, cartSubtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}