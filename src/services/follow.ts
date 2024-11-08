import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';

dotenv.config();

api.interceptors.request.use((config) => {
    const token = Cookies.get('_ararx_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export class FollowService {
    public async follow(userHandler: string): Promise<void> {
        try {
            await api.put(`/follow/users/${userHandler}`);
        } catch (error) {
            console.error(error)
            throw new Error('Follow user failed');
        }
    }

    public async unfollow(userHandler: string): Promise<void> {
        try {
            await api.put(`/follow/users/${userHandler}/unfollow`);
        } catch (error) {
            console.error(error)
            throw new Error('Unfollow user failed');
        }
    }
}