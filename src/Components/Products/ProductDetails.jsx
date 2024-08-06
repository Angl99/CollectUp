import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, Container, Box } from '@mui/material';
import ProductItem from './ProductItem';

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

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/items/${itemId}`);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      // TODO: Add error handling UI
    }
  };

  const handleUpdateItem = async (itemId, updatedData) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/items/${itemId}`, updatedData);
      setItems(items.map(item => item.id === itemId ? response.data : item));
    } catch (error) {
      console.error('Error updating item:', error);
      // TODO: Add error handling UI
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Details
        </Typography>
        {product && (
          <Box mb={4}>
            <Typography variant="h5">{product.searchableTitle}</Typography>
            <Typography>EAN: {product.ean}</Typography>
            <Typography>Brand: {product.searchableBrand}</Typography>
            <Typography>Description: {product.searchableDescription}</Typography>
          </Box>
        )}
        <Typography variant="h5" gutterBottom>Items:</Typography>
        <Grid container spacing={3}>
          {items.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ProductItem
                item={item}
                onDelete={handleDeleteItem}
                onUpdate={handleUpdateItem}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductDetails;
