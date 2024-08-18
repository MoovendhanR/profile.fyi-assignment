import React from 'react';
import { useCart } from './CartContext';

const CartLength = () => {
  const { cartLength } = useCart();

  return (
    <div className="cart-length">
      <span>Items in Cart: {cartLength}</span>
    </div>
  );
};

export default CartLength;
