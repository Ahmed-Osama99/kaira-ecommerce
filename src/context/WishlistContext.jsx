import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // check if it stored in local storage (in case user did not log in)
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
  const [wishlist, setWishlist] = useState(storedWishlist || []);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  useEffect(() => {
    // store / update the wish list in local storage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// function storeWishlistInLocalStorage(wishlist){

//   // if(storedProduct){
//   //   localStorage.removeItem(product.id)
//   // }else{
//   //   localStorage.setItem(product.id,product)
//   // }

// }

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => useContext(WishlistContext);
