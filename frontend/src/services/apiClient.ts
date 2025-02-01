import axios from "axios";

//TODO: Set this up in the env file
const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000"; // Change this to your backend URL

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: backendUrl,
  timeout: 10000,
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
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized");
          break;
        case 404:
          console.error("Not found");
          break;
        default:
          console.error(`Error: ${error.response.status}`);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
