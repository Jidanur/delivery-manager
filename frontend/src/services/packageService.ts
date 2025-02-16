import { AxiosError } from "axios";
import { PackageInfo, PackageData } from "../types/packageInterfaces";
import { handleApiError } from "../utils/errorHandler";
import apiClient from "./apiClient";

export const packageService = {
  async createPackage(packageData: PackageData): Promise<PackageInfo> {
    try {
      const response = await apiClient.post("/package/create", {
        packageInfo: packageData,
      });
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async updatePackage(
    packageId: number,
    updateData: PackageData
  ): Promise<PackageInfo> {
    try {
      const response = await apiClient.put(`/package/update`, {
        packageId,
        updateInfo: updateData,
      });
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async deletePackage(
    packageId: number
  ): Promise<{ message: string; packageId: number }> {
    try {
      const response = await apiClient.delete(`/package/delete/${packageId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getPackage(packageId: number): Promise<PackageInfo> {
    try {
      const response = await apiClient.get(`/package/get/${packageId}`);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
    }
  },

  async getMyPackages(): Promise<PackageInfo[]> {
    try {
      const response = await apiClient.get("/package/myPackages");
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return [];
    }
  },

  async getAllPackages(): Promise<PackageInfo[]> {
    try {
      const response = await apiClient.get("/package/getAll");
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      return [];
    }
  },
};
