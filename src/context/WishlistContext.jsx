import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [favorites, setFavorites] = useState(new Set());

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
    setFavorites((prev) => new Set([...prev, product.id]));
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    setFavorites((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleFavorite = (id) => {
    if (favorites.has(id)) {
      removeFromWishlist(id);
    } else {
      // This will need product data, so we handle it differently
      setFavorites((prev) => {
        const newSet = new Set(prev);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        return newSet;
      });
    }
  };

  const isFavorite = (id) => favorites.has(id);

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, favorites, addToWishlist, removeFromWishlist, toggleFavorite, isFavorite, setWishlistItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
