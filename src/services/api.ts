import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        // 'x-api-key': API_KEY,
    },
});

export default api;