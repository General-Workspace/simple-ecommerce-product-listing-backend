import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../../utils/lib/response.lib";
import { ErrorResponseData, IUser } from "../../@types";
import User from "../../models/user.model";
import { jwtService } from "../../utils/helpers/jwt.helper";
// import { Forbidden, NotFound, Unauthorized, BadRequest } from "../error/error.middleware";

interface AuthenticatedUserError {
  status_code: number;
  type: boolean;
  message: string;
}

interface AuthenticatedUserRequest extends Request {
  user?: IUser;
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
          type: false,
          message: "Token is missing",
        };
        return responseHandler.errorResponse(
          this.res,
          err.status_code,
          err.message
        );
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.UNAUTHORIZED,
          type: false,
          message: "Token is missing",
        };
        return responseHandler.errorResponse(
          this.res,
          err.status_code,
          err.message
        );
      }

      const payload = jwtService.verifyToken(token);
      if (!payload) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.UNAUTHORIZED,
          type: false,
          message: "Token is invalid",
        };
        return responseHandler.errorResponse(
          this.res,
          err.status_code,
          err.message
        );
      }

      const user = await User.findOne({ email: payload["email"] });
      if (!user) {
        const err: AuthenticatedUserError = {
          status_code: StatusCodes.NOT_FOUND,
          type: false,
          message: "User not found",
        };
        return responseHandler.errorResponse(
          this.res,
          err.status_code,
          err.message
        );
      }

      this.req.user = user as IUser;
      return this.next();
    } catch (error: any) {
      const err: AuthenticatedUserError = {
        type: false,
        message: error.message,
        status_code: StatusCodes.UNAUTHORIZED,
      };
      return responseHandler.errorResponse(
        this.res,
        err.status_code,
        err.message
      );
    }
  }
}

export const authService = (
  req: AuthenticatedUserRequest,
  res: AuthenticatedUserResponse,
  next: NextFunction
) => new AuthService(req, res, next).verifyUser();
