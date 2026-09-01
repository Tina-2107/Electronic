import { createContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");

      if (!savedWishlist) {
        return [];
      }

      const parsedWishlist = JSON.parse(savedWishlist);

      return Array.isArray(parsedWishlist) ? parsedWishlist : [];
    } catch (error) {
      console.error("Error loading wishlist:", error);
      return [];
    }
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  }, [items]);

  // Add product
  const addToWishlist = (product) => {
    if (!product) return;

    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  // Remove product
  const removeFromWishlist = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add / Remove
  const toggleWishlist = (product) => {
    if (!product) return;

    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  // Check whether product is in wishlist
  const inWishlist = (id) => {
    return items.some((item) => item.id === id);
  };

  // Wishlist count
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
