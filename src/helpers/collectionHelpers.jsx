import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/collections");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (collectionData) => {
    try {
        const response = await axios.post("http://localhost:3000/collections", collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const update = async (id, collectionData) => {
    try {
        const response = await axios.put(`http://localhost:3000/collections/${id}`, collectionData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addItem = async (collectionId, itemId) => {
    try {
        const response = await axios.post(`http://localhost:3000/collections/addItem`, { collectionId, itemId });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
