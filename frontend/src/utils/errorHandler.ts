import { AxiosError } from "axios";
import {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  ApiError,
} from "../errors/CustomErrors";

export function handleApiError(error: AxiosError): never {
  if (error.response) {
    const message =
      (error.response.data as { message: string }).message ||
      "An error occurred";
    switch (error.response.status) {
      case 400:
        throw new BadRequestError(message);
      case 401:
        throw new UnauthorizedError(message);
      case 403:
        throw new ForbiddenError(message);
      case 404:
        throw new NotFoundError(message);
      case 500:
        throw new InternalServerError(message);
      default:
        throw new ApiError(message, error.response.status);
    }
  }
  throw error;
}
