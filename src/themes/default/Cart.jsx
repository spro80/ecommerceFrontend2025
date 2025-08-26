import React from 'react';
import { useCart } from '../../contexts/CartContext.jsx';

export default function Cart() {
  const { items, cartItemsCount, clearCart } = useCart();
  return (
    <div>
      <h1>Cart ({cartItemsCount})</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {items.map((it) => (
              <li key={it.id}>{it.name}</li>
            ))}
          </ul>
          <button className="btn btn-sm btn-outline-danger" onClick={clearCart}>Clear</button>
        </>
      )}
    </div>
  );
}