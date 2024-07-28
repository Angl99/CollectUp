import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const index = async () => {
    try {
        const response = await axios.get(`${API_URL}/collections`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (collectionData) => {
    try {
        const response = await axios.post(`${API_URL}/collections`, collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const update = async (id, collectionData) => {
    try {
        const response = await axios.put(`${API_URL}/collections/${id}`, collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addItem = async (collectionId, itemId) => {
    try {
        const response = await axios.post(`${API_URL}/collections/addItem`, { collectionId, itemId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
