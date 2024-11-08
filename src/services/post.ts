import api from './api';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { PostType } from '@/models/Post';
import { compareDesc, parseISO } from 'date-fns';

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

export class PostService {
    public async createPost(content: string): Promise<void> {
        try {
            await api.post(`/posts/`, {
                content: content
            });
        } catch (error) {
            console.error(error)
            throw new Error('Create post failed');
        }
    }

    public async getPosts(page_num: number, page_size: number): Promise<PostType[]> {
        try {
            const response = await api.get(`/posts?page_num=${page_num}&page_size=${page_size}`);
            return response.data.sort((a: PostType, b: PostType) => compareDesc(parseISO(a.date), parseISO(b.date)));
        } catch (error) {
            console.error(error)
            throw new Error('Get feed posts failed');
        }
    }

    public async getPostById(postId: string): Promise<PostType> {
        try {
            const response = await api.get(`/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error(error)
            throw new Error('Get post failed');
        }
    }

    public async getPostsFromUser(page_num: number, page_size: number, user_handler?: string): Promise<PostType[]> {
        try {
            if (!user_handler) throw Error
            const response = await api.get(`/posts/author/${user_handler}?page_num=${page_num}&page_size=${page_size}`);
            return response.data;
        } catch (error) {
            console.error(error)
            throw new Error('Get user posts failed');
        }
    }
}