// src/services/productService.js

// In-memory storage for products
let productsStore = [];
let listeners = [];

// Default products
const defaultProducts = [
  {
    id: "1",
    name: "Sienna Leather Tote",
    description: "Italian full-grain leather with gold hardware",
    price: 15000,
    category: "handbags",
    image: "https://plus.unsplash.com/premium_photo-1670984076180-22a6c8f27f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVhdGhlciUyMHRvdGV8ZW58MHx8MHx8fDA%3D",
    badge: "New",
    inStock: true,
    stockCount: 15,
    featured: true,
    bestseller: false,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    name: "Florentine Silk Scarf",
    description: "Hand-rolled edges with exclusive print",
    price: 2000,
    category: "scarves",
    image: "https://i.pinimg.com/1200x/75/17/15/751715c9b57a0a293688c4b248e0a7ce.jpg",
    badge: "Bestseller",
    inStock: true,
    stockCount: 42,
    featured: true,
    bestseller: true,
    rating: 4.9,
    reviews: 287
  },
  {
    id: "3",
    name: "Geneva Automatic Watch",
    description: "Swiss movement with sapphire crystal",
    price: 11250,
    category: "watches",
    image: "https://images.unsplash.com/photo-1607776905497-b4f788205f6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGdlbmV2YSUyMHdhdGNofGVufDB8fDB8fHww",
    badge: null,
    inStock: true,
    stockCount: 8,
    featured: true,
    bestseller: false,
    rating: 4.7,
    reviews: 96
  },
  {
    id: "4",
    name: "Venice Leather Clutch",
    description: "Hand-stitched with antique brass closure",
    price: 3320,
    category: "handbags",
    image: "https://images.unsplash.com/photo-1749294435694-ce3c586591e6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVhdGhlciUyMGNsdXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    badge: "Limited",
    inStock: true,
    stockCount: 5,
    featured: true,
    bestseller: false,
    rating: 4.6,
    reviews: 54
  }
];

// Initialize products store
export const initializeProducts = () => {
  if (productsStore.length === 0) {
    productsStore = [...defaultProducts];
  }
};

// Subscribe to product changes
export const subscribeToProducts = (callback) => {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter(listener => listener !== callback);
  };
};

// Notify all listeners
const notifyListeners = () => {
  listeners.forEach(listener => listener([...productsStore]));
};

// Get all products
export const getAllProducts = () => {
  initializeProducts();
  return [...productsStore];
};

// Get product by ID
export const getProductById = (id) => {
  return productsStore.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return productsStore.filter(product => product.category === category);
};

// Format price
export const formatPrice = (price) => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Add product (Admin)
export const addProduct = (product) => {
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    dateAdded: new Date().toISOString()
  };
  productsStore.push(newProduct);
  notifyListeners();
  return newProduct;
};

// Update product (Admin)
export const updateProduct = (id, updates) => {
  const index = productsStore.findIndex(p => p.id === id);
  if (index !== -1) {
    productsStore[index] = { ...productsStore[index], ...updates };
    notifyListeners();
    return productsStore[index];
  }
  return null;
};

// Delete product (Admin)
export const deleteProduct = (id) => {
  productsStore = productsStore.filter(p => p.id !== id);
  notifyListeners();
  return true;
};

// Reset to default products (useful for testing)
export const resetProducts = () => {
  productsStore = [...defaultProducts];
  notifyListeners();
};