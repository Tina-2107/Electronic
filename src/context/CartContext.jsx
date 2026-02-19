// src/context/CartContext.jsx
import { createContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // [{id, name, price, image, qty}, ...]

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: it.qty + qty } : it
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, it) => sum + it.qty, 0);
  const cartTotal = items.reduce(
    (sum, it) => sum + it.qty * (it.price || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;
