import axios from 'axios';

class ItemController {
  constructor() {
    this.API_URL = 'http://localhost:3000/items';
  }

  async getAllItems() {
    try {
      const response = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  }

  async getItemById(id) {
    try {
      const response = await axios.get(`${this.API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching item:', error);
      throw error;
    }
  }

  async createItem(itemData, uid) {
    try {
      const response = await axios.post(this.API_URL, { ...itemData, uid });
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  }

  async updateItemById(id, itemData) {
    try {
      const response = await axios.put(`${this.API_URL}/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  }

  async deleteItemById(id) {
    try {
      const response = await axios.delete(`${this.API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  }

  async searchItem(code, type) {
    try {
      const response = await axios.get(`${this.API_URL}/search`, { params: { code, type } });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null;
      }
      console.error('Error searching for item:', error);
      throw error;
    }
  }
}

export default new ItemController();
