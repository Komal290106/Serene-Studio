import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const Belts = () => {
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
    priceMin: 499,
    priceMax: 4999,
    types: [],
    brands: [],
    colors: [],
    materials: []
  });

  const [sortOption, setSortOption] = useState('featured');

  // Sample products data
  const [products] = useState([
    {
      id: 13,
      name: "Classic Leather Belt",
      brand: "Serene Studio",
      description: "Genuine leather belt with adjustable buckle",
      price: 1499,
      originalPrice: 2199,
      image: "https://i.pinimg.com/736x/c0/3c/80/c03c802f019d505451e7ce0acd4aa5cf.jpg",
      type: "waist",
      brandType: "serene",
      color: "brown",
      material: "leather",
      badges: ["sale"],
      rating: 5,
      ratingCount: 124
    },
    {
      id: 14,
      name: "Gold Chain Belt",
      brand: "Luxury Belts",
      description: "Elegant gold chain belt with adjustable length",
      price: 2299,
      originalPrice: 3199,
      image: "https://i.pinimg.com/1200x/83/ab/1b/83ab1b35dbfe0dbe1fad45fb6d540c96.jpg",
      type: "chain",
      brandType: "luxury",
      color: "gold",
      material: "metal",
      badges: [],
      rating: 4,
      ratingCount: 89
    },
    {
      id: 15,
      name: "Wide Sash Belt",
      brand: "Modern Accessories",
      description: "Stylish wide sash belt for dresses and coats",
      price: 1299,
      originalPrice: 1899,
      image: "https://i.pinimg.com/736x/45/01/ee/4501eef05ed86874ccd55a9599e66dd1.jpg",
      type: "sash",
      brandType: "modern",
      color: "black",
      material: "fabric",
      badges: ["new"],
      rating: 3.5,
      ratingCount: 56
    },
    {
      id: 16,
      name: "Lace-Up Corset Belt",
      brand: "Luxury Belts",
      description: "Fashionable corset belt with lace-up detail",
      price: 3599,
      originalPrice: 4799,
      image: "https://i.pinimg.com/736x/61/5f/98/615f981aa57cfea3bc85ff525813b578.jpg",
      type: "corset",
      brandType: "luxury",
      color: "black",
      material: "fabric",
      badges: ["trending"],
      rating: 4,
      ratingCount: 78
    },
    {
      id: 17,
      name: "Western Style Belt",
      brand: "Classic Belts",
      description: "Genuine leather belt with western buckle",
      price: 1899,
      originalPrice: 2499,
      image: "https://i.pinimg.com/736x/8d/f5/e4/8df5e4d1e41dbae8012ba34d31c75777.jpg",
      type: "western",
      brandType: "classic",
      color: "brown",
      material: "leather",
      badges: ["premium"],
      rating: 4.5,
      ratingCount: 112
    },
    {
      id: 18,
      name: "Designer Chain Belt",
      brand: "Luxury Belts",
      description: "Premium chain belt with crystal details",
      price: 4299,
      originalPrice: 5999,
      image: "https://i.pinimg.com/1200x/55/d3/23/55d323fd4923b6fa0283c7563a85dabe.jpg",
      type: "chain",
      brandType: "luxury",
      color: "gold",
      material: "metal",
      badges: ["exclusive"],
      rating: 5,
      ratingCount: 203
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

      if (filterType === 'types' || filterType === 'brands' || filterType === 'colors' || filterType === 'materials') {
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
      colors: [],
      materials: []
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
      const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color);
      const materialMatch = filters.materials.length === 0 || filters.materials.includes(product.material);

      return priceMatch && typeMatch && brandMatch && colorMatch && materialMatch;
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
            <h3>Summer Sale ⚡</h3>
            <p>Up to 40% off on selected belts</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <div className="promo-item">
            <h4>Free Gift Wrapping</h4>
            <p>Perfect for presents</p>
          </div>
          <div className="promo-item">
            <h4>Free Shipping</h4>
            <span className="heart">❤</span>
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
                <span>₹{filters.priceMin}</span>
                <span>₹{filters.priceMax}</span>
              </div>
            </div>
          </div>

          {/* Belt Type */}
          <div className="filter-group">
            <h4>Belt Type</h4>
            <div className="checkbox-group">
              {['waist', 'chain', 'sash', 'corset', 'western'].map(type => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={filters.types.includes(type)}
                    onChange={(e) => updateFilter('types', e.target.value)}
                  />
                  {type === 'waist' ? 'Waist Belt' :
                   type === 'chain' ? 'Chain Belt' :
                   type === 'sash' ? 'Sash Belt' :
                   type === 'corset' ? 'Corset Belt' : 'Western Belt'}
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
                   brand === 'classic' ? 'Classic Belts' :
                   brand === 'modern' ? 'Modern Accessories' : 'Luxury Belts'}
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="filter-group">
            <h4>Material</h4>
            <div className="checkbox-group">
              {['leather', 'fabric', 'metal', 'vegan'].map(material => (
                <label key={material}>
                  <input
                    type="checkbox"
                    value={material}
                    checked={filters.materials.includes(material)}
                    onChange={(e) => updateFilter('materials', e.target.value)}
                  />
                  {material.charAt(0).toUpperCase() + material.slice(1)}
                  {material === 'vegan' && ' Leather'}
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="filter-group">
            <h4>Belt Color</h4>
            <div className="color-filters">
              {[
                { color: 'black', bg: '#2C2C2C' },
                { color: 'brown', bg: '#8B4513' },
                { color: 'beige', bg: '#F5F5DC' },
                { color: 'gold', bg: '#D4AF37' },
                { color: 'white', bg: '#FFFFFF' }
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
              <h2>Stylish Belts Collection</h2>
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

export default Belts;