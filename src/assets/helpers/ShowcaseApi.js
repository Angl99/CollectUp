import axios from 'axios';

const API_URL = 'https://api.upcitemdb.com/prod/trial/lookup';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export const fetchData = async (itemCode, itemType) => {
  try {
    let response;

    switch (itemType) {
      case 'UPC':
        response = await axios.get(`${CORS_PROXY}${API_URL}?upc=${itemCode}`);
        break;
      case 'ISBN':
        response = await axios.get(`${CORS_PROXY}${API_URL}?isbn=${itemCode}`);
        break;
      case 'EAN':
        response = await axios.get(`${CORS_PROXY}${API_URL}?ean=${itemCode}`);
        break;
      default:
        throw new Error('Unsupported item type');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
