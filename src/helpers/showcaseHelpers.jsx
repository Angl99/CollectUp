import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/showcases");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/showcases/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const create = async (showcase) => {
    try {
        const response = await axios.post("http://localhost:3000/showcases", showcase);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateById = async (id, showcase) => {
    try {
        const response = await axios.put(`http://localhost:3000/showcases/${id}`, showcase);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/showcases/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}
