import axios from "axios";

// const LIVE_API_URL = "https://collectup-backend.onrender.com";
const API_URL = 'http://localhost:3000'


export const index = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/users${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const create = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateById = async (id, user) => {
    try {
        const response = await axios.put(`${API_URL}/users${id}`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/users${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}