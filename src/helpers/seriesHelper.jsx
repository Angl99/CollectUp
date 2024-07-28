import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const index = async () => {
    try {
        const response = await axios.get(`${API_URL}/series`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/series/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (seriesData) => {
    try {
        const response = await axios.post(`${API_URL}/series`, seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateById = async (id, seriesData) => {
    try {
        const response = await axios.put(`${API_URL}/series/${id}`, seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/series/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSeriesProducts = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/series/${id}/products`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addProductToSeries = async (id, productEan) => {
    try {
        const response = await axios.post(`${API_URL}/series/${id}/products`, { productEan });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const removeProductFromSeries = async (id, productEan) => {
    try {
        const response = await axios.delete(`${API_URL}/series/${id}/products/${productEan}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
