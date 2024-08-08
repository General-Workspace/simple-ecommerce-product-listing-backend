import User from "../models/user.model";
import { IAuthService, IUserLogin, IUser, ResponseData } from "../@types";
import BcryptHelper from "../utils/helpers/bcrypt.helper";
import { responseHandler } from "../utils/lib/response.lib";
import { StatusCodes } from "http-status-codes";
import { jwtService } from "../utils/helpers/jwt.helper";
import { UserHelper } from "../utils/helpers/user.helper";

export class AuthService implements IAuthService {
  public signUp = async (
    payload: IUser,
    res: ResponseData<IUser>
  ): Promise<unknown> => {
    const { email, password, username } = payload;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return responseHandler.errorResponse(
        res,
        StatusCodes.CONFLICT,
        "User already exists"
      );
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return responseHandler.errorResponse(
        res,
        StatusCodes.CONFLICT,
        "Username has been taken"
      );
    }

    const hashedPassword = await BcryptHelper.hashPassword(password);
    const user: IUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    const newUser = await user.save();
    const userResponse = { ...newUser.toJSON() };
    delete userResponse["password"];

    return userResponse;
  };

  public login = async (
    payload: IUserLogin
    //res: ResponseData<IUser>
  ): Promise<unknown> => {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
      // return responseHandler.errorResponse(
      //   res,
      //   StatusCodes.NOT_FOUND,
      //   "User not found"
      // );
    }

    const isPasswordValid = await BcryptHelper.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      // return responseHandler.errorResponse(
      //   res,
      //   StatusCodes.UNAUTHORIZED,
      //   "Invalid credentials"
      // );
      throw new Error("Invalid Credentials");
    }

    const token = jwtService.generateToken({ email });
    const userResponse = UserHelper.formatUserResponse(user);
    return { ...userResponse, token };
  };
}
