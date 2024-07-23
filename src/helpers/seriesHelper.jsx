import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/series");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/series/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (seriesData) => {
    try {
        const response = await axios.post("http://localhost:3000/series", seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateById = async (id, seriesData) => {
    try {
        const response = await axios.put(`http://localhost:3000/series/${id}`, seriesData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteById = async (id) => {
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
