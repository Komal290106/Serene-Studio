import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Sunglasses = () => {
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
    colors: [],
    uv: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Sample products data
  const [products] = useState([
    {
      id: 1,
      name: "Classic Aviators",
      brand: "Classic Vision",
      description: "Timeless aviator style with UV400 protection",
      price: 999,
      originalPrice: 1499,
      image: "https://a.1stdibscdn.com/archivesE/upload/1121189/v_64308121555137956431/6430812_master.jpg?width=768",
      style: "aviator",
      brandType: "classic",
      color: "black",
      rating: 5,
      ratingCount: 124,
      badges: ["sale"]
    },
    {
      id: 2,
      name: "Retro Round Frames",
      brand: "Urban Edge",
      description: "Vintage-inspired round glasses with a modern twist",
      price: 1299,
      originalPrice: 1799,
      image: "https://i.pinimg.com/736x/3a/79/60/3a796084139d0cbc9c4515650f39f8da.jpg",
      style: "round",
      brandType: "urban",
      color: "brown",
      rating: 4,
      ratingCount: 89,
      badges: []
    },
    {
      id: 3,
      name: "Gold Luxe Frames",
      brand: "Luxury Line",
      description: "Elegant gold finish frames for a premium look",
      price: 1499,
      originalPrice: 2199,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8i0BIPEvLdvm6TZ9_ikyKYg5CwbUm2qJ17A&s",
      style: "square",
      brandType: "luxury",
      color: "gold",
      rating: 4.5,
      ratingCount: 56,
      badges: ["new"]
    },
    {
      id: 4,
      name: "Velour Essence",
      brand: "Serene Studio",
      description: "Sophisticated cat-eye frames with polarized lenses",
      price: 2999,
      originalPrice: 3499,
      image: "https://m.media-amazon.com/images/I/5120odT790L.jpg",
      style: "cat-eye",
      brandType: "serene",
      color: "black",
      rating: 4,
      ratingCount: 78,
      badges: ["trending"]
    },
    {
      id: 5,
      name: "Blue Rays Glasses",
      brand: "Modern Eye",
      description: "Sporty blue frames with photochromic technology",
      price: 3299,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1726626258851-7363d963b345?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ymx1ZSUyMHJheSUyMGdsYXNzZXN8ZW58MHx8MHx8fDA%3D",
      style: "sport",
      brandType: "modern",
      color: "blue",
      rating: 4.5,
      ratingCount: 112,
      badges: ["premium"]
    },
    {
      id: 6,
      name: "Golden Aura",
      brand: "Luxury Optics",
      description: "Premium gold aviators with 100% UV protection",
      price: 3799,
      originalPrice: 4499,
      image: "https://theizzari.com/cdn/shop/files/IZSG63_3_e88c11d2-f9e4-4a6b-8275-dd16db9b3b65.jpg?v=1719066706&width=2048",
      style: "aviator",
      brandType: "luxury",
      color: "gold",
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

      if (filterType === 'styles' || filterType === 'brands' || filterType === 'colors' || filterType === 'uv') {
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
      priceMax: 3000,
      styles: [],
      brands: [],
      colors: [],
      uv: []
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
      const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);

      return priceMatch && styleMatch && brandMatch && colorMatch;
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
      <span key={badge} className={`${badge} badge`}>
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
            <h3>Summer Sale 🕶</h3>
            <p>Up to 40% off on selected frames</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free UV Test</h4>
            <p>Check your current glasses</p>
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

          {/* Frame Style */}
          <div className="filter-group">
            <h4>Frame Style</h4>
            <div className="checkbox-group">
              {['aviator', 'round', 'square', 'cat-eye', 'sport'].map(style => (
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
                   brand === 'classic' ? 'Classic Vision' :
                   brand === 'modern' ? 'Modern Eye' : 'Luxury Optics'}
                </label>
              ))}
            </div>
          </div>

          {/* UV Protection */}
          <div className="filter-group">
            <h4>UV Protection</h4>
            <div className="checkbox-group">
              {['uv100', 'polarized', 'photochromic'].map(uv => (
                <label key={uv}>
                  <input
                    type="checkbox"
                    value={uv}
                    checked={filters.uv.includes(uv)}
                    onChange={(e) => updateFilter('uv', e.target.value)}
                  />
                  {uv === 'uv100' ? 'UV400/100%' :
                   uv === 'polarized' ? 'Polarized' : 'Photochromic'}
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="filter-group">
            <h4>Frame Color</h4>
            <div className="color-filters">
              {[
                { color: 'black', bg: '#2C2C2C' },
                { color: 'brown', bg: '#8B4513' },
                { color: 'gold', bg: '#DAA520' },
                { color: 'silver', bg: '#C0C0C0' },
                { color: 'blue', bg: '#4169E1' }
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
              <h2>Premium Sunglasses Collection</h2>
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

export default Sunglasses;