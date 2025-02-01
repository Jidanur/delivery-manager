import axios from "axios";

const backendUrl = "http://localhost:3000"; // Change this to your backend URL

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach authentication token (if exists)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API call failed:", error);
    // Handle specific error cases
    if (error.response.status === 401) {
      console.error("Unauthorized");
    } else if (error.response.status === 404) {
      console.error("Not found");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
