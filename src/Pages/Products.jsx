import React, { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 


   const  addToCart = async(product) => {
    try {
      // Fetch the current items in the cart
      const cartResponse = await fetch('http://localhost:8080/cart');
      const cartItems = await cartResponse.json();

      // Check if the product is already in the cart
      const isProductInCart = cartItems.some(item => item.id === product.id);

      if (isProductInCart) {
        alert("Product is already in the cart")
        console.log('Product is already in the cart');
        return; // Exit the function if the product is already in the cart
      }

      // If the product is not in the cart, proceed to add it
      const response = await fetch('http://localhost:8080/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Product added to cart:', data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };



  return (
    <div>
    <h1>Products List</h1>
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
      ))}
    </div>
  </div>
  )
}

export default Products