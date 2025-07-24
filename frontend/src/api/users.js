import axiosInstance from "../axiosInstance";

export const sendIdTokenToBackend = (idToken) => {
    return axiosInstance.post('/users/login', {}, {
        headers: {
            Authorization: `Bearer ${idToken}`
        }
    });
};