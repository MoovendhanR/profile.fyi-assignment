import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON Server
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <div>
    <h1>Product List</h1>
    <ul>
    {products.map(product => (
          <li key={product.id} style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
            <h2>{product.title}</h2>
            <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            <button>Add to Cart</button>
          </li>
        ))}
    </ul>
  </div>
  )
}

export default Products