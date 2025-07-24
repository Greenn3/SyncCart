import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
});

// Aktualny token trzymany w pamięci
let currentToken = localStorage.getItem('google_id_token');

// Dodaj interceptor, który ustawia token przy każdym żądaniu
axiosInstance.interceptors.request.use((config) => {
    if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

// Funkcja do ustawiania tokena
export function attachIdToken(idToken) {
    currentToken = idToken;
    localStorage.setItem('google_id_token', idToken);
}

// Funkcja do czyszczenia tokena (np. po wylogowaniu)
export function clearIdToken() {
    currentToken = null;
    localStorage.removeItem('google_id_token');
}

export default axiosInstance;
