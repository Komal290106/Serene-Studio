import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Jewelry = () => {
  // Use CartContext instead of local state
  const { 
    addToCart: contextAddToCart, 
    toggleWishlist: contextToggleWishlist, 
    isInWishlist: contextIsInWishlist 
  } = useCart();

  // State management
  const [notifications, setNotifications] = useState([]);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    priceMin: 500,
    priceMax: 10000,
    types: [],
    materials: [],
    occasions: [],
    colors: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Jewelry products data
  const [products] = useState([
    {
      id: 19,
      name: "Elegant Gold Necklace",
      brand: "Tanishq",
      description: "22k plated designer necklace",
      price: 2999,
      originalPrice: 4499,
      image: "https://i.pinimg.com/originals/8c/ef/c9/8cefc9c9f5d132a345ee7f92e6a46093.jpg",
      type: "necklace",
      material: "gold",
      occasion: "wedding",
      color: "gold",
      rating: 5,
      ratingCount: 124,
      badges: ["sale"]
    },
    {
      id: 20,
      name: "Silver Hoop Earrings",
      brand: "Voylla",
      description: "Trendy sterling silver hoops",
      price: 1999,
      originalPrice: 2499,
      image: "https://tse2.mm.bing.net/th/id/OIP.DqhCTmNCWaE8vMa9SQyuDgHaGB?rs=1&pid=ImgDetMain",
      type: "earrings",
      material: "silver",
      occasion: "casual",
      color: "silver",
      rating: 4,
      ratingCount: 89,
      badges: ["new"]
    },
    {
      id: 21,
      name: "Diamond Engagement Ring",
      brand: "PC Jewellers",
      description: "18k gold diamond ring",
      price: 3499,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1613945407943-59cd755fd69e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGlhbW9uZCUyMHJpbmd8ZW58MHx8MHx8fDA%3D",
      type: "ring",
      material: "diamond",
      occasion: "wedding",
      color: "silver",
      rating: 4.5,
      ratingCount: 56,
      badges: []
    },
    {
      id: 22,
      name: "Rose Gold Bracelet",
      brand: "Malabar",
      description: "Elegant bracelet with crystals",
      price: 1599,
      originalPrice: 2199,
      image: "https://tse1.mm.bing.net/th/id/OIP.go9LLnqFG6AyiMglMUr3VQHaHa?rs=1&pid=ImgDetMain",
      type: "bracelet",
      material: "gold",
      occasion: "party",
      color: "rose-gold",
      rating: 4,
      ratingCount: 78,
      badges: ["trending"]
    },
    {
      id: 23,
      name: "Traditional Silver Bangles",
      brand: "Tribal",
      description: "Silver bangles for women",
      price: 1299,
      originalPrice: 1299,
      image: "https://i.pinimg.com/736x/a5/43/07/a54307cd624801a21c9f439df5af0862.jpg",
      type: "bangles",
      material: "silver",
      occasion: "festive",
      color: "silver",
      rating: 4.5,
      ratingCount: 112,
      badges: []
    },
    {
      id: 24,
      name: "Bridal Jewelry Set",
      brand: "Kalyan",
      description: "Heavy bridal necklace, earrings & bangles",
      price: 4999,
      originalPrice: 7999,
      image: "https://images.unsplash.com/photo-1640183298005-3a4497cc6a37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amV3ZWxscnklMjBzZXR8ZW58MHx8MHx8fDA%3D",
      type: "necklace",
      material: "gold",
      occasion: "wedding",
      color: "gold",
      rating: 5,
      ratingCount: 203,
      badges: ["exclusive"]
    },
  ]);

  // Remove the localStorage effects since CartContext handles this

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Notification system
  const showNotification = useCallback((type, title, message) => {
    const id = Date.now();
    const notification = { id, type, title, message };

    setNotifications(prev => [...prev, notification]);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  // Cart functionality - use context with notifications
  const addToCart = useCallback((product) => {
    contextAddToCart(product);
    showNotification('success', 'Added to Cart', `${product.name} has been added to your cart`);
  }, [contextAddToCart, showNotification]);

  // Wishlist functionality - use context with notifications
  const toggleWishlist = useCallback((product) => {
    const isInWishlist = contextIsInWishlist(product.id);
    contextToggleWishlist(product);
    
    if (isInWishlist) {
      showNotification('info', 'Removed from Wishlist', `${product.name} has been removed from your wishlist`);
    } else {
      showNotification('success', 'Added to Wishlist', `${product.name} has been added to your wishlist`);
    }
  }, [contextToggleWishlist, contextIsInWishlist, showNotification]);

  const isInWishlist = useCallback((productId) => {
    return contextIsInWishlist(productId);
  }, [contextIsInWishlist]);

  // Filter functionality
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      if (filterType === 'priceMin' || filterType === 'priceMax') {
        return { ...prev, [filterType]: parseInt(value) };
      }

      if (filterType === 'types' || filterType === 'materials' || filterType === 'occasions' || filterType === 'colors') {
        const currentArray = prev[filterType];
        const newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
        return { ...prev, [filterType]: newArray };
      }

      return prev;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      priceMin: 500,
      priceMax: 10000,
      types: [],
      materials: [],
      occasions: [],
      colors: []
    });
  }, []);

  // Sort functionality
  const handleSortChange = useCallback((e) => {
    setSortOption(e.target.value);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useCallback(() => {
    let filtered = products.filter(product => {
      const priceMatch = product.price >= filters.priceMin && product.price <= filters.priceMax;
      const typeMatch = filters.types.length === 0 || filters.types.includes(product.type);
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material);
      const occasionMatch = filters.occasions.length === 0 || filters.occasions.includes(product.occasion);
      const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);

      return priceMatch && typeMatch && materialMatch && occasionMatch && colorMatch;
    });

    // Sort products
    switch (sortOption) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => b.id - a.id);
      case 'popular':
        return filtered.sort((a, b) => b.ratingCount - a.ratingCount);
      default:
        return filtered;
    }
  }, [products, filters, sortOption]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  // Render product badges
  const renderBadges = (badges) => {
    return badges.map(badge => (
      <span key={badge} className={`badge ${badge}`}>
        {badge.charAt(0).toUpperCase() + badge.slice(1)}
      </span>
    ));
  };

  const currentProducts = filteredAndSortedProducts();

  return (
    <div className="products-page">
      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type} show`}>
            <i className={`fas fa-${notification.type === 'success' ? 'check-circle' :
                           notification.type === 'error' ? 'exclamation-circle' :
                           notification.type === 'warning' ? 'exclamation-triangle' : 'info-circle'}`}></i>
            <div className="notification-content">
              <div className="notification-title">{notification.title}</div>
              <div className="notification-message">{notification.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Promotional Banner */}
      <section className="promo-banner">
        <div className="promo-content">
          <div className="promo-item featured">
            <h3>Festive Jewelry Sale 💎</h3>
            <p>Up to 50% off on selected pieces</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free Gift Wrap</h4>
            <p>On all orders above ₹1500</p>
          </div>
          <div className="promo-item">
            <h4>Free Shipping</h4>
            <span className="heart">&#10084;</span>
            <p>On orders above ₹999</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        {/* Mobile Filter Toggle */}
        <div className="mobile-filter-toggle">
          <button
            className="filter-toggle-btn"
            onClick={() => setIsFiltersActive(true)}
          >
            <i className="fas fa-filter"></i> Filters
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`filters-sidebar ${isFiltersActive ? 'active' : ''}`}>
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="clear-filters" onClick={clearAllFilters}>
              Clear All
            </button>
            <button
              className="close-filters"
              onClick={() => setIsFiltersActive(false)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
              <input
                type="range"
                min="500"
                max="10000"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', e.target.value)}
                className="range-slider"
              />
              <input
                type="range"
                min="500"
                max="10000"
                value={filters.priceMax}
                onChange={(e) => updateFilter('priceMax', e.target.value)}
                className="range-slider"
              />
              <div className="price-values">
                <span className="heart">&#10084;</span>
                <span>₹{filters.priceMin}</span>
                <span>₹{filters.priceMax}</span>
              </div>
            </div>
          </div>

          {/* Jewelry Type */}
          <div className="filter-group">
            <h4>Jewelry Type</h4>
            <div className="checkbox-group">
              {['necklace', 'earrings', 'ring', 'bracelet', 'bangles'].map(type => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={filters.types.includes(type)}
                    onChange={(e) => updateFilter('types', e.target.value)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="filter-group">
            <h4>Material</h4>
            <div className="checkbox-group">
              {['gold', 'silver', 'diamond', 'platinum', 'pearl'].map(material => (
                <label key={material}>
                  <input
                    type="checkbox"
                    value={material}
                    checked={filters.materials.includes(material)}
                    onChange={(e) => updateFilter('materials', e.target.value)}
                  />
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div className="filter-group">
            <h4>Occasion</h4>
            <div className="checkbox-group">
              {[
                { value: 'wedding', label: 'Wedding' },
                { value: 'party', label: 'Party' },
                { value: 'casual', label: 'Everyday Wear' },
                { value: 'festive', label: 'Festive' }
              ].map(occasion => (
                <label key={occasion.value}>
                  <input
                    type="checkbox"
                    value={occasion.value}
                    checked={filters.occasions.includes(occasion.value)}
                    onChange={(e) => updateFilter('occasions', e.target.value)}
                  />
                  {occasion.label}
                </label>
              ))}
            </div>
          </div>

          {/* Color Accent */}
          <div className="filter-group">
            <h4>Stone/Accent Color</h4>
            <div className="color-filters">
              {[
                { color: 'gold', bg: '#DAA520', title: 'Gold' },
                { color: 'silver', bg: '#C0C0C0', title: 'Silver' },
                { color: 'rose-gold', bg: '#B76E79', title: 'Rose Gold' },
                { color: 'ruby', bg: '#9B111E', title: 'Ruby Red' },
                { color: 'emerald', bg: '#046307', title: 'Emerald Green' },
                { color: 'sapphire', bg: '#0F52BA', title: 'Sapphire Blue' }
              ].map(colorObj => (
                <button
                  key={colorObj.color}
                  className={`color-filter ${filters.colors.includes(colorObj.color) ? 'active' : ''}`}
                  style={{ background: colorObj.bg }}
                  title={colorObj.title}
                  onClick={() => updateFilter('colors', colorObj.color)}
                ></button>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <section className="products-section">
          <div className="products-header">
            <div className="products-info">
              <h2>Premium Jewelry Collection</h2>
              <p className="results-count">
                Showing <span id="productCount">{currentProducts.length}</span> products
              </p>
            </div>
            <div className="sort-options">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <div className="products-grid">
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <div
                      className={`wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}`}
                      onClick={() => toggleWishlist(product)}
                    >
                      <i className={isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                    </div>

                    <img src={product.image} alt={product.name} className="product-image" />

                    {product.badges.length > 0 && (
                      <div className="product-badges">
                        {renderBadges(product.badges)}
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="product-rating">
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="rating-count">({product.ratingCount})</span>
                    </div>
                    <div className="price-section">
                      <span className="current-price">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice !== product.price && (
                        <>
                          <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                          <span className="discount">
                            {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>
                    <button
                      className="add-to-cart"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-message">
                <div className="no-products-content">
                  <i className="fas fa-search"></i>
                  <h3>No Products Found</h3>
                  <p>Try adjusting your filters to see more products</p>
                  <button className="clear-filters-btn" onClick={clearAllFilters}>
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Load More */}
          {currentProducts.length > 0 && (
            <div className="load-more-section">
              <button
                className="load-more-btn"
                onClick={() => showNotification('info', 'Feature Coming Soon', 'Load more functionality will be added soon')}
              >
                Load More Products
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Jewelry;