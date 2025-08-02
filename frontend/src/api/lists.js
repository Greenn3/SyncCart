import axios from "../axiosInstance";



export const getAllLists = () => axios.get("/lists");

export const createList = (listData) => axios.post("/lists", listData);

export const deleteList = (listId) =>axios.delete(`/lists/${listId}`)

export const addUserToList = (listId, userId) => axios.patch(`/lists/${listId}/users/${userId}`);