import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Watches = () => {
  // Use CartContext instead of local state
  const { 
    addToCart: contextAddToCart, 
    toggleWishlist: contextToggleWishlist, 
    isInWishlist: contextIsInWishlist 
  } = useCart();

  // State management
  const [notifications, setNotifications] = useState([]);
  const [isFiltersActive, setIsFiltersActive] = useState(false);

  // Filter state
  const [filters, setFilters] = useState({
    priceMin: 1000,
    priceMax: 50000,
    styles: [],
    brands: [],
    colors: [],
    straps: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Sample watches data
  const [products] = useState([
    {
      id: 101,
      name: "Classic Black Analog",
      brand: "Fossil",
      description: "Leather strap, water-resistant",
      price: 4999,
      originalPrice: 7499,
      image: "https://images-na.ssl-images-amazon.com/images/I/81OqOiZjG%2BL.UX569.jpg",
      style: "analog",
      brandType: "fossil",
      color: "black",
      strap: "leather",
      rating: 4,
      ratingCount: 89,
      badges: ["sale"]
    },
    {
      id: 102,
      name: "Silver Digital Sport",
      brand: "Casio",
      description: "Stopwatch & backlight features",
      price: 6999,
      originalPrice: 8499,
      image: "https://tse1.mm.bing.net/th/id/OIP.ARUnhB7pdMpq9n7d2Yk5YAHaLc?rs=1&pid=ImgDetMain&o=7&rm=3",
      style: "digital",
      brandType: "casio",
      color: "silver",
      strap: "metal",
      rating: 4.5,
      ratingCount: 124,
      badges: ["new"]
    },
    {
      id: 103,
      name: "Omega Constellation",
      brand: "Omega",
      description: "Blue dial, rose gold bezel elegance",
      price: 12999,
      originalPrice: 15999,
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b21lZ2ElMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      style: "analog",
      brandType: "omega",
      color: "blue",
      strap: "metal",
      rating: 5,
      ratingCount: 56,
      badges: []
    },
    {
      id: 104,
      name: "Elegant Gold Analog",
      brand: "Titan",
      description: "Metal strap, classy design",
      price: 8999,
      originalPrice: 12499,
      image: "https://img.freepik.com/premium-photo/luxury-gold-analog-watch-men-women_63106-6826.jpg",
      style: "analog",
      brandType: "titan",
      color: "gold",
      strap: "metal",
      rating: 4,
      ratingCount: 78,
      badges: []
    },
    {
      id: 105,
      name: "Brown Chronograph",
      brand: "Timex",
      description: "Stopwatch, date display",
      price: 3499,
      originalPrice: 4999,
      image: "https://th.bing.com/th?id=OPAC.%2bw956hxAcQ8asA474C474&w=592&h=550&o=5&dpr=1.3&pid=21.1",
      style: "chronograph",
      brandType: "timex",
      color: "brown",
      strap: "leather",
      rating: 4.5,
      ratingCount: 45,
      badges: []
    },
    {
      id: 106,
      name: "Luxury Smartwatch",
      brand: "Samsung",
      description: "Premium features, sleek design",
      price: 15999,
      originalPrice: 19999,
      image: "https://images.unsplash.com/photo-1680113727062-8a118574b782?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Ftc3VuZyUyMHdhdGNofGVufDB8fDB8fHww",
      style: "smartwatch",
      brandType: "samsung",
      color: "silver",
      strap: "silicone",
      rating: 4.5,
      ratingCount: 203,
      badges: ["exclusive"]
    }
  ]);

  // Remove the localStorage effects since CartContext handles this

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

      if (filterType === 'styles' || filterType === 'brands' || filterType === 'colors' || filterType === 'straps') {
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
      priceMin: 1000,
      priceMax: 50000,
      styles: [],
      brands: [],
      colors: [],
      straps: []
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
      const strapMatch = filters.straps.length === 0 || filters.straps.includes(product.strap);

      return priceMatch && styleMatch && brandMatch && colorMatch && strapMatch;
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
            <h3>Luxury Watches Sale ⌚</h3>
            <p>Up to 40% off on selected models</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free Warranty</h4>
            <p>On all premium watches</p>
          </div>
          <div className="promo-item">
            <h4>Fast Delivery</h4>
            <span className="heart">&#10084;</span>
            <p>Across India within 3–5 days</p>
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
                min="1000"
                max="50000"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', e.target.value)}
                className="range-slider"
              />
              <input
                type="range"
                min="1000"
                max="50000"
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

          {/* Watch Type */}
          <div className="filter-group">
            <h4>Type</h4>
            <div className="checkbox-group">
              {['analog', 'digital', 'smartwatch', 'chronograph'].map(style => (
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

          {/* Strap Material */}
          <div className="filter-group">
            <h4>Strap Material</h4>
            <div className="checkbox-group">
              {['leather', 'metal', 'ceramic', 'silicone'].map(strap => (
                <label key={strap}>
                  <input
                    type="checkbox"
                    value={strap}
                    checked={filters.straps.includes(strap)}
                    onChange={(e) => updateFilter('straps', e.target.value)}
                  />
                  {strap.charAt(0).toUpperCase() + strap.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Brand */}
          <div className="filter-group">
            <h4>Brand</h4>
            <div className="checkbox-group">
              {['rolex', 'omega', 'casio', 'fossil', 'titan'].map(brand => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    value={brand}
                    checked={filters.brands.includes(brand)}
                    onChange={(e) => updateFilter('brands', e.target.value)}
                  />
                  {brand.charAt(0).toUpperCase() + brand.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Dial Color */}
          <div className="filter-group">
            <h4>Dial Color</h4>
            <div className="color-filters">
              {[
                { color: 'black', bg: '#2C2C2C' },
                { color: 'white', bg: '#FFFFFF', border: '1px solid #ccc' },
                { color: 'blue', bg: '#1E3A8A' },
                { color: 'gold', bg: '#DAA520' },
                { color: 'silver', bg: '#C0C0C0' }
              ].map(colorObj => (
                <button
                  key={colorObj.color}
                  className={`color-filter ${filters.colors.includes(colorObj.color) ? 'active' : ''}`}
                  style={{ background: colorObj.bg, border: colorObj.border || 'none' }}
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
              <h2>Premium Watch Collection</h2>
              <p className="results-count">
                Showing <span id="productCount">{currentProducts.length}</span> products
              </p>
            </div>
            <div className="sort-options">
              <select value={sortOption} onChange={handleSortChange}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
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

export default Watches;