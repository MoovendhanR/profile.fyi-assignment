import React, { useState, useEffect } from 'react';
import './Cart.css'; 
import CartLength from '../../Components/CartLength';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState({ type: '', amount: 0 });

  // Fetching data
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/cart');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  // increase  item
  const increaseQuantity = async (product) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id) {
        item.quantity = item.quantity ? item.quantity + 1 : 2;
      }
      return item;
    });

    setCartItems(updatedCartItems);
    await updateCartOnServer(product.id, product.quantity + 1);
  };

  // decrease  quantity of item
  const decreaseQuantity = async (product) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === product.id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });

    setCartItems(updatedCartItems);
    await updateCartOnServer(product.id, product.quantity - 1);
  };

  // remove an item from the cart
  const removeItem = async (productId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);

    try {
      await fetch(`http://localhost:8080/cart/${productId}`, {
        method: 'DELETE'
      });
      console.log('Item removed successfully');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // update the item on the server
  const updateCartOnServer = async (productId, newQuantity) => {
    try {
      await fetch(`http://localhost:8080/cart/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });
      console.log('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  // Calculate the subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
  };

  // Apply discount and calculate total price
  const calculateTotalPrice = () => {
    const subtotal = calculateSubtotal();
    let total = parseFloat(subtotal);

    if (discount.type === 'fixed') {
      total -= discount.amount;
    } else if (discount.type === 'percentage') {
      total -= total * (discount.amount / 100);
    }

    return total.toFixed(2);
  };

  // Handle discount input change
  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setDiscount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="cart-container">
        <CartLength/>
      <h1>Your Cart</h1>
      <div className="cart-grid">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
                <div className="cart-item-actions">
                  <button onClick={() => decreaseQuantity(item)} disabled={item.quantity <= 1}>-</button>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Subtotal: ${calculateSubtotal()}</p>
        <div className="discount-section">
          <label>
            Discount Type:
            <select name="type" onChange={handleDiscountChange} value={discount.type}>
              <option value="">None</option>
              <option value="fixed">$10 off</option>
              <option value="percentage">10% off</option>
            </select>
          </label>
          {discount.type === 'fixed' && (
            <label>
              Amount:
              <input
                type="number"
                name="amount"
                value={discount.amount}
                onChange={handleDiscountChange}
                placeholder="Enter discount amount"
              />
            </label>
          )}
          {discount.type === 'percentage' && (
            <label>
              Percentage:
              <input
                type="number"
                name="amount"
                value={discount.amount}
                onChange={handleDiscountChange}
                placeholder="Enter discount percentage"
                max="100"
                min="0"
              />
            </label>
          )}
        </div>
        <p>Total (including discounts): ${calculateTotalPrice()}</p>
        <CartLength/>
      </div>
    </div>
  );
};

export default Cart;
