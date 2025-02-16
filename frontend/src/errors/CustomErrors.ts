export class BadRequestError extends Error {
  constructor(message: string = "Bad Request") {
    super(`400 BadRequestError: ${message}`);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message: string = "Unauthorized") {
    super(`401 UnauthorizedError: ${message}`);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message: string = "Forbidden") {
    super(`403 ForbiddenError: ${message}`);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string = "Not Found") {
    super(`404 NotFoundError: ${message}`);
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends Error {
  constructor(message: string = "Internal Server Error") {
    super(`500 InternalServerError: ${message}`);
    this.name = "InternalServerError";
  }
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(`ApiError ${status}: ${message}`);
    this.name = "ApiError";
  }
}
