import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:categoryName" element={<CategoryPage />} />
              <Route path="/contact" element={<div>Contact</div>} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<div>Profile Page</div>} />
            </Routes>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </>
  );
}

export default App;
