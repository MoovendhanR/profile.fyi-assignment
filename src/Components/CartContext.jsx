import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartLength, setCartLength] = useState(0);

  const updateCartLength = async () => {
    try {
      const response = await fetch('https://profile-fyi-backend-db.onrender.com/cart');
      const items = await response.json();
      const totalItems = items.reduce((total, item) => total + (item.quantity || 1), 0);
      setCartLength(totalItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    updateCartLength();
  }, []);

  return (
    <CartContext.Provider value={{ cartLength, updateCartLength }}>
      {children}
    </CartContext.Provider>
  );
};
