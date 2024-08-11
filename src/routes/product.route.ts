import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authService } from "../middlewwares/authorization/user.authorization";
import { multerConfig } from "../config/multer.config";
import {
  productValidation,
  productIdValidation,
  updateProductValidation,
  deleteProductValidation,
} from "../middlewwares/validation/product.validation";

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
      productValidation,
      this.authController.createProduct
    );
    this.router.get(
      "/all-products",
      authService,
      this.authController.fetchProducts
    );
    this.router.get("/search", authService, this.authController.searchProducts);
    this.router.get(
      "/:id",
      authService,
      productIdValidation,
      this.authController.fetchProductById
    );
    this.router.put(
      "/:id",
      authService,
      upload,
      updateProductValidation,
      this.authController.updateProduct
    );
    this.router.delete(
      "/:id",
      authService,
      deleteProductValidation,
      this.authController.deleteProduct
    );
  }
}

export default new ProductRoute().router;
