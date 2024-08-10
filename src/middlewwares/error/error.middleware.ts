import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

class HttpError extends Error {
  status_code: number;
  success: boolean = false;
  constructor(message: string, status_code: number) {
    super(message);
    this.name = this.constructor.name;
    this.status_code = status_code;
  }
}

class BadRequest extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class NotFound extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);
  }
}

class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

class Unauthorized extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

class Forbidden extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);
  }
}

class Conflict extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);
  }
}

class ExpiredToken extends HttpError {
  constructor(message: string) {
    super(message, StatusCodes.GONE);
  }
}

export const errorMiddleware = (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { success, status_code, message } = error;
  res.status(status_code).json({
    success,
    status_code,
    message,
  });
};

export {
  BadRequest,
  NotFound,
  InternalServerError,
  Unauthorized,
  Forbidden,
  Conflict,
  ExpiredToken,
};
