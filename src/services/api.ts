import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        // 'x-api-key': API_KEY,
    },
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) window.location.href = '/login';
        return Promise.reject(error);
    }
);

export default api;