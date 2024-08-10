import User from "../models/user.model";
import { IAuthService, IUserLogin, IUser } from "../@types";
import BcryptHelper from "../utils/helpers/bcrypt.helper";
import { jwtService } from "../utils/helpers/jwt.helper";
import { UserHelper } from "../utils/helpers/user.helper";
import {
  NotFound,
  Conflict,
  Unauthorized,
} from "../middlewwares/error/error.middleware";

export class AuthService implements IAuthService {
  public signUp = async (payload: IUser): Promise<unknown> => {
    const { email, password, username } = payload;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Conflict("User already exists");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      throw new Conflict("Username already exists");
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

  public login = async (payload: IUserLogin): Promise<unknown> => {
    const { email, password } = payload;

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("User not found");
    }

    const isPasswordValid = await BcryptHelper.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Unauthorized("Invalid email or password");
    }

    const token = jwtService.generateToken({ email });
    const userResponse = UserHelper.formatUserResponse(user);
    return { ...userResponse, token };
  };
}
