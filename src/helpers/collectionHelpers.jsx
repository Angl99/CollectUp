import axios from "axios";

export const getAllCollections = async () => {
    try {
        const response = await axios.get("http://localhost:3000/collections");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCollectionById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createCollection = async (collectionData) => {
    try {
        const response = await axios.post("http://localhost:3000/collections", collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCollectionById = async (id, collectionData) => {
    try {
        const response = await axios.put(`http://localhost:3000/collections/${id}`, collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteCollectionById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addItemToCollection = async (collectionId, itemId) => {
    try {
        const response = await axios.post(`http://localhost:3000/collections/addItem`, { collectionId, itemId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
