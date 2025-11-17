// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('sereneCart')) || [];
    return savedCart;
  });
  
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('sereneWishlist')) || [];
    return savedWishlist;
  });

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem('sereneCart', JSON.stringify(cart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('sereneWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to cart
  const addToCart = useCallback((product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { 
          ...product, 
          quantity: product.quantity || 1 
        }];
      }
    });
  }, []);

  // Remove from cart
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  }, []);

  // Update cart item quantity
  const updateCartQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  // Add to wishlist
  const addToWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  }, []);

  // Remove from wishlist
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  }, []);

  // Toggle wishlist
  const toggleWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item.id === product.id);
      if (exists) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  }, []);

  // Check if item is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  // Move item from wishlist to cart
  const moveToCart = useCallback((productId) => {
    const item = wishlist.find(item => item.id === productId);
    if (item) {
      addToCart(item);
      removeFromWishlist(productId);
    }
  }, [wishlist, addToCart, removeFromWishlist]);

  // Move item from cart to wishlist
  const moveToWishlist = useCallback((productId) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
      const { quantity, ...productWithoutQuantity } = item;
      addToWishlist(productWithoutQuantity);
      removeFromCart(productId);
    }
  }, [cart, addToWishlist, removeFromCart]);

  // Get cart total
  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
      return total + (price * item.quantity);
    }, 0);
  }, [cart]);

  // Get cart item count
  const getCartItemCount = useCallback(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const value = {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    moveToCart,
    moveToWishlist,
    getCartTotal,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};