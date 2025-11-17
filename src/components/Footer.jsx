import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(true);
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
      }, 500);
    }
  };

  const footerLinks = {
    shop: [
      { path: "/products/new", label: "New Arrivals" },
      { path: "/products/bestsellers", label: "Bestsellers" },
      { path: "/products/handbags", label: "Handbags" },
      { path: "/products/scarves", label: "Scarves" },
      { path: "/products/watches", label: "Watches" },
      { path: "/products/jewelry", label: "Jewelry" }
    ],
    about: [
      { path: "/about", label: "Our Story" },
      { path: "/craftsmanship", label: "Craftsmanship" },
      { path: "/sustainability", label: "Sustainability" },
      { path: "/press", label: "Press" },
      { path: "/careers", label: "Careers" }
    ],
    services: [
      { path: "/contact", label: "Contact Us" },
      { path: "/shipping", label: "Shipping & Returns" },
      { path: "/faq", label: "FAQ" },
      { path: "/care-guide", label: "Care Guide" },
      { path: "/appointment", label: "Book Appointment" }
    ]
  };

  const socialLinks = [
    { icon: "fab fa-instagram", label: "Instagram", url: "#" },
    { icon: "fab fa-pinterest-p", label: "Pinterest", url: "#" },
    { icon: "fab fa-facebook-f", label: "Facebook", url: "#" },
    { icon: "fab fa-twitter", label: "Twitter", url: "#" }
  ];

  const paymentMethods = [
    { icon: "fab fa-cc-visa", label: "Visa" },
    { icon: "fab fa-cc-mastercard", label: "Mastercard" },
    { icon: "fab fa-cc-amex", label: "American Express" },
    { icon: "fab fa-cc-paypal", label: "PayPal" }
  ];

  const legalLinks = [
    { path: "/privacy", label: "Privacy Policy" },
    { path: "/terms", label: "Terms of Service" },
    { path: "/shipping-policy", label: "Shipping Policy" }
  ];

  return (
    <footer className="luxury-footer" role="contentinfo">
      <div className="footer-content container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="logo" aria-label="Sérene Studio Home">
            <span className="serif-font">Serene Studio</span>
            <div className="gold-line" aria-hidden="true"></div>
          </Link>
          <p className="brand-motto">
            Timeless accessories for the modern connoisseur
          </p>
          
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={social.label}
                className="social-link"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        </div>
        
        {/* Footer Links */}
        <nav className="footer-links" aria-label="Footer navigation">
          {/* Shop Links */}
          <div className="links-column">
            <h4 className="links-title uppercase">Shop</h4>
            <ul>
              {footerLinks.shop.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* About Links */}
          <div className="links-column">
            <h4 className="links-title uppercase">About</h4>
            <ul>
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Client Services Links */}
          <div className="links-column">
            <h4 className="links-title uppercase">Client Services</h4>
            <ul>
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <h4 className="newsletter-title uppercase">Join Our World</h4>
          <p className="newsletter-text">
            Receive exclusive offers, private viewings, and style advice.
          </p>
          
          {isSubscribed ? (
            <div className="subscription-success" role="alert">
              <i className="fas fa-check-circle"></i>
              Thank you for subscribing to our newsletter!
            </div>
          ) : (
            <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  required 
                  aria-label="Email address for newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button 
                  type="submit" 
                  className="subscribe-btn"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
          
          <div className="payment-methods" aria-label="Accepted payment methods">
            {paymentMethods.map((method, index) => (
              <i 
                key={index}
                className={method.icon} 
                aria-label={method.label}
                title={method.label}
              ></i>
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container footer-legal">
          <p>&copy; {new Date().getFullYear()} Sérene Studio. All rights reserved.</p>
          <nav aria-label="Legal links">
            <div className="legal-links">
              {legalLinks.map((link, index) => (
                <Link key={index} to={link.path}>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;