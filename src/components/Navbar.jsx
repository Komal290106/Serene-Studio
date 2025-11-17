import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";   // 🔥 AUTH HOOK
import "./Navbar.css";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // shop dropdown
  const [isAccountOpen, setIsAccountOpen] = useState(false); // account dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const { isLoggedIn, currentUser, logout } = useAuth();
  const dropdownRef = useRef(null);       // shop dropdown
  const accountRef = useRef(null);        // account dropdown wrapper
  const mobileMenuRef = useRef(null);
  const closeAccountTimer = useRef(null);
  const navigate = useNavigate();

  /* ========================= Scroll Effect ========================= */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        document.querySelector(".navbar")?.classList.add("scrolled");
      } else {
        document.querySelector(".navbar")?.classList.remove("scrolled");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ========================= Load Cart & Wishlist ========================= */
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("sereneCart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("sereneWishlist")) || [];

    const totalCartItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  }, []);

  /* ========================= Close account on outside click ========================= */
  useEffect(() => {
    const onClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ========================= Helpers ========================= */
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    // DO NOT forcibly close account here — let account handlers manage that
  };

  const handleLogoutClick = async () => {
    // optional: await logout if it's async
    await logout();
    setIsAccountOpen(false);
    // navigate to homepage or login page if needed
    navigate("/");
  };

  /* ========== Account dropdown mouse handlers w/ delay ========== */
  const openAccount = () => {
    if (closeAccountTimer.current) {
      clearTimeout(closeAccountTimer.current);
      closeAccountTimer.current = null;
    }
    setIsAccountOpen(true);
  };

  const closeAccountWithDelay = (delay = 220) => {
    if (closeAccountTimer.current) clearTimeout(closeAccountTimer.current);
    closeAccountTimer.current = setTimeout(() => {
      setIsAccountOpen(false);
      closeAccountTimer.current = null;
    }, delay);
  };

  /* Pressing Esc closes account dropdown */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsAccountOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={handleNavClick}>
          <span className="serif-font">Serene Studio</span>
          <div className="gold-line"></div>
        </Link>

        <nav className={isMobileMenuOpen ? "nav-open" : ""} ref={mobileMenuRef}>
          <ul>
            <li><Link to="/" className="nav-link" onClick={handleNavClick}>Home</Link></li>

            {/* Shop Dropdown */}
            <li
              className="dropdown"
              ref={dropdownRef}
              onMouseEnter={() => !isMobileMenuOpen && setIsDropdownOpen(true)}
              onMouseLeave={() => !isMobileMenuOpen && setIsDropdownOpen(false)}
            >
              <button
                className="nav-link dropdown-btn"
                onClick={() => setIsDropdownOpen((s) => !s)}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Shop <i className="fas fa-chevron-down dropdown-arrow"></i>
              </button>

              {/* Dropdown menu */}
              <div className={`dropdown-menu ${isDropdownOpen ? "dropdown-open" : ""}`}>
                <Link to="/products/sunglasses" className="dropdown-item" onClick={handleNavClick}>Sunglasses</Link>
                <Link to="/products/perfumes" className="dropdown-item" onClick={handleNavClick}>Perfumes</Link>
                <Link to="/products/jewelry" className="dropdown-item" onClick={handleNavClick}>Jewelry</Link>
                <Link to="/products/watches" className="dropdown-item" onClick={handleNavClick}>Watches</Link>
                <Link to="/products/handbags" className="dropdown-item" onClick={handleNavClick}>Handbags</Link>
                <Link to="/products/scarves" className="dropdown-item" onClick={handleNavClick}>Scarves</Link>
                <Link to="/products/belts" className="dropdown-item" onClick={handleNavClick}>Belts</Link>
              </div>
            </li>

            <li><Link to="/collections" className="nav-link" onClick={handleNavClick}>Collections</Link></li>
            <li><Link to="/journal" className="nav-link" onClick={handleNavClick}>Journal</Link></li>
            <li><Link to="/about" className="nav-link" onClick={handleNavClick}>About</Link></li>
          </ul>
        </nav>

        {/* Icons */}
        <div className="nav-icons">
          <button className="icon-btn search-btn"><i className="fas fa-search"></i></button>

          {/* Wishlist */}
          <div className="icon-wrapper">
            <Link to="/wishlist" className="icon-btn wishlist-btn" onClick={handleNavClick}>
              <i className="far fa-heart"></i>
            </Link>
            {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
          </div>

          {/* Account */}
          <div
            className={`account-dropdown ${isAccountOpen ? "open" : ""}`}
            ref={accountRef}
            onMouseEnter={() => !isMobileMenuOpen && openAccount()}
            onMouseLeave={() => !isMobileMenuOpen && closeAccountWithDelay(220)}
          >
            {/* clicking toggles it — useful for touch */}
            <button
              className="icon-btn account-btn"
              aria-haspopup="true"
              aria-expanded={isAccountOpen}
              onClick={() => setIsAccountOpen((s) => !s)}
            >
              <i className="fas fa-user"></i>
            </button>

            <div className="dropdown-content" role="menu">
              {!isLoggedIn ? (
                <>
                  <Link to="/signup" className="signup" onClick={() => { setIsAccountOpen(false); handleNavClick(); }}>Sign Up</Link>
                  <Link to="/login" className="login" onClick={() => { setIsAccountOpen(false); handleNavClick(); }}>Login</Link>
                </>
              ) : (
                <>
                  <p className="user-welcome">Hi, {currentUser?.name || "there"}</p>
                  <Link to="/account" onClick={() => { setIsAccountOpen(false); handleNavClick(); }}>My Account</Link>

                  {/* Logout button */} 
                  <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
                </>
              )}
            </div>
          </div>

          {/* Cart */}
          <div className="icon-wrapper">
            <Link to="/cart" className="icon-btn cart-btn" onClick={handleNavClick}>
              <i className="fas fa-shopping-bag"></i>
            </Link>
            {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
          </div>
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => {
            setIsMobileMenuOpen((s) => !s);
            setIsAccountOpen(false); // keep state tidy
          }}
        >
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
