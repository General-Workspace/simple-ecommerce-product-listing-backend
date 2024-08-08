import { Request } from "express";
import tryCatch from "../utils/lib/tryCatch.lib";
import { responseHandler } from "../utils/lib/response.lib";
// import Product from "../models/product.model";
import { ProductService } from "../services/product.service";
import { StatusCodes } from "http-status-codes";
import { ResponseData } from "../@types";
import { IProduct, IUser } from "../@types";

interface UserObject extends Request {
  user: IUser;
}

type ProductRequest = Request<unknown, unknown, IProduct, unknown>;

export class ProductController {
  private productService: ProductService = new ProductService();

  public createProduct = tryCatch(
    async (req: ProductRequest, res: ResponseData<IProduct>) => {
      const product = await this.productService.createProduct(
        req.body,
        (req as UserObject).user._id as string,
        req.file as Express.Multer.File
      );
      return responseHandler.successResponse(
        res,
        StatusCodes.CREATED,
        "Product created successfully",
        product
      );
    }
  );

  public fetchProducts = tryCatch(
    async (_req: Request, res: ResponseData<IProduct[]>) => {
      const products = await this.productService.fetchProducts();
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Products fetched successfully",
        products
      );
    }
  );

  public fetchProductById = tryCatch(
    async (req: Request, res: ResponseData<IProduct>) => {
      const product = await this.productService.fetchProductById(
        req.params["id"] as string
      );
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Product fetched successfully",
        product
      );
    }
  );

  public updateProduct = tryCatch(
    async (req: Request, res: ResponseData<IProduct>) => {
      const product = await this.productService.updateProduct(
        req.params["id"] as string,
        (req as UserObject).user._id as string,
        req.body
      );
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Product updated successfully",
        product
      );
    }
  );

  public deleteProduct = tryCatch(
    async (req: Request, res: ResponseData<IProduct>) => {
      await this.productService.deleteProduct(
        req.params["id"] as string,
        (req as UserObject).user._id as string
      );
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Product deleted successfully",
        null
      );
    }
  );

  public searchProducts = tryCatch(
    async (req: Request, res: ResponseData<IProduct[]>) => {
      const products = await this.productService.searchProducts(
        req.query["q"] as string
      );
      return responseHandler.successResponse(
        res,
        StatusCodes.OK,
        "Products fetched successfully",
        products
      );
    }
  );
}
