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
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return false;
    }

    // If stock exists, use it.
    // Otherwise assume the product is available.
    const stock =
      product.stock != null
        ? Number(product.stock)
        : product.inStock === false
          ? 0
          : Infinity;

    if (stock <= 0) {
      console.warn("Product is out of stock:", product.name);
      return false;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        const newQty = Math.min(existing.qty + qty, stock);

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                qty: newQty,
                stock,
              }
            : item,
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
        .map((item) => {
          if (item.id !== id) return item;

          const stock = item.stock != null ? Number(item.stock) : Infinity;

          const newQty = Math.min(Math.max(qty, 0), stock);

          return {
            ...item,
            qty: newQty,
          };
        })
        .filter((item) => item.qty > 0),
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  const cartTotal = items.reduce(
    (sum, item) => sum + Number(item.qty || 0) * Number(item.price || 0),
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
