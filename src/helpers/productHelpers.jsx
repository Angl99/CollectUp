import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

const productHelper = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Create a new product
  createProduct: async (productData) => {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Get a specific product by code
  getProductByCode: async (code) => {
    try {
      const response = await axios.get(`${API_URL}/${code}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Update a product by EAN
  updateProductByEan: async (ean, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${ean}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product by EAN
  deleteProductByEan: async (ean) => {
    try {
      const response = await axios.delete(`${API_URL}/${ean}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
};

export default productHelper;