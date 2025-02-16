import apiClient from "./apiClient";
import { AxiosError } from "axios";
import { LoginData, AuthResponse } from "../types/authInterface";
import { handleApiError } from "../utils/errorHandler";

export const authService = {
  async login(formData: LoginData): Promise<AuthResponse> {
    try {
      const response = await apiClient.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUserRole(): string | null {
    return localStorage.getItem("role");
  },
};
