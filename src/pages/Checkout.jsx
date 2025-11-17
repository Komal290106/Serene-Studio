import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Check login status and show toast only once
  useEffect(() => {
    // Small delay to ensure AuthContext has loaded
    const checkAuth = setTimeout(() => {
      if (!isLoggedIn) {
        setShowToast(true);
        const hideToast = setTimeout(() => setShowToast(false), 3000);
        return () => clearTimeout(hideToast);
      }
    }, 100);

    return () => clearTimeout(checkAuth);
  }, []); // Only run once on mount

  // Navbar scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePaymentChange = (method) => setPaymentMethod(method);

  const handleApplyPromo = () => {
    if (!promoApplied) {
      setPromoApplied(true);
      setTimeout(() => setPromoApplied(false), 2000);
    }
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      alert("Thank you for your purchase! Your order has been placed.");
      setIsProcessing(false);
      navigate("/orders");
    }, 1500);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="checkout-page">
      {/* Toast Notification */}
      {showToast && !isLoggedIn && (
        <div className="checkout-login-toast">
          Please login to continue checkout
          <button 
            onClick={handleLoginRedirect}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              background: "#d4af37",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              color: "#000"
            }}
          >
            Login
          </button>
        </div>
      )}

      <div className="checkout-container">
        {/* Progress */}
        <div className="checkout-progress">
          <div className="progress-steps">
            <div className="step active">
              <span className="step-number">1</span>
              <span className="step-label">Cart</span>
            </div>
            <div className="step active">
              <span className="step-number">2</span>
              <span className="step-label">Information</span>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <span className="step-label">Shipping</span>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "50%" }}></div>
          </div>
        </div>

        <div className="checkout-content">
          {/* Left Form */}
          <div className="checkout-form-section">
            <div className="form-card">
              <div className="card-header">
                <h2>Shipping Information</h2>
                <div className="gold-divider"></div>
              </div>

              <form id="checkoutForm">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      required
                      disabled={!isLoggedIn}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      required
                      disabled={!isLoggedIn}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={isLoggedIn ? currentUser?.email || "" : ""}
                    required
                    disabled={!isLoggedIn}
                  />
                </div>

                <div className="form-group">
                  <label>Shipping Address</label>
                  <input
                    type="text"
                    placeholder="Street address"
                    required
                    disabled={!isLoggedIn}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      required
                      disabled={!isLoggedIn}
                    />
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      placeholder="Postal Code"
                      required
                      disabled={!isLoggedIn}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <div className="select-wrapper">
                    <select required disabled={!isLoggedIn}>
                      <option value="">Select Country</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                      <option>India</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {/* Payment */}
            <div className="form-card">
              <div className="card-header">
                <h2>Payment Method</h2>
                <div className="gold-divider"></div>
              </div>

              <div className="payment-options">
                {/* CARD */}
                <div
                  className={`payment-option ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id="cardPayment"
                    disabled={!isLoggedIn}
                    checked={paymentMethod === "card"}
                    onChange={() => handlePaymentChange("card")}
                  />

                  <label htmlFor="cardPayment">
                    <span className="payment-icon">💳</span> Credit/Debit Card
                  </label>

                  {paymentMethod === "card" && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          disabled={!isLoggedIn}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* PayPal */}
                <div className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    id="paypalPayment"
                    disabled={!isLoggedIn}
                  />
                  <label htmlFor="paypalPayment">PayPal</label>
                </div>

                {/* Apple Pay */}
                <div className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    id="applePayPayment"
                    disabled={!isLoggedIn}
                  />
                  <label htmlFor="applePayPayment">Apple Pay</label>
                </div>
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="order-summary-section">
            <div className="summary-card">
              <div className="card-header">
                <h2>Order Summary</h2>
                <div className="gold-divider"></div>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Total</span>
                  <span>₹3,727</span>
                </div>
              </div>

              <button
                className={`checkout-btn ${isProcessing ? "processing" : ""}`}
                disabled={!isLoggedIn || isProcessing}
                onClick={handleCheckout}
              >
                {isLoggedIn
                  ? isProcessing
                    ? "Processing..."
                    : "Complete Purchase"
                  : "Login Required"}
              </button>

              {!isLoggedIn && (
                <p className="secure-checkout">
                  Login to complete your purchase 🔒
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;