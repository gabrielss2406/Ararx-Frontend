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

export class CommentService {
    public async sendComment(parentId: string, comment: string): Promise<void> {
        try {
            await api.post(`/comments/create/${parentId}`, {
                content: comment
            });
        } catch (error) {
            console.error(error)
            throw new Error('Create commnet failed');
        }
    }
}