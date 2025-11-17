import { useState } from 'react';
import './Wishlist.css';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart, addToCart } = useCart();
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

  const showNotification = (type, title, message) => {
    const id = Date.now();
    const newNotification = { id, type, title, message };
    setNotifications(prev => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const getProductDescription = (productId) => {
    const descriptions = {
      '1': 'Italian full-grain leather with gold hardware and spacious interior compartments',
      '2': 'Premium mulberry silk with hand-rolled edges and exclusive botanical print design',
      '3': 'Swiss automatic movement with sapphire crystal and genuine leather strap',
      '4': 'Hand-stitched leather with antique brass closure and multiple card slots'
    };
    return descriptions[productId] || 'Premium craftsmanship with attention to detail';
  };

  const getFormattedDate = () => {
    const options = { month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item.id);
    showNotification('success', 'Removed from Wishlist', `${item.name} has been removed from your wishlist`);
  };

  const handleMoveToCart = (item) => {
    moveToCart(item.id);
    showNotification('success', 'Added to Cart', `${item.name} has been moved to your cart`);
  };

  const addSuggestedToCart = (product) => {
    addToCart(product);
    showNotification('success', 'Added to Cart', `${product.name} has been added to your cart`);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      success: 'check-circle',
      error: 'exclamation-circle',
      warning: 'exclamation-triangle',
      info: 'info-circle'
    };
    return icons[type] || 'info-circle';
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return price;
  };

  return (
    <div className="wishlist-page">
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type} show`}>
            <i className={`fas fa-${getNotificationIcon(notification.type)}`}></i>
            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="hero-title">Your Curated Wishlist</h1>
            <div className="gold-divider"></div>
            <p className="hero-subtitle serif-font">Save your favorite pieces for later</p>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="wishlist-section section-padding">
        <div className="container">
          <div className="wishlist-header">
            <h2 className="section-title">Saved Items</h2>
            <span className="item-count sans-font uppercase">
              {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          
          {wishlist.length > 0 ? (
            <div className="wishlist-grid">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item" data-product-id={item.id}>
                  <div className="wishlist-item-image">
                    <img src={item.image} alt={item.name} />
                    <div className="wishlist-item-actions">
                      <button 
                        className="action-btn move-to-cart-btn" 
                        onClick={() => handleMoveToCart(item)}
                        title="Add to Cart"
                      >
                        <i className="fas fa-shopping-bag"></i>
                      </button>
                      <button 
                        className="action-btn remove-btn" 
                        onClick={() => handleRemoveFromWishlist(item)}
                        title="Remove from Wishlist"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="wishlist-item-details">
                    <h3 className="wishlist-item-name">{item.name}</h3>
                    <p className="wishlist-item-description">
                      {item.description || getProductDescription(item.id)}
                    </p>
                    <div className="wishlist-item-price">{formatPrice(item.price)}</div>
                    <div className="wishlist-item-meta">
                      <span className="stock-status">In Stock</span>
                      <span className="added-date">Added {getFormattedDate()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-wishlist">
              <div className="empty-wishlist-content">
                <i className="fas fa-heart"></i>
                <h3>Your Wishlist is Empty</h3>
                <p className="serif-font">Start exploring our collection and save your favorite pieces</p>
                <a href="/" className="cta-btn primary">
                  <span>Explore Collection</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Suggested Products */}
      <section className="suggested-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">You Might Also Like</h2>
            <div className="gold-divider"></div>
            <p className="section-subtitle serif-font">Discover more pieces that match your style</p>
          </div>
          
          <div className="products-grid">
            {suggestedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button className="quick-view">Quick View</button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => addSuggestedToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
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

export default Wishlist;