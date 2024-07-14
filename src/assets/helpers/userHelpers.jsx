import axios from "axios";

export const index = async () => {
    try {
        const response = await axios.get("http://localhost:3000/users");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// export const getUserByUid = async (uid) => {
//     try {
//         const response = await axios.get(`http://localhost:3000/users/${uid}`)
//         return response.data;
//     } catch (error) {
//         console.error(error);
//     }
// }

export const create = async (user) => {
    try {
        const response = await axios.post("http://localhost:3000/users", user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateById = async (id, user) => {
    try {
        const response = await axios.put(`http://localhost:3000/users/${id}`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}   

export const deleteById = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}