import axios from 'axios';

const INTERNAL_API_URL = 'http://localhost:3000/items';
const EXTERNAL_API_URL = 'https://api.upcitemdb.com/prod/trial/lookup';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

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


export const searchExternalApi = async (code) => { 
  try { 
    const response = await axios.get(`${INTERNAL_API_URL}/search-external-api`, { 
      params: { code }, 
    }); 
    return response.data; 
  } catch (error) { 
    console.error('Error fetching data from backend:', error); 
    throw error; 
  } 
};

