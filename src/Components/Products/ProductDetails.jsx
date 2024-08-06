import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productEan } = useParams();
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Fetch product details
        const productResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productEan}`);
        setProduct(productResponse.data);

        // Fetch items for the product
        const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productEan}/items`);
        setItems(itemsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productEan]);

  // Function to render product details
  const renderProductDetails = () => {
    // TODO: Implement a more detailed view of the product
    return (
      <div>
        <h2>{product.searchableTitle}</h2>
        <p>EAN: {product.ean}</p>
        <p>Brand: {product.searchableBrand}</p>
        <p>Description: {product.searchableDescription}</p>
        {/* TODO: Add more product details here */}
      </div>
    );
  };

  // Function to render items list
  const renderItemsList = () => {
    // TODO: Implement a more detailed view of items
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            Item ID: {item.id}
            {/* TODO: Add more item details here */}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      {renderProductDetails()}
      
      <h3>Items:</h3>
      {renderItemsList()}

      {/* TODO: Add additional sections as needed */}
      {/* For example: 
      - Product images gallery
      - User reviews
      - Related products
      - Add to cart functionality
      */}
    </div>
  );
};

export default ProductDetails;
