import apiClient from "./apiClient";
import { UserData, UserUpdateData } from "../types/userInterfaces";

export const userService = {
  async createUser(userData: UserData): Promise<any> {
    const response = await apiClient.post("/createUser", userData);
    return response.data;
  },

  async updateUser(userId: number, userData: UserUpdateData): Promise<any> {
    const response = await apiClient.put(`/updateUser/${userId}`, userData);
    return response.data;
  },

  async deleteUser(userId: number): Promise<any> {
    const response = await apiClient.delete(`/deleteUser/${userId}`);
    return response.data;
  },

  async getUserInfo(userId: number): Promise<any> {
    const response = await apiClient.get(`/getUserInfo/${userId}`);
    return response.data;
  },

  async getAllUsers(): Promise<any> {
    const response = await apiClient.get("/getAllUsers");
    return response.data;
  },

  async getUser(userId: number): Promise<any> {
    const response = await apiClient.get(`/getUser/${userId}`);
    return response.data;
  },
};
