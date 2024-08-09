import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authService } from "../middlewwares/authorization/user.authorization";
import { multerConfig } from "../config/multer.config";

const upload = multerConfig.single("imageURL");

class ProductRoute {
  public router: Router;
  private authController: ProductController = new ProductController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post(
      "/add-product",
      authService,
      upload,
      this.authController.createProduct
    );
    this.router.get(
      "/all-products",
      authService,
      this.authController.fetchProducts
    );
    this.router.get("/search", authService, this.authController.searchProducts);
    this.router.get("/:id", authService, this.authController.fetchProductById);
    this.router.put("/:id", authService, upload, this.authController.updateProduct);
    this.router.delete("/:id", authService, this.authController.deleteProduct);
  }
}

export default new ProductRoute().router;
