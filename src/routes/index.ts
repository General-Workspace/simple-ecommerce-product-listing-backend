import { Router } from "express";
import authRoute from "./auth.route";

class IndexRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.use("/api/v1/auth", authRoute);
  }
}

export default new IndexRoute().router;
