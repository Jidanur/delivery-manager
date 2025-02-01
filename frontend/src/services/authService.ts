import apiClient from "./apiClient";
import { LoginData, AuthResponse } from "../types/authInterface";

export const authService = {
  async login(formData: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", formData);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("role", response.data.role);

    return response.data;
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
