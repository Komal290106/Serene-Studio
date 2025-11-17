import React, { useEffect, useState } from "react";
import "./Account.css";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Account = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("sereneWishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("sereneCart")) || [];
    setWishlistCount(wishlist.length);
    setCartCount(cart.reduce((s, i) => s + (i.quantity || 0), 0));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!currentUser) {
    return (
      <div className="account-container">
        <div className="account-box empty">
          <h2>You are not logged in</h2>
          <p className="sub">Sign in to manage your wishlist and cart.</p>
          <Link to="/login" className="btn primary">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-wrapper">
        {/* PROFILE CARD */}
        <aside className="profile-card">
          <div className="profile-top">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt="profile"
              className="profile-img"
            />
            <div className="profile-meta">
              <h2 className="name">{currentUser.name || "User"}</h2>
              <p className="email">{currentUser.email}</p>
              <p className="joined">
                Member since:{" "}
                {new Date(currentUser.createdAt || Date.now()).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="profile-actions">
            <Link to="/account" className="btn outlined">Account Overview</Link>
            <button className="logout-btn btn danger" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        {/* MAIN ACTION CARDS: only working features */}
        <main className="options-grid">
          <button
            className="option-card interactive"
            onClick={() => navigate("/wishlist")}
            aria-label="Open wishlist"
          >
            <div className="option-top">
              <div className="icon-wrap">
                <i className="fas fa-heart" aria-hidden="true"></i>
                {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
              </div>
            </div>
            <h3>My Wishlist</h3>
            <p className="muted">Your saved items — tap to view</p>
          </button>

          <button
            className="option-card interactive"
            onClick={() => navigate("/cart")}
            aria-label="Open cart"
          >
            <div className="option-top">
              <div className="icon-wrap">
                <i className="fas fa-shopping-bag" aria-hidden="true"></i>
                {cartCount > 0 && <span className="badge">{cartCount}</span>}
              </div>
            </div>
            <h3>My Cart</h3>
            <p className="muted">Items waiting for checkout — go finish the vibe</p>
          </button>
        </main>
      </div>
    </div>
  );
};

export default Account;
