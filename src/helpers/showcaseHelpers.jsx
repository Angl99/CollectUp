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

export const createShowcase = async (name, uid) => {
    try {
        const response = await axios.post(API_URL, { name, uid });
        return response.data;
    } catch (error) {
        console.error("Error creating showcase:", error);
        throw error;
    }
}

// export const getShowcaseById = async (id) => {
//     try {
//         const response = await axios.get(`${API_URL}/${id}`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching showcase by ID:", error);
//         throw error;
//     }
// }

export const updateShowcaseById = async (id, name) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name });
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

export const removeItemsFromShowcase = async (id, items) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}/items`, { data: items });
        return response.data;
    } catch (error) {
        console.error("Error removing items from showcase:", error);
        throw error;
    }
}

export const getShowcasesByUserUid = async (uid) => {
    try {
        const response = await axios.get(`${API_URL}/user/${uid}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching showcases for user:", error);
        throw error;
    }
}

export const addItemsToFirstShowcase = async (uid, items) => {
    try {
        const showcases = await getShowcasesByUserUid(uid);
        if (showcases.length === 0) {
            throw new Error("User has no showcases");
        }
        const firstShowcase = showcases[0];
        await addItemsToShowcase(firstShowcase.id, items);
        return firstShowcase;
    } catch (error) {
        console.error("Error adding item to first showcase:", error);
        throw error;
    }
}
