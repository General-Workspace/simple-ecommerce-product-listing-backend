import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { response } from "../../utils/lib/response.lib";
import { ErrorResponseData } from "../../@types";
import { User } from "../../models/users.model";
import { jwtService } from "../../utils/helpers/jwt.helper";

interface AuthenticatedUserError {
  status_code: number;
  type: string;
  message: string;
}

interface AuthenticatedUserRequest extends Request {
  user?: User;
}

type AuthenticatedUserResponse = Response<ErrorResponseData>;

class AuthService {
  constructor(
    private req: AuthenticatedUserRequest,
    private res: AuthenticatedUserResponse,
    private next: NextFunction
  ) {}

  public async verifyUser(): Promise<AuthenticatedUserResponse | void> {
    try {
      const authHeader = this.req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.UNAUTHORIZED,
          type: "Authentication Error",
          message: "Token is missing",
        };
        return response.errorResponse(this.res, err.status_code, err.message);
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.UNAUTHORIZED,
          type: "Authentication Error",
          message: "Token is missing",
        };
        return response.errorResponse(this.res, err.status_code, err.message);
      }

      const payload = jwtService.verifyToken(token);
      if (!payload) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.UNAUTHORIZED,
          type: "Authentication Error",
          message: "Token is invalid",
        };
        return response.errorResponse(this.res, err.status_code, err.message);
      }

      const user = await User.findOne({
        where: { email: payload["email"] as string },
      });
      if (!user) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.NOT_FOUND,
          type: "Authentication Error",
          message: "User not found",
        };
        return response.errorResponse(this.res, err.status_code, err.message);
      }

      this.req.user = user;
      return this.next();
    } catch (error: any) {
      const err: AuthenticatedUserError = {
        type: "Authentication Error",
        message: error.message,
        status_code: StatusCodes.UNAUTHORIZED,
      };
      return response.errorResponse(this.res, err.status_code, err.message);
    }
  }
}

export const authService = (
  req: AuthenticatedUserRequest,
  res: AuthenticatedUserResponse,
  next: NextFunction
) => new AuthService(req, res, next).verifyUser();
