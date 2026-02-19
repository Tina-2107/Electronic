// src/context/WishlistContext.jsx
import { createContext, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToWishlist = (product) => {
    setItems((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    const exists = items.find((p) => p.id === product.id);
    if (exists) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const inWishlist = (id) => items.some((p) => p.id === id);

  const count = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        inWishlist,
        count,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
