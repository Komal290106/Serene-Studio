import React, { useState, useEffect, useCallback } from "react";
import "./product.css";
import { useCart } from '../../context/CartContext'; // Import the context

const HandBags = () => {
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
    priceMin: 999,
    priceMax: 9999,
    types: [],
    brands: [],
    colors: [],
    materials: [],
    sortBy: 'featured'
  });

  // Bags products data
  const [products] = useState([
    {
      id: "7",
      name: "Classic Beige Tote",
      brand: "Serene Studio",
      description: "Spacious tote bag with floral crystal clasp",
      price: 2499,
      originalPrice: 3499,
      image: "https://images.meesho.com/images/products/432114392/qnbjt_512.webp?width=512",
      type: "tote",
      brandType: "serene",
      color: "beige",
      material: "canvas",
      badges: ["sale"],
      rating: 5,
      ratingCount: 124
    },
    {
      id: "8",
      name: "Quilted Leather Crossbody",
      brand: "Luxury Handbags",
      description: "Elegant quilted bag with gold hardware",
      price: 3299,
      originalPrice: 4299,
      image: "https://www.charleskeith.in/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-in-products/default/dw97eb6026/images/hi-res/2024-L6-CK2-00151408-09-1.jpg?sw=756&sh=1008",
      type: "shoulder",
      brandType: "luxury",
      color: "brown",
      material: "leather",
      badges: [],
      rating: 4,
      ratingCount: 89
    },
    {
      id: "9",
      name: "Lilac Mini Crossbody",
      brand: "Modern Carry",
      description: "Compact lavender crossbody with chain strap",
      price: 1899,
      originalPrice: 2499,
      image: "https://i.pinimg.com/236x/3c/c1/b3/3cc1b31fda670ae89c3b7500524da4aa.jpg",
      type: "crossbody",
      brandType: "modern",
      color: "black",
      material: "vegan",
      badges: ["new"],
      rating: 3.5,
      ratingCount: 56
    },
    {
      id: "10",
      name: "White Braided Clutch",
      brand: "Luxury Handbags",
      description: "Stylish clutch with braided handle & detachable chain",
      price: 4599,
      originalPrice: 5999,
      image: "https://miraggiolife.com/cdn/shop/files/gisele-shoulder-bag-672990.jpg?v=1753171621&width=700",
      type: "clutch",
      brandType: "luxury",
      color: "burgundy",
      material: "leather",
      badges: ["trending"],
      rating: 4,
      ratingCount: 78
    },
    {
      id: "11",
      name: "Crochet Style Backpack",
      brand: "Classic Bags",
      description: "Handmade crochet backpack with spacious design",
      price: 2999,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1653491239842-ad464d06c926?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fENyb2NoZXQlMjBTdHlsZSUyMEJhY2twYWNrfGVufDB8fDB8fHww",
      type: "backpack",
      brandType: "classic",
      color: "navy",
      material: "canvas",
      badges: ["premium"],
      rating: 4.5,
      ratingCount: 112
    },
    {
      id: "12",
      name: "White Leather Tote",
      brand: "Luxury Handbags",
      description: "Minimal leather tote with chic gold detail",
      price: 5499,
      originalPrice: 7999,
      image: "https://cdn11.bigcommerce.com/s-hyjjuz0fve/images/stencil/1280x1280/products/16511/78831/hauwawxlunr4y7tym9dv__12749.1747512688.jpg?c=3",
      type: "tote",
      brandType: "luxury",
      color: "black",
      material: "leather",
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

      if (filterType === 'sortBy') {
        return { ...prev, [filterType]: value };
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
      priceMin: 999,
      priceMax: 9999,
      types: [],
      brands: [],
      colors: [],
      materials: [],
      sortBy: 'featured'
    });
  }, []);

  // Sort functionality
  const handleSortChange = useCallback((e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
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
    switch (filters.sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price);
      case 'newest':
        return filtered.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      case 'popular':
        return filtered.sort((a, b) => b.ratingCount - a.ratingCount);
      default:
        return filtered;
    }
  }, [products, filters]);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
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

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (price, originalPrice) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100);
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
            <h3>Summer Sale 👜</h3>
            <p>Up to 40% off on selected bags</p>
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
                min="999"
                max="9999"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', e.target.value)}
                className="range-slider"
              />
              <input
                type="range"
                min="999"
                max="9999"
                value={filters.priceMax}
                onChange={(e) => updateFilter('priceMax', e.target.value)}
                className="range-slider"
              />
              <div className="price-values">
                <span className="heart">&#10084;</span>
                <span>₹{formatPrice(filters.priceMin)}</span>
                <span>₹{formatPrice(filters.priceMax)}</span>
              </div>
            </div>
          </div>

          {/* Bag Type */}
          <div className="filter-group">
            <h4>Bag Type</h4>
            <div className="checkbox-group">
              {['tote', 'backpack', 'clutch', 'shoulder', 'crossbody'].map(type => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={filters.types.includes(type)}
                    onChange={(e) => updateFilter('types', e.target.value)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                  {type === 'crossbody' && ' Bag'}
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
                   brand === 'classic' ? 'Classic Bags' :
                   brand === 'modern' ? 'Modern Carry' : 'Luxury Handbags'}
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div className="filter-group">
            <h4>Material</h4>
            <div className="checkbox-group">
              {['leather', 'canvas', 'suede', 'vegan'].map(material => (
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
            <h4>Bag Color</h4>
            <div className="color-filters">
              {[
                { color: 'black', bg: '#2C2C2C', title: 'Black' },
                { color: 'brown', bg: '#8B4513', title: 'Brown' },
                { color: 'beige', bg: '#F5F5DC', title: 'Beige' },
                { color: 'navy', bg: '#000080', title: 'Navy' },
                { color: 'burgundy', bg: '#800020', title: 'Burgundy' }
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
              <h2>Stylish Bags Collection</h2>
              <p className="results-count">
                Showing <span id="productCount">{currentProducts.length}</span> products
              </p>
            </div>
            <div className="sort-options">
              <select 
                value={filters.sortBy}
                onChange={handleSortChange}
              >
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
                      <div className="stars">{renderStars(product.rating)}</div>
                      <span className="rating-count">({product.ratingCount})</span>
                    </div>
                    <div className="price-section">
                      <span className="current-price">₹{formatPrice(product.price)}</span>
                      {product.originalPrice !== product.price && (
                        <>
                          <span className="original-price">₹{formatPrice(product.originalPrice)}</span>
                          <span className="discount">
                            {calculateDiscount(product.price, product.originalPrice)}% off
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

export default HandBags;