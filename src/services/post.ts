import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';

dotenv.config();

api.interceptors.request.use((config) => {
    const token = Cookies.get('_cnctfarm_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export class PostService {
    public async getPosts(): Promise<any[]> {
        return []
    }
}