// src/context/CartContext.jsx
import { createContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    const stock = Number(product.stock) || 0;

    if (stock <= 0) {
      return false;
    }

    setItems((prev) => {
      const existing = prev.find((it) => it.id === product.id);

      if (existing) {
        const newQty = Math.min(existing.qty + qty, stock);

        return prev.map((it) =>
          it.id === product.id ? { ...it, qty: newQty, stock } : it,
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: Math.min(qty, stock),
          stock,
        },
      ];
    });

    return true;
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      prev
        .map((it) => {
          if (it.id !== id) return it;

          const stock = Number(it.stock) || 0;
          const newQty = Math.min(Math.max(qty, 0), stock);

          return {
            ...it,
            qty: newQty,
          };
        })
        .filter((it) => it.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, it) => sum + Number(it.qty), 0);
  const cartTotal = items.reduce(
    (sum, it) => sum + Number(it.qty) * Number(it.price || 0),
    0,
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
