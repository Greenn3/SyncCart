import axios from "../axiosInstance";



export const getAllLists = () => axios.get("/lists");

export const createList = (listData) => axios.post("/lists", listData);