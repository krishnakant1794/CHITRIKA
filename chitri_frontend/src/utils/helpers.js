// chitri_frontend/src/utils/helpers.js
// This file can contain various utility functions

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(price);
};

// Simple ID generator (for temporary use or if backend doesn't provide one for certain items)
export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Function to dynamically load external scripts (e.g., Razorpay SDK)
export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      console.log(`Script loaded: ${src}`);
      resolve(true);
    };
    script.onerror = () => {
      console.error(`Script failed to load: ${src}`);
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Add more helper functions as needed
