import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api", // Your existing API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request logging for debugging
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data);
  return config;
}, (error) => {
  console.error('API Request Error:', error);
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    
    // Only redirect to signin for 401 errors on non-chatbot endpoints
    if (error.response?.status === 401 && !error.config.url?.includes('/career/chatbot/')) {
      localStorage.removeItem("token");
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default api;