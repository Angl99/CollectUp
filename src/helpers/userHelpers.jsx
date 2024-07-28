import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const index = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/users`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateById = async (id, userData) => {
    try {
        const response = await axios.put(`${API_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   

export const getByFirebaseId = async (uid) => {
    try {
        const response = await axios.get(`${API_URL}/users/firebase/${uid}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
