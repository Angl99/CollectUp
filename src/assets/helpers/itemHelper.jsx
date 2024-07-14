import axios from 'axios';

const API_URL = 'http://localhost:3000/items';

export const getAllItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

export const getItemById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

export const createItem = async (itemData, uid) => {
  try {
    const response = await axios.post(`${API_URL}`,{ ...itemData, uid });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

export const updateItemById = async (id, itemData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

export const deleteItemById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

export const searchItem = async (code, type) => {
  try {
    const response = await axios.get(`${API_URL}/search`, { params: { code, type } });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error('Error searching for item:', error);
    throw error;
  }
};
