import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import {
  signUpValidation,
  loginValidation,
} from "../middlewwares/validation/auth.validation";

class AuthRoute {
  public router: Router;
  private authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/signup",
      signUpValidation,
      this.authController.signUpUser
    );
    this.router.post("/login", loginValidation, this.authController.loginUser);
  }
}

export default new AuthRoute().router;
