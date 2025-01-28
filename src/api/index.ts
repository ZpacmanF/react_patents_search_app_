import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: "https://express-api-app-d23u.vercel.app/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  validate: async () => {
    const response = await api.get("/auth/validate");
    return response.data;
  },
};

export const patents = {
  create: async (data: any) => {
    const response = await api.post("/patents", data);
    return response.data;
  },
  search: async (query: string = "") => {
    const response = await api.get("/patents/search", {
      params: { query },
    });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/patents/${id}`);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/patents/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/patents/${id}`);
    return response.data;
  },
};
