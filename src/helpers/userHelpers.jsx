import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (userData) => {
    try {
        const response = await axios.post("http://localhost:3000/users", userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateById = async (id, userData) => {
    try {
        const response = await axios.put(`http://localhost:3000/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
