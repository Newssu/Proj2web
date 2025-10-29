// src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:4000/api",
  timeout: 10000,
});

// แนบ token อัตโนมัติถ้ามี
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// จัดการ error กลางๆ (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // คุณจะโชว์ toast/alert ตรงนี้ก็ได้
    return Promise.reject(err);
  }
);

export default api;
