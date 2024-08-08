import { Router } from "express";
import authRoute from "./auth.route";
import productRoute from "./product.route";

class IndexRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.use("/api/v1/auth", authRoute);
    this.router.use("/api/v1/products", productRoute);
  }
}

export default new IndexRoute().router;
