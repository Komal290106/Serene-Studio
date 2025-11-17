import { useState } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import bgImage from '../assets/images/bg1.jpg';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { 
    addToCart: contextAddToCart, 
    toggleWishlist: contextToggleWishlist, 
    isInWishlist: contextIsInWishlist 
  } = useCart();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Products data
  const products = [
    {
      id: '1',
      name: 'Sienna Leather Tote',
      description: 'Italian full-grain leather with gold hardware',
      price: '₹15,000',
      image: 'https://plus.unsplash.com/premium_photo-1670984076180-22a6c8f27f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVhdGhlciUyMHRvdGV8ZW58MHx8MHx8fDA%3D',
      badge: 'New'
    },
    {
      id: '2',
      name: 'Florentine Silk Scarf',
      description: 'Hand-rolled edges with exclusive print',
      price: '₹2,000',
      image: 'https://i.pinimg.com/1200x/75/17/15/751715c9b57a0a293688c4b248e0a7ce.jpg',
      badge: 'Bestseller'
    },
    {
      id: '3',
      name: 'Geneva Automatic Watch',
      description: 'Swiss movement with sapphire crystal',
      price: '₹11,250',
      image: 'https://images.unsplash.com/photo-1607776905497-b4f788205f6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdlbmV2YSUyMHdhdGNofGVufDB8fDB8fHww',
      badge: null
    },
    {
      id: '4',
      name: 'Venice Leather Clutch',
      description: 'Hand-stitched with antique brass closure',
      price: '₹3,320',
      image: 'https://images.unsplash.com/photo-1749294435694-ce3c586591e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdGhlciUyMGNsdXRjaHxlbnwwfHwwfHx8MA%3D%3D',
      badge: 'Limited'
    }
  ];

  // Editorial articles data
  const articles = [
    {
      category: 'Trends',
      title: 'Spring 2023: The Return to Elegance',
      excerpt: 'How modern minimalism meets classic sophistication in this season\'s most coveted pieces...',
      image: 'https://images.unsplash.com/photo-1700067617747-2353ccb4a318?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFzdGVsJTIwcHVyc2V8ZW58MHx8MHx8fDA%3D'
    },
    {
      category: 'Craftsmanship',
      title: 'Behind the Atelier: Master Artisans',
      excerpt: 'Meet the skilled craftspeople who bring our luxury leather goods to life through traditional techniques...',
      image: 'https://images.unsplash.com/photo-1628483211662-9bcc692c46dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVhdGhlciUyMHdhbGxldHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      category: 'Sustainability',
      title: 'Conscious Luxury: Our Eco Promise',
      excerpt: 'Exploring how sustainable practices and ethical sourcing shape the future of luxury fashion...',
      image: 'https://images.unsplash.com/photo-1663776376262-1d12c353f789?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGp1dGUlMjBiYWd8ZW58MHx8MHx8fDA%3D'
    },
    {
      category: 'Style Guide',
      title: 'Timeless Pieces: Investment Dressing',
      excerpt: 'A curated guide to building a capsule wardrobe with pieces that transcend seasonal trends...',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D'
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

  // Use context functions with notifications
  const addToCart = (product) => {
    contextAddToCart(product);
    showNotification('success', 'Added to Cart', `${product.name} has been added to your cart`);
  };

  const toggleWishlist = (product) => {
    const isInWishlist = contextIsInWishlist(product.id);
    contextToggleWishlist(product);
    
    if (isInWishlist) {
      showNotification('info', 'Removed from Wishlist', `${product.name} has been removed from your wishlist`);
    } else {
      showNotification('success', 'Added to Wishlist', `${product.name} has been added to your wishlist`);
    }
  };

  const isInWishlist = (productId) => {
    return contextIsInWishlist(productId);
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeQuickView = () => {
    setShowModal(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
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

  return (
    <div className="home-page">
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

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1 className="hero-title">
              Timeless Elegance,<br />Curated for You
            </h1>
            <p className="hero-subtitle">
              Discover our Spring Collection of handcrafted accessories. Each piece is meticulously
              crafted by master artisans using traditional techniques passed down through generations.
            </p>

            <div className="hero-cta">
              <Link to="/collections" className="cta-btn primary">
                <span className="btn-text">Explore Collection</span>
                <span className="btn-hover"></span>
              </Link>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-image-shape">
              <img src={bgImage} alt="Luxury Accessories" className="hero-image" />
            </div>
          </div>
        </div>

        <div className="craftsmanship-banner">
          <div className="banner-track">
            <span className="banner-item">Handcrafted by Artisans</span>
            <span className="banner-item">Premium Materials</span>
            <span className="banner-item">Timeless Quality</span>
            <span className="banner-item">Ethically Sourced</span>
            <span className="banner-item">Limited Editions</span>
            <span className="banner-item">Heirloom Pieces</span>
            <span className="banner-item">Handcrafted by Artisans</span>
            <span className="banner-item">Premium Materials</span>
            <span className="banner-item">Timeless Quality</span>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="featured-products">
        <div className="section-header">
          <h2 className="section-title">Curated Collections</h2>
          <p className="section-subtitle">Handpicked pieces for the discerning client</p>
          <div className="gold-divider"></div>
        </div>
        
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card" data-product-id={product.id}>
              {product.badge && (
                <div className="product-badge" data-badge={product.badge}>{product.badge}</div>
              )}
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} className="product-image" />
                <button className="quick-view" onClick={() => openQuickView(product)}>
                  Quick View
                </button>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">{product.price}</div>
                <div className="product-actions">
                  <button 
                    className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                    aria-label="Add to wishlist"
                  >
                    <i className={`${isInWishlist(product.id) ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                  <button className="add-to-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="view-all">
          <Link to="/collections" className="view-all-link">
            View All Collections <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Rest of your component remains the same */}
      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image-wrapper">
          <img src="https://images.unsplash.com/photo-1624588057318-5f1b2eb81012?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxyeSUyMG1ha2luZ3xlbnwwfHwwfHx8MA%3D%3D" alt="Master artisan handcrafting luxury accessories" className="about-image" />
          <div className="image-overlay"></div>
        </div>
        
        <div className="about-content">
          <div className="content-inner">
            <h2 className="section-title">The Serene Studio Ethos</h2>
            <div className="gold-divider"></div>
            <p className="about-text">
              Founded in 2015, Serene Studio embodies the perfect harmony between timeless elegance 
              and contemporary design. Each piece in our collection is meticulously crafted by master 
              artisans, using only the finest materials sourced from ethical suppliers worldwide.
            </p>
            
            <ul className="about-values">
              <li>
                <span className="value-icon"><i className="fas fa-check-circle"></i></span>
                <span className="value-text">Ethically sourced materials</span>
              </li>
              <li>
                <span className="value-icon"><i className="fas fa-check-circle"></i></span>
                <span className="value-text">Handcrafted by master artisans</span>
              </li>
              <li>
                <span className="value-icon"><i className="fas fa-check-circle"></i></span>
                <span className="value-text">Sustainable production</span>
              </li>
              <li>
                <span className="value-icon"><i className="fas fa-check-circle"></i></span>
                <span className="value-text">Lifetime craftsmanship guarantee</span>
              </li>
            </ul>

            <Link to="/about" className="cta-btn outline">
              <span>Our Story</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">Client Experiences</h2>
          <p className="section-subtitle">What our discerning clients say</p>
          <div className="gold-divider"></div>
        </div>

        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <div className="client-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              The craftsmanship of my Serene Studio handbag exceeds all expectations. Six months 
              of daily use and it still looks pristine. Worth every penny.
            </p>
            <div className="client-info">
              <div className="client-initial">A</div>
              <div className="client-details">
                <h4 className="client-name">Amelia R.</h4>
                <p className="client-location">Paris, France</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="client-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              I've never owned a scarf as luxurious as this. The silk quality is unmatched and 
              the colors remain vibrant after numerous wears and washes.
            </p>
            <div className="client-info">
              <div className="client-initial">J</div>
              <div className="client-details">
                <h4 className="client-name">James L.</h4>
                <p className="client-location">London, UK</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="client-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p className="testimonial-text">
              The attention to detail in my watch is extraordinary. It's become my signature piece 
              and I constantly receive compliments on its elegant design.
            </p>
            <div className="client-info">
              <div className="client-initial">S</div>
              <div className="client-details">
                <h4 className="client-name">Sophia K.</h4>
                <p className="client-location">New York, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTION */}
      <section className="editorial-section">
        <div className="editorial-content">
          <h2 className="section-title">The Journal</h2>
          <p className="section-subtitle">Style narratives and brand stories</p>
          <div className="gold-divider"></div>
          
          <div className="editorial-grid">
            {articles.map((article, index) => (
              <article key={index} className="editorial-card">
                <img src={article.image} alt={article.title} className="editorial-image" />
                <div className="editorial-details">
                  <span className="editorial-category">{article.category}</span>
                  <h3 className="editorial-title">{article.title}</h3>
                  <p className="editorial-excerpt">{article.excerpt}</p>
                  <a href="#" className="read-more">Read More <i className="fas fa-arrow-right"></i></a>
                </div>
              </article>
            ))}
          </div>
          
          <div className="editorial-footer">
            <Link to="/journal" className="view-all-btn">
              View All Articles <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {showModal && selectedProduct && (
        <div className="modal-overlay" onClick={closeQuickView}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeQuickView} aria-label="Close quick view">
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <h3>{selectedProduct.name}</h3>
                <div className="modal-price">{selectedProduct.price}</div>
                <p>{selectedProduct.description}</p>
                <div className="modal-actions">
                  <button 
                    className={`wishlist-btn ${isInWishlist(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedProduct)}
                  >
                    <i className={`${isInWishlist(selectedProduct.id) ? 'fas' : 'far'} fa-heart`}></i> 
                    {isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="add-to-cart" onClick={() => {
                    addToCart(selectedProduct);
                    closeQuickView();
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;