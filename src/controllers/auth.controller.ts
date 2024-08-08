import { Request } from "express";
import tryCatch from "../utils/lib/tryCatch.lib";
import { responseHandler } from "../utils/lib/response.lib";
import { AuthService } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { ResponseData } from "../@types";
import { IUser } from "../@types";

export class AuthController {
  private authService: AuthService = new AuthService();

  public signUpUser = tryCatch(
    async (req: Request, res: ResponseData<IUser>) => {
      const user = await this.authService.signUp(req.body, res);
      return responseHandler.successResponse(
        res,
        StatusCodes.CREATED,
        "User created successfully",
        user
      );
    }
  );

  public loginUser = tryCatch(
    async (req: Request, res: ResponseData<IUser>) => {
      const user = await this.authService.login(req.body);
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Login successful",
        user
      );
    }
  );
}
