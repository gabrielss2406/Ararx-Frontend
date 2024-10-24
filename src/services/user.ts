import api from './api';
import Cookies from 'js-cookie';
import { RegisterFormType } from '@/models/User';

export class UserService {
    public async login(username: string, password: string) {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await api.post('/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.data.access_token) {
                const expires = 600 / 1440;
                Cookies.set('_ararx_token', response.data.access_token, { expires });
            }

            return response.data;
        } catch (error) {
            console.error(error)
            throw new Error('Login failed');
        }
    }


    public async register(values: RegisterFormType) {
        try {
            const { confirmPassword, ...data } = values;

            if (values.password !== confirmPassword) {
                throw new Error('As senhas não coincidem');
            }

            const response = await api.post('/register', data);

            return response.data;
        } catch (error) {
            console.error(error)
            throw new Error('Register failed');
        }
    }


    public async logout() {
        try {
            Cookies.remove('_ararx_token');
        } catch {
            throw new Error('Logout failed');
        }
    }
}