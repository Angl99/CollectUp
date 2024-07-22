import axios from "axios";

export const getAllSeries = async () => {
    try {
        const response = await axios.get("http://localhost:3000/series");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSeriesById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/series/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createSeries = async (seriesData) => {
    try {
        const response = await axios.post("http://localhost:3000/series", seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateSeriesById = async (id, seriesData) => {
    try {
        const response = await axios.put(`http://localhost:3000/series/${id}`, seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteSeriesById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/series/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getSeriesProducts = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/series/${id}/products`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addProductToSeries = async (id, productEan) => {
    try {
        const response = await axios.post(`http://localhost:3000/series/${id}/products`, { productEan });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const removeProductFromSeries = async (id, productEan) => {
    try {
        const response = await axios.delete(`http://localhost:3000/series/${id}/products/${productEan}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
