import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Scarves = () => {
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

  // Filter state for scarves
  const [filters, setFilters] = useState({
    priceMin: 499,
    priceMax: 4999,
    types: [],
    brands: [],
    patterns: [],
    colors: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Sample scarves products data - All 6 products included
  const [products] = useState([
    {
      id: 13,
      name: "Silk Evening Scarf",
      brand: "Luxury Textiles",
      description: "Pure silk scarf with hand-rolled edges",
      price: 2499,
      originalPrice: 3499,
      image: "https://i.pinimg.com/1200x/e5/f5/b6/e5f5b6493f31fe481bb10b5bf889ceda.jpg",
      type: "silk",
      brandType: "luxury",
      color: "burgundy",
      pattern: "solid",
      rating: 5,
      ratingCount: 124,
      badges: ["sale"]
    },
    {
      id: 14,
      name: "Cashmere Winter Wrap",
      brand: "Serene Studio",
      description: "Luxuriously soft cashmere for cold days",
      price: 3299,
      originalPrice: 4299,
      image: "https://i.pinimg.com/736x/05/8d/04/058d04d49ae947622e3c44e06e7b6a95.jpg",
      type: "cashmere",
      brandType: "serene",
      color: "cream",
      pattern: "solid",
      rating: 4,
      ratingCount: 89,
      badges: []
    },
    {
      id: 15,
      name: "Linen Spring Scarf",
      brand: "Modern Weave",
      description: "Lightweight linen perfect for spring",
      price: 1899,
      originalPrice: 2499,
      image: "https://i.pinimg.com/1200x/d9/23/4c/d9234cf58bd46587d4241681f4786d8c.jpg",
      type: "linen",
      brandType: "modern",
      color: "emerald",
      pattern: "floral",
      rating: 4.5,
      ratingCount: 56,
      badges: ["new"]
    },
    {
      id: 16,
      name: "Navy Silk Square",
      brand: "Luxury Textiles",
      description: "Classic square scarf with floral print",
      price: 4599,
      originalPrice: 5999,
      image: "https://i.pinimg.com/1200x/e2/40/c4/e240c49bb58461cd54ef8f86474af0cb.jpg",
      type: "silk",
      brandType: "luxury",
      color: "navy",
      pattern: "floral",
      rating: 4,
      ratingCount: 78,
      badges: ["trending"]
    },
    {
      id: 17,
      name: "Wool Blend Scarf",
      brand: "Classic Scarves",
      description: "Warm wool blend with fringe details",
      price: 2999,
      originalPrice: 3999,
      image: "https://i.pinimg.com/1200x/75/17/15/751715c9b57a0a293688c4b248e0a7ce.jpg",
      type: "wool",
      brandType: "classic",
      color: "mustard",
      pattern: "striped",
      rating: 4.5,
      ratingCount: 112,
      badges: ["premium"]
    },
    {
      id: 18,
      name: "Signature Cashmere Wrap",
      brand: "Luxury Textiles",
      description: "Extra-large cashmere scarf with tassels",
      price: 5499,
      originalPrice: 7999,
      image: "https://i.pinimg.com/1200x/18/e4/46/18e446e922dfaee085412fb0cc87fc22.jpg",
      type: "cashmere",
      brandType: "luxury",
      color: "cream",
      pattern: "printed",
      rating: 5,
      ratingCount: 203,
      badges: ["exclusive"]
    }
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

  // Filter functionality for scarves
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      if (filterType === 'priceMin' || filterType === 'priceMax') {
        return { ...prev, [filterType]: parseInt(value) };
      }

      if (filterType === 'types' || filterType === 'brands' || filterType === 'patterns' || filterType === 'colors') {
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
      priceMin: 499,
      priceMax: 4999,
      types: [],
      brands: [],
      patterns: [],
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
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brandType);
      const patternMatch = filters.patterns.length === 0 || filters.patterns.includes(product.pattern);
      const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);

      return priceMatch && typeMatch && brandMatch && patternMatch && colorMatch;
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
            <i className={`fas fa-${
              notification.type === 'success' ? 'check-circle' :
              notification.type === 'error' ? 'exclamation-circle' :
              notification.type === 'warning' ? 'exclamation-triangle' : 'info-circle'
            }`}></i>
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
            <h3>Autumn Collection 🧣</h3>
            <p>New scarf designs for the season</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free Gift Wrapping</h4>
            <p>Perfect for presents</p>
          </div>
          <div className="promo-item">
            <h4>Free Shipping</h4>
            <span className="heart">&#10084;</span>
            <p>On orders above ₹1999</p>
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
                min="499"
                max="4999"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', e.target.value)}
                className="range-slider"
              />
              <input
                type="range"
                min="499"
                max="4999"
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

          {/* Scarf Type */}
          <div className="filter-group">
            <h4>Scarf Type</h4>
            <div className="checkbox-group">
              {['silk', 'cashmere', 'wool', 'linen', 'cotton'].map(type => (
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

          {/* Brand */}
          <div className="filter-group">
            <h4>Brand</h4>
            <div className="checkbox-group">
              {['serene', 'classic', 'modern', 'luxury'].map(brand => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={(e) => updateFilter('brands', e.target.value)}
                  />
                  {brand === 'serene' ? 'Serene Studio' :
                   brand === 'classic' ? 'Classic Scarves' :
                   brand === 'modern' ? 'Modern Weave' : 'Luxury Textiles'}
                </label>
              ))}
            </div>
          </div>

          {/* Pattern */}
          <div className="filter-group">
            <h4>Pattern</h4>
            <div className="checkbox-group">
              {['solid', 'printed', 'striped', 'floral'].map(pattern => (
                <label key={pattern}>
                  <input
                    type="checkbox"
                    value={pattern}
                    checked={filters.patterns.includes(pattern)}
                    onChange={(e) => updateFilter('patterns', e.target.value)}
                  />
                  {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="filter-group">
            <h4>Scarf Color</h4>
            <div className="color-filters">
              {[
                { color: 'burgundy', bg: '#800020' },
                { color: 'cream', bg: '#FFFDD0' },
                { color: 'navy', bg: '#000080' },
                { color: 'emerald', bg: '#50C878' },
                { color: 'mustard', bg: '#FFDB58' }
              ].map(colorObj => (
                <button
                  key={colorObj.color}
                  className={`color-filter ${filters.colors.includes(colorObj.color) ? 'active' : ''}`}
                  style={{ background: colorObj.bg }}
                  title={colorObj.color.charAt(0).toUpperCase() + colorObj.color.slice(1)}
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
              <h2>Luxury Scarves</h2>
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
            {currentProducts.map((product, index) => (
              <div 
                key={product.id} 
                className={`product-card ${index === 5 ? 'sixth-product' : ''}`}
              >
                <div className="product-image-container">
                  <div
                    className={`wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(product)}
                  >
                    <i className={isInWishlist(product.id) ? 'fas fa-heart' : 'far fa-heart'}></i>
                  </div>

                  <img src={product.image} alt={product.name} className="product-image" />

                  <div className="product-badges">
                    {renderBadges(product.badges)}
                    {index === 5 && <span className="badge sixth">6th Product</span>}
                  </div>
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
                    <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="discount">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                    </span>
                  </div>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="load-more-section">
            <button
              className="load-more-btn"
              onClick={() => showNotification('info', 'Feature Coming Soon', 'Load more functionality will be added soon')}
            >
              Load More Products
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Scarves;