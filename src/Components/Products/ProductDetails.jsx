import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { productEan } = useParams();
  const [product, setProduct] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productEan}`);
        setProduct(productResponse.data);

        const itemsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${productEan}/items`);
        setItems(itemsResponse.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productEan]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Details</h1>
      <h2>{product.searchableTitle}</h2>
      <p>EAN: {product.ean}</p>
      <p>Brand: {product.searchableBrand}</p>
      <p>Description: {product.searchableDescription}</p>
      
      <h3>Items:</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>Item ID: {item.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
