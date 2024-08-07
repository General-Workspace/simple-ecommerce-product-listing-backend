import tryCatch from "../utils/lib/tryCatch.lib";
import { response } from "../utils/lib/response.lib";
import { AuthService } from "../services/auth.service";
import { StatusCodes } from "http-status-codes";

const authService = new AuthService();

export const signUp = tryCatch(async (req, res) => {
  const user = await authService.signUp(req.body, res);
  return response.successResponse(
    res,
    StatusCodes.CREATED,
    "User created successfully",
    user
  );
});
