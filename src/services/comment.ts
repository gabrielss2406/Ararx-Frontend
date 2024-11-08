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
            throw new Error('Create comment failed');
        }
    }

    public async likeComment(commentId: string): Promise<void> {
        try {
            await api.put(`/comments/like/${commentId}`);
        } catch (error) {
            console.error(error)
            throw new Error('Like comment failed');
        }
    }

    public async unlikeComment(commentId: string): Promise<void> {
        try {
            await api.put(`/comments/dislike/${commentId}`);
        } catch (error) {
            console.error(error)
            throw new Error('Like comment failed');
        }
    }
}