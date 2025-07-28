// chitri_frontend/src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('chitri_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('chitri_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // UPDATED: Ensure selectedSize and selectedColor are part of the item object
  const addToCart = (painting, quantity = 1, selectedSize = null, selectedColor = null) => {
    const newItem = {
      painting, // The full painting object
      quantity,
      selectedSize, // Explicitly include selectedSize
      selectedColor, // Explicitly include selectedColor
    };

    const existingItemIndex = cartItems.findIndex(item =>
      item.painting._id === newItem.painting._id &&
      item.selectedSize === newItem.selectedSize && // Match by size
      item.selectedColor === newItem.selectedColor // Match by color
    );

    if (existingItemIndex > -1) {
      const updatedCart = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
      setCartItems(updatedCart);
      toast.success(`${newItem.quantity} more "${painting.name}" added to cart!`);
    } else {
      setCartItems([...cartItems, newItem]);
      toast.success(`"${painting.name}" added to cart!`);
    }
  };

  const removeFromCart = (paintingId, selectedSize = null, selectedColor = null) => {
    const updatedCart = cartItems.filter(item =>
      !(item.painting._id === paintingId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    );
    setCartItems(updatedCart);
    toast.success("Item removed from cart.");
  };

  const updateQuantity = (paintingId, newQuantity, selectedSize = null, selectedColor = null) => {
    if (newQuantity <= 0) {
      removeFromCart(paintingId, selectedSize, selectedColor);
      return;
    }
    const updatedCart = cartItems.map(item =>
      (item.painting._id === paintingId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedCart);
    toast.success("Cart quantity updated.");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared.");
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
