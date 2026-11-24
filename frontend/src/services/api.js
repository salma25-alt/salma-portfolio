import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5015/api',
  withCredentials: true, // Sends and receives HTTP-only cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
