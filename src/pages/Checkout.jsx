import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Toasts
  const [showLoginToast, setShowLoginToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      address.trim() &&
      city.trim() &&
      postal.trim() &&
      country.trim() &&
      (paymentMethod !== "card" || cardNumber.trim())
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        setShowLoginToast(true);
        setTimeout(() => setShowLoginToast(false), 3000);
      }, 200);
    }
  }, [isLoggedIn]);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginToast(true);
      setTimeout(() => setShowLoginToast(false), 3000);
      return;
    }

    if (!isFormValid()) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setShowSuccessToast(true);

      setTimeout(() => {
        setShowSuccessToast(false);
        navigate("/orders");
      }, 2000);

      setIsProcessing(false);
    }, 1500);
  };

  const handleLoginRedirect = () => navigate("/login");

  return (
    <div className="checkout-page">
      {/* LOGIN TOAST */}
      {showLoginToast && !isLoggedIn && (
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
              color: "#000",
            }}
          >
            Login
          </button>
        </div>
      )}

      {/* ERROR TOAST */}
      {showErrorToast && (
        <div className="toast toast-error">
          Please fill out all required fields.
        </div>
      )}

      {/* SUCCESS TOAST */}
      {showSuccessToast && (
        <div className="toast toast-success">
          Thank you! Your purchase is completed.
        </div>
      )}

      <div className="checkout-container">
        {/* PROGRESS BAR */}
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
          {/* LEFT SIDE */}
          <div className="checkout-form-section">
            <div className="form-card">
              <div className="card-header">
                <h2>Shipping Information</h2>
                <div className="gold-divider"></div>
              </div>

              <form>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={!isLoggedIn}
                    />
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={!isLoggedIn}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isLoggedIn}
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isLoggedIn}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!isLoggedIn}
                    />
                  </div>

                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                      disabled={!isLoggedIn}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Country</label>
                  <div className="select-wrapper">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      disabled={!isLoggedIn}
                    >
                      <option value="">Select Country</option>
                      <option>India</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {/* PAYMENT METHOD */}
            <div className="form-card">
              <div className="card-header">
                <h2>Payment Method</h2>
                <div className="gold-divider"></div>
              </div>

              <div className="payment-options">
                <div
                  className={`payment-option ${
                    paymentMethod === "card" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />

                  <label>
                    💳 Credit/Debit Card
                  </label>

                  {paymentMethod === "card" && (
                    <div className="payment-details">
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          disabled={!isLoggedIn}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    onChange={() => setPaymentMethod("paypal")}
                  />
                  <label>PayPal</label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    onChange={() => setPaymentMethod("apple")}
                  />
                  <label>Apple Pay</label>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
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
                disabled={!isLoggedIn || isProcessing || !isFormValid()}
                onClick={handleCheckout}
              >
                {isProcessing ? "Processing..." : "Complete Purchase"}
              </button>

              {!isLoggedIn && (
                <p className="secure-checkout">Login to complete your purchase 🔒</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
