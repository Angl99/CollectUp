import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/showcases");
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/showcases/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const create = async (name, uid) => {
    try {
        const response = await axios.post("http://localhost:3000/showcases", { name, uid });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateById = async (id, name) => {
    try {
        const response = await axios.put(`http://localhost:3000/showcases/${id}`, { name });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/showcases/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const addItemToShowcase = async (id, items) => {
    try {
        const response = await axios.post(`http://localhost:3000/showcases/${id}/items`, items);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteItemById = async (id, items) => {
    try {
        const response = await axios.delete(`http://localhost:3000/showcases/${id}/items`, { data: items });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
