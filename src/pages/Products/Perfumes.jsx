import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Perfumes = () => {
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
    priceMax: 5000,
    styles: [],
    brands: [],
    sizes: [],
    intensity: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Sample perfumes data
  const [products] = useState([
    {
      id: 7,
      name: "Golden Aura",
      brand: "Luxury Fragrance",
      description: "Premium oud & amber blend for a royal touch",
      price: 2999,
      originalPrice: 3499,
      image: "https://as1.ftcdn.net/v2/jpg/07/82/85/28/1000_F_782852839_HmQDW5Rq4w3AGm5zQ9kg1gy1vOp7k8Ww.jpg",
      style: "oriental",
      brandType: "luxury",
      size: "100ml",
      intensity: "strong",
      rating: 5,
      ratingCount: 152,
      badges: ["sale"]
    },
    {
      id: 8,
      name: "Ocean Breeze",
      brand: "Serene Studio",
      description: "Fresh aquatic notes with a hint of citrus",
      price: 1299,
      originalPrice: 1799,
      image: "https://plus.unsplash.com/premium_photo-1752485892414-6656876bf49b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjBicmVlemUlMjBwZXJmdW1lfGVufDB8fDB8fHww",
      style: "fresh",
      brandType: "serene",
      size: "50ml",
      intensity: "light",
      rating: 4,
      ratingCount: 89,
      badges: []
    },
    {
      id: 9,
      name: "Floral Bliss",
      brand: "Classic Essence",
      description: "Romantic blend of rose and jasmine",
      price: 1499,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1713998576695-379669c88439?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmxvcmFsJTIwYmxpc3MlMjBwZXJmdW1lfGVufDB8fDB8fHww",
      style: "floral",
      brandType: "classic",
      size: "100ml",
      intensity: "medium",
      rating: 4.5,
      ratingCount: 56,
      badges: ["new"]
    },
    {
      id: 10,
      name: "Woody Musk",
      brand: "Luxury Fragrance",
      description: "Rich sandalwood and musk combination",
      price: 2999,
      originalPrice: 3499,
      image: "https://tse4.mm.bing.net/th/id/OIP.EDL59YuLCArARQwIlkZYYAHaHW?rs=1&pid=ImgDetMain&o=7&rm=3",
      style: "woody",
      brandType: "luxury",
      size: "100ml",
      intensity: "strong",
      rating: 4,
      ratingCount: 78,
      badges: ["trending"]
    },
    {
      id: 11,
      name: "Citrus Splash",
      brand: "Modern Scent",
      description: "Zesty blend of lemon and bergamot",
      price: 3299,
      originalPrice: 3999,
      image: "https://www.birkholz-perfumes.com/cdn/shop/files/citrus-splash_f3a4d220-4ab4-44a6-bbd8-497346a76535.jpg?v=1669639147&width=1920",
      style: "citrus",
      brandType: "modern",
      size: "50ml",
      intensity: "light",
      rating: 4.5,
      ratingCount: 112,
      badges: ["premium"]
    },
    {
      id: 12,
      name: "Evening Elegance",
      brand: "Luxury Fragrance",
      description: "Opulent blend of vanilla and spices",
      price: 3799,
      originalPrice: 4499,
      image: "https://img.freepik.com/premium-photo/elegant-perfume-bottle-with-lavender-blossoms_853388-224.jpg",
      style: "oriental",
      brandType: "luxury",
      size: "100ml",
      intensity: "strong",
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

  // Filter functionality
  const updateFilter = useCallback((filterType, value) => {
    setFilters(prev => {
      if (filterType === 'priceMin' || filterType === 'priceMax') {
        return { ...prev, [filterType]: parseInt(value) };
      }

      if (filterType === 'styles' || filterType === 'brands' || filterType === 'sizes' || filterType === 'intensity') {
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
      priceMax: 5000,
      styles: [],
      brands: [],
      sizes: [],
      intensity: []
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
      const styleMatch = filters.styles.length === 0 || filters.styles.includes(product.style);
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brandType);
      const sizeMatch = filters.sizes.length === 0 || filters.sizes.includes(product.size);
      const intensityMatch = filters.intensity.length === 0 || filters.intensity.includes(product.intensity);

      return priceMatch && styleMatch && brandMatch && sizeMatch && intensityMatch;
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
            <h3>Summer Fragrance Sale 💐</h3>
            <p>Up to 40% off on selected perfumes</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free Sample Kit</h4>
            <p>With every purchase above ₹1999</p>
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
                max="5000"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', e.target.value)}
                className="range-slider"
              />
              <input
                type="range"
                min="500"
                max="5000"
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

          {/* Fragrance Type */}
          <div className="filter-group">
            <h4>Fragrance Type</h4>
            <div className="checkbox-group">
              {['floral', 'woody', 'citrus', 'oriental', 'fresh'].map(style => (
                <label key={style}>
                  <input
                    type="checkbox"
                    value={style}
                    checked={filters.styles.includes(style)}
                    onChange={(e) => updateFilter('styles', e.target.value)}
                  />
                  {style.charAt(0).toUpperCase() + style.slice(1)}
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
                   brand === 'classic' ? 'Classic Essence' :
                   brand === 'modern' ? 'Modern Scent' : 'Luxury Fragrance'}
                </label>
              ))}
            </div>
          </div>

          {/* Intensity */}
          <div className="filter-group">
            <h4>Intensity</h4>
            <div className="checkbox-group">
              {['light', 'medium', 'strong'].map(intensity => (
                <label key={intensity}>
                  <input
                    type="checkbox"
                    value={intensity}
                    checked={filters.intensity.includes(intensity)}
                    onChange={(e) => updateFilter('intensity', e.target.value)}
                  />
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Bottle Size */}
          <div className="filter-group">
            <h4>Bottle Size</h4>
            <div className="checkbox-group">
              {['30ml', '50ml', '100ml'].map(size => (
                <label key={size}>
                  <input
                    type="checkbox"
                    value={size}
                    checked={filters.sizes.includes(size)}
                    onChange={(e) => updateFilter('sizes', e.target.value)}
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <section className="products-section">
          <div className="products-header">
            <div className="products-info">
              <h2>Timeless Perfume Collection</h2>
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
            {currentProducts.map(product => (
              <div key={product.id} className="product-card">
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

export default Perfumes;