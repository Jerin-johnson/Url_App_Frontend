import axios from "axios";
console.log(import.meta.env.VITE_API_URL);
export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://nestjsurlapp-production.up.railway.app",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
