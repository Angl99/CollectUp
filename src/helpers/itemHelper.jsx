import axios from 'axios';

const INTERNAL_API_URL = 'http://localhost:3000/items';
const EXTERNAL_API_URL = 'https://api.upcitemdb.com/prod/trial/lookup';

export const getAllItems = async () => {
  try {
    const response = await axios.get(INTERNAL_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const createItem = async (uid, productEan) => {
  try {
    const response = await axios.post(INTERNAL_API_URL, { uid, productEan });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItemById = async (id, name, description) => {
  try {
    const response = await axios.put(`${INTERNAL_API_URL}/${id}`, { name, description });
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItemById = async (id) => {
  try {
    const response = await axios.delete(`${INTERNAL_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${INTERNAL_API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export const searchInternalItem = async (code) => {
  try {
    const response = await axios.get(`${INTERNAL_API_URL}/search`, { params: { code } });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error searching for item:', error);
    throw error;
  }
};

export const searchExternalItem = async (code) => {
  try {
    const response = await axios.get(EXTERNAL_API_URL, {
      params: { upc: code }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    throw error;
  }
};
