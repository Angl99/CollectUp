import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/collections");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const create = async (user) => {
    try {
        const response = await axios.post("http://localhost:3000/collections", user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateById = async (id, user) => {
    try {
        const response = await axios.put(`http://localhost:3000/collections/${id}`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/collections/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}