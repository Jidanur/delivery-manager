import axios from "axios";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  ApiError,
} from "../errors/CustomErrors";

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
    if (error.response) {
      switch (error.response.status) {
        case 400:
          return Promise.reject(new BadRequestError());
        case 401:
          return Promise.reject(new UnauthorizedError());
        case 403:
          return Promise.reject(new ForbiddenError());
        case 404:
          return Promise.reject(new NotFoundError());
        case 500:
          return Promise.reject(new InternalServerError());
        default:
          return Promise.reject(
            new ApiError(
              `Error: ${error.response.status}`,
              error.response.status
            )
          );
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
