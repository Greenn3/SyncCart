import axios from "../axiosInstance";



export const getItemsByListId = (listId) => axios.get(`/items/${listId}`);

export const createItem = (itemData) => axios.post("/items", itemData);