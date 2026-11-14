/**
 * CLOSETÉ - Program 5 Axios API Client
 * Configures base URL and attaches JWT bearer tokens automatically.
 */

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Attach JWT token if stored
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('closete_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Format error messages
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API Communication Failure';
    return Promise.reject(new Error(message));
  }
);

export default client;
