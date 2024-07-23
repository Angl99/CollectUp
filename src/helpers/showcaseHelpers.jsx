import axios from "axios";

const API_URL = "http://localhost:3000/showcases";

export const getAllShowcases = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching all showcases:", error);
        throw error;
    }
}

export const createShowcase = async (showcaseData) => {
    try {
        const response = await axios.post(API_URL, showcaseData);
        return response.data;
    } catch (error) {
        console.error("Error creating showcase:", error);
        throw error;
    }
}

export const getShowcaseById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching showcase by ID:", error);
        throw error;
    }
}

export const updateShowcaseById = async (id, updateData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updateData);
        return response.data;
    } catch (error) {
        console.error("Error updating showcase:", error);
        throw error;
    }
}

export const addItemsToShowcase = async (id, items) => {
    try {
        const response = await axios.post(`${API_URL}/${id}/items`, { items });
        return response.data;
    } catch (error) {
        console.error("Error adding items to showcase:", error);
        throw error;
    }
}

export const deleteShowcaseById = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting showcase:", error);
        throw error;
    }
}

export const removeItemsFromShowcase = async (id, items) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/items`, { data: { items } });
        return response.data;
    } catch (error) {
        console.error("Error removing items from showcase:", error);
        throw error;
    }
}
