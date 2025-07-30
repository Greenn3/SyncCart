import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
});


let currentToken = localStorage.getItem('google_id_token');


axiosInstance.interceptors.request.use((config) => {
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

export function attachIdToken(idToken) {
    currentToken = idToken;
    localStorage.setItem('google_id_token', idToken);
}

export function clearIdToken() {
    currentToken = null;
    localStorage.removeItem('google_id_token');
}

export default axiosInstance;
