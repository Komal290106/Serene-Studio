import { useState } from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity, moveToWishlist, addToCart } = useCart();
  const [notifications, setNotifications] = useState([]);

  // Suggested products data
  const suggestedProducts = [
    {
      id: 'suggested-1',
      name: 'Minimalist Timepiece',
      price: 8500,
      image: 'https://images.unsplash.com/photo-1690729125175-fcda275386e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWluaW1hbGlzdCUyMFRpbWVwaWVjZXxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Swiss movement with sapphire crystal'
    },
    {
      id: 'suggested-2',
      name: 'Chanel No. 5 Eau de Parfum',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Classic floral aldehyde fragrance'
    },
    {
      id: 'suggested-3',
      name: 'Pearl Drop Earrings',
      price: 5800,
      image: 'https://images.unsplash.com/photo-1665198134143-8c4434d3578b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFBlYXJsJTIwRHJvcCUyMEVhcnJpbmdzfGVufDB8fDB8fHww',
      description: 'Freshwater pearls with gold setting'
    },
    {
      id: 'suggested-4',
      name: 'Leather Belt',
      price: 2400,
      image: 'https://images.unsplash.com/photo-1664286074176-5206ee5dc878?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGVhdGhlciUyMGJlbHR8ZW58MHx8MHx8fDA%3D',
      description: 'Genuine leather with brass buckle'
    }
  ];

  // Show notification
  const showNotification = (message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message }]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Get product description - handle both description field and fallback
  const getProductDescription = (item) => {
    if (item.description) {
      return item.description;
    }
    
    const descriptions = {
      '1': 'Italian full-grain leather with gold hardware and spacious interior compartments',
      '2': 'Premium mulberry silk with hand-rolled edges and exclusive botanical print design',
      '3': 'Swiss automatic movement with sapphire crystal and genuine leather strap',
      '4': 'Hand-stitched leather with antique brass closure and multiple card slots'
    };
    return descriptions[item.id] || 'Premium craftsmanship with attention to detail';
  };

  // Update quantity
  const handleUpdateQuantity = (item, change) => {
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      handleRemoveFromCart(item);
    } else {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  // Remove from cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item.id);
    showNotification(`${item.name} removed from cart`);
  };

  // Move to wishlist
  const handleMoveToWishlist = (item) => {
    moveToWishlist(item.id);
    showNotification(`${item.name} moved to wishlist`);
  };

  // Add to cart from suggested products
  const handleAddToCart = (product) => {
    addToCart(product);
    showNotification(`${product.name} added to cart`);
  };

  // Calculate order summary
  const calculateOrderSummary = () => {
    const subtotal = cart.reduce((total, item) => {
      let price = 0;
      if (typeof item.price === 'number') {
        price = item.price;
      } else if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      }
      return total + (price * item.quantity);
    }, 0);
    
    const shipping = subtotal > 5000 ? 0 : 250;
    const giftPackaging = 150;
    const total = subtotal + shipping + giftPackaging;
    
    return { subtotal, shipping, giftPackaging, total };
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  const { subtotal, shipping, giftPackaging, total } = calculateOrderSummary();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification.id} className="cart-notification show">
            <div className="notification-content">
              <i className="fas fa-check-circle"></i>
              <span>{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Your Curated Collection</h1>
            <div className="gold-divider"></div>
            <p className="hero-subtitle serif-font">Review your exquisite selection before checkout</p>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="cart-section section-padding">
        <div className="container">
          <div className="cart-grid">
            {/* Cart Items */}
            <div className="cart-items">
              <div className="cart-header">
                <h2 className="section-title">Items in Your Cart</h2>
                <span className="item-count sans-font uppercase">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              
              {cart.length > 0 ? (
                <div id="cart-items-container">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-description serif-font">
                          {getProductDescription(item)}
                        </p>
                        <div className="item-meta">
                          <span className="item-price">
                            {typeof item.price === 'number' ? `₹${item.price.toLocaleString()}` : item.price}
                          </span>
                          <span className="item-stock sans-font uppercase">In Stock</span>
                        </div>
                        <div className="item-actions">
                          <div className="quantity-controls">
                            <button 
                              className="quantity-btn minus" 
                              onClick={() => handleUpdateQuantity(item, -1)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button 
                              className="quantity-btn plus" 
                              onClick={() => handleUpdateQuantity(item, 1)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                          <button 
                            className="action-btn wishlist-btn" 
                            onClick={() => handleMoveToWishlist(item)}
                          >
                            <i className="far fa-heart"></i>
                            <span className="sans-font">Save for Later</span>
                          </button>
                        </div>
                      </div>
                      <button 
                        className="remove-btn" 
                        onClick={() => handleRemoveFromCart(item)}
                        aria-label="Remove item"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-cart" id="empty-cart-message">
                  <div className="empty-cart-content">
                    <i className="fas fa-shopping-bag"></i>
                    <h3>Your Cart is Empty</h3>
                    <p className="serif-font">Discover our curated collection and find something special</p>
                    <a href="/" className="cta-btn primary">
                      <span>Continue Shopping</span>
                      <i className="fas fa-arrow-right"></i>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cart.length > 0 && (
              <div className="order-summary">
                <h2 className="summary-title">Order Summary</h2>
                <div className="summary-details">
                  <div className="summary-item">
                    <span className="sans-font">Subtotal ({totalItems} items):</span>
                    <span className="subtotal-amount">₹{formatPrice(subtotal)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="sans-font">Shipping:</span>
                    <span className={`shipping-amount ${subtotal > 5000 ? 'free' : ''}`}>
                      {subtotal > 5000 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="sans-font">Gift Packaging:</span>
                    <span className="gift-amount">₹{giftPackaging}</span>
                  </div>
                  <div className="gold-divider" style={{ margin: '1.5rem 0', width: '100%' }}></div>
                  <div className="summary-item total">
                    <span className="sans-font uppercase letter-spacing-wide">Total:</span>
                    <span className="total-amount">₹{formatPrice(total)}</span>
                  </div>
                </div>
                <a href="/checkout" className="checkout-btn">
                  <span className="sans-font uppercase letter-spacing-wide">Proceed to Checkout</span>
                  <i className="fas fa-arrow-right"></i>
                </a>

                <div className="secure-checkout">
                  <i className="fas fa-shield-alt"></i>
                  <span className="sans-font">SSL Secure Checkout</span>
                </div>
                <div className="payment-methods">
                  <div className="payment-title sans-font uppercase letter-spacing-wide">We Accept</div>
                  <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-paypal"></i>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Suggested Products - Improved */}
<section className="suggested-section section-padding" style={{ background: 'var(--bg-beige)' }}>
  <div className="container">
    <div className="section-header text-center">
      <h2 className="section-title">Complete Your Collection</h2>
      <div className="gold-divider"></div>
      <p className="section-subtitle serif-font">Curated pieces that complement your selection</p>
    </div>
    
    <div className="products-grid">
      {suggestedProducts.map(product => (
        <div key={product.id} className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
            <div className="product-overlay">
              <button 
                className="quick-add"
                onClick={() => handleAddToCart(product)}
              >
                <i className="fas fa-shopping-bag"></i>
                Add to Cart
              </button>
            </div>
            <div className="product-badge">
              <span className="badge-text">Complementary</span>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description serif-font">{product.description}</p>
            <div className="product-meta">
              <span className="product-price">₹{formatPrice(product.price)}</span>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product)}
            >
              <i className="fas fa-plus"></i>
              Add to Collection
            </button>
          </div>
        </div>
      ))}
    </div>
    
    <div className="section-footer text-center">
      <a href="/shop" className="discover-more">
        <span>Discover More Pieces</span>
        <i className="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
</section>

      {/* Trust Section */}
      <section className="trust-section section-padding">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-shipping-fast"></i>
              </div>
              <h3 className="trust-title sans-font uppercase">Complimentary Shipping</h3>
              <p className="trust-description serif-font">Free worldwide shipping on orders above ₹5,000</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-undo-alt"></i>
              </div>
              <h3 className="trust-title sans-font uppercase">Easy Returns</h3>
              <p className="trust-description serif-font">30-day return policy with complimentary packaging</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-certificate"></i>
              </div>
              <h3 className="trust-title sans-font uppercase">Authenticity Guaranteed</h3>
              <p className="trust-description serif-font">Each piece comes with a certificate of authenticity</p>
            </div>
            <div className="trust-item">
              <div className="trust-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3 className="trust-title sans-font uppercase">Personal Service</h3>
              <p className="trust-description serif-font">Dedicated styling consultants available 24/7</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;