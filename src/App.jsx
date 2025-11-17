// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";  // ✅ ENABLE AUTH

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Journal from "./pages/Journal";
import About from "./pages/About";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";          // ✅ ENABLE LOGIN
import Signup from "./pages/Signup";        // ✅ ENABLE SIGNUP
import Admin from "./pages/Admin";
import Account from "./pages/Account";

import Sunglasses from "./pages/Products/Sunglasses";
import HandBags from "./pages/Products/HandBags";
import Perfumes from "./pages/Products/Perfumes";
import Watches from "./pages/Products/Watches";
import Jewelry from "./pages/Products/Jewelry";
import Belts from "./pages/Products/Belts";
import Scarves from "./pages/Products/Scarves";

function App() {
  return (
    <AuthProvider>     {/* ✅ Auth wraps entire APP */}
      <CartProvider>
        <Router>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Category Pages */}
            <Route path="/collections" element={<Collections />} />
            <Route path="/products/sunglasses" element={<Sunglasses />} />
            <Route path="/products/handbags" element={<HandBags />} />
            <Route path="/products/perfumes" element={<Perfumes />} />
            <Route path="/products/watches" element={<Watches />} />
            <Route path="/products/jewelry" element={<Jewelry />} />
            <Route path="/products/belts" element={<Belts />} />
            <Route path="/products/scarves" element={<Scarves />} />

            <Route path="/journal" element={<Journal />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<Account />} />


            {/* Wishlist & Cart */}
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />

            {/* Checkout (Protected If Needed) */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin */}
            <Route path="/admin" element={<Admin />} />
          </Routes>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
