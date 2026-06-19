import axios from "axios";

const API = axios.create({
  baseURL:
    "https://interview-prep-analysis-1.onrender.com/api/v1",
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;