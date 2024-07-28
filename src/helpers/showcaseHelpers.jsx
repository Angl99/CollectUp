import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/showcases`;

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
        const response = await axios.post(`${API_URL}/${id}/items`, items);
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

export const removeItemsFromShowcase = async (showcaseId, items) => {
    try {
        const response = await axios.put(`${API_URL}/${showcaseId}/items`, items);
        return response.data;
    } catch (error) {
        console.error("Error removing item from showcase:", error);
        throw error;
    }
};

export const getShowcasesByUserUid = async (uid) => {
    try {
        const response = await axios.get(`${API_URL}?uid=${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching showcases for user:", error);
        throw error;
    }
}

// This function is not directly mapped to a backend route, but it's useful for our frontend logic
export const addItemsToFirstShowcase = async (uid, items) => {
    try {
        const showcases = await getShowcasesByUserUid(uid);
        if (showcases.length === 0) {
            const newShowcase = await createShowcase({ name: "My Showcase", uid });
            await addItemsToShowcase(newShowcase.id, items);
            return newShowcase;
        }
        const firstShowcase = showcases[0];
        await addItemsToShowcase(firstShowcase.id, items);
        return firstShowcase;
    } catch (error) {
        console.error("Error adding items to first showcase:", error);
        throw error;
    }
}
