import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/ProductCard';
import './Products.css';

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
      // fetching current item
      const cartResponse = await fetch('http://localhost:8080/cart');
      const cartItems = await cartResponse.json();

      // verifying
      const isProductInCart = cartItems.some(item => item.id === product.id);

      if (isProductInCart) {
        alert("Product is already in the cart")
        console.log('Product is already in the cart');
        return; 
      }

      //proceeding
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
    <div className='products-container'>
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