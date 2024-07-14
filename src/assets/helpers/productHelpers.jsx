import axios from "axios";

const baseURL = "http://localhost:3000/products";

export const index = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const create = async (product) => {
    try {
        const response = await axios.post(baseURL, product);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateById = async (id, product) => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, product);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
