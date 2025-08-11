import axios from "../axiosInstance";


export const getItemsByListId = (listId) => axios.get(`/items/${listId}`);

export const createItem = (itemData) => axios.post("/items", itemData);
export const deleteItem = (itemId) => axios.delete(`/items/${itemId}`);
export const updateItem = (itemId, itemData) => axios.put(`/items/${itemId}`, itemData);
export const updateCompleted = (itemId, completed) => axios.patch(`/items/${itemId}`,  completed, {
    headers: { 'Content-Type': 'application/json' }
});
