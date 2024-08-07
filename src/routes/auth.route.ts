import { Router } from "express";
import { signUp } from "../controllers/auth.controller";

class AuthRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/signup", signUp);
  }
}

export default new AuthRoute().router;
