import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // ganti kalau backend beda
  withCredentials: true,
});

export default api;