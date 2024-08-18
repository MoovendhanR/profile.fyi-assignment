import React from 'react';
import { useCart } from './CartContext';
import { GiShoppingCart } from 'react-icons/gi';

const CartLength = () => {
  const { cartLength } = useCart();

  return (
    <div className="cart-length">
      <span><GiShoppingCart />(
      {cartLength})</span>
    </div>
  );
};

export default CartLength;
