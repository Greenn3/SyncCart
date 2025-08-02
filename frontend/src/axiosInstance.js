import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const axiosInstance = axios.create({
    baseURL: API_URL,
});


let currentToken = localStorage.getItem('google_id_token');

// Define functions before they're used in the interceptor
export function attachIdToken(idToken) {
    currentToken = idToken;
    localStorage.setItem('google_id_token', idToken);
}

export function clearIdToken() {
    currentToken = null;
    localStorage.removeItem('google_id_token');
}

axiosInstance.interceptors.request.use((config) => {
    if (currentToken) {
        try {
            // Check if token is expired
            const decodedToken = jwtDecode(currentToken);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp && decodedToken.exp < currentTime) {
                console.log("Token expired in interceptor, removing from requests");
                // Token is expired, clear it
                clearIdToken();
                delete config.headers.Authorization;
            } else {
                // Token is valid, add it to the request
                config.headers.Authorization = `Bearer ${currentToken}`;
            }
        } catch (error) {
            console.error("Error decoding token in interceptor:", error);
            clearIdToken();
            delete config.headers.Authorization;
        }
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

export default axiosInstance;
