import axios from 'axios';

const INTERNAL_API_URL = `${import.meta.env.VITE_API_URL}/items`;

export const getAllItems = async () => {
  try {
    const response = await axios.get(INTERNAL_API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};


export const createItem = async (uid, productEan, imgUrl, condition, userDescription, price, forSale) => {
  try {
    const response = await axios.post(INTERNAL_API_URL, { uid, productEan, imgUrl, condition, userDescription, price, forSale });
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};


export const updateItemById = async (id, updateData) => {
  try {
    const response = await axios.put(`${INTERNAL_API_URL}/${id}`, updateData);
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


export const searchExternalApi = async (query) => { 
  try { 
    const isCode = /^\d+$/.test(query);
    if (isCode) {
      const response = await axios.get(`${INTERNAL_API_URL}/search-external-api`, { params: { code: query } });
      return response.data;
    } else {
      const response = await axios.post(`${INTERNAL_API_URL}/search-external-keyword`, { keyword: query });
      return response.data;
    }
  } catch (error) { 
    console.error('Error fetching data from backend:', error); 
    throw error; 
  } 
};

