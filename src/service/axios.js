
import axios from "axios";

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`});

// Add JWT to headers
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default Api;




