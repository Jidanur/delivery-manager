import apiClient from "./apiClient";
import { AxiosError } from "axios";
import { UserData, UserUpdateData, UserInfo } from "../types/userInterfaces";
import { handleApiError } from "../utils/errorHandler";

export const userService = {
  async createUser(userData: UserData): Promise<UserInfo> {
    try {
      const response = await apiClient.post("/createUser", userData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async updateUser(
    userId: number,
    userData: UserUpdateData
  ): Promise<UserInfo> {
    try {
      const response = await apiClient.put(`/updateUser/${userId}`, userData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async deleteUser(userId: number): Promise<UserInfo> {
    try {
      const response = await apiClient.delete(`/deleteUser/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getUserInfo(userId: number): Promise<UserInfo> {
    try {
      const response = await apiClient.get(`/getUserInfo/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getAllUsers(): Promise<UserInfo> {
    try {
      const response = await apiClient.get("/getAllUsers");
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getUser(userId: number): Promise<UserInfo> {
    try {
      const response = await apiClient.get(`/getUser/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },
};
