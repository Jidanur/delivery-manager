import { AxiosError } from "axios";
import { UserData, UserInfo, UserUpdateData } from "../types/userInterfaces";
import { handleApiError } from "../utils/errorHandler";
import apiClient from "./apiClient";

export const userService = {
  async createUser(userData: UserData): Promise<UserInfo> {
    try {
      const response = await apiClient.post("/user/create", userData);
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
      const response = await apiClient.put(`/user/updateUser/${userId}`, userData);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async deleteUser(userId: number): Promise<UserInfo> {
    try {
      const response = await apiClient.delete(`/user/deleteUser/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getUserInfo(): Promise<UserInfo> {
    try {
      const response = await apiClient.get(`/user/getUserInfo`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getAllUsers(): Promise<any> {
    try {
      const response = await apiClient.get("/user/getAll");
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getUser(userId: number): Promise<UserInfo> {
    try {
      const response = await apiClient.get(`/user/get/${userId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },
};
