import api from "./api";
import Cookies from "js-cookie";
import dotenv from "dotenv";
import { PostType } from "@/models/Post";

dotenv.config();

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("_ararx_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export class PostInteractService {
  public async like(postId: string): Promise<PostType[]> {
    try {
      const response = await api.post(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Give like failed");
    }
  }

  public async dislike(postId: string): Promise<PostType[]> {
    try {
      const response = await api.post(`/posts/${postId}/dislike?handler=dddd`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Remove like failed");
    }
  }
}
