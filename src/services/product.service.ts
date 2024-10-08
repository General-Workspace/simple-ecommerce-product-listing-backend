import Product from "../models/product.model";
import { IProductService, IProduct /*, ResponseData*/ } from "../@types";
import mongoose from "mongoose";
import { cloudinary } from "../config/multer.config";
import { NotFound, BadRequest } from "../middlewwares/error/error.middleware";

export class ProductService implements IProductService {
  public createProduct = async (
    payload: IProduct,
    userId: string,
    file: Express.Multer.File
  ): Promise<unknown> => {
    const { name, price, description } = payload;

    const createdBy = userId;

    // convert price to number
    payload.price = Number(price);

    if (file) {
      const image = await cloudinary.uploader.upload(file.path);
      payload.imageURL = image.secure_url;
    }

    const product = new Product({
      name,
      price,
      description,
      imageURL: payload.imageURL,
      createdBy,
    });

    await product.save();

    return product;
  };

  public fetchProducts = async (): Promise<unknown> => {
    const products = await Product.find();

    if (products.length < 1) {
      throw new NotFound("No products found");
    }

    return products;
  };

  public fetchProductById = async (id: string): Promise<unknown> => {
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequest("Invalid product id");
    }

    const product = await Product.findById(id);
    if (!product) {
      throw new NotFound("Product not found");
    }

    return product;
  };

  public updateProduct = async (
    id: string,
    userId: string,
    payload: IProduct,
    file: Express.Multer.File
  ): Promise<unknown> => {
    const { name, price, description } = payload;

    const product = await Product.findOne({ _id: id, createdBy: userId });
    if (!product) {
      throw new NotFound("Product not found");
    }

    if (price) {
      payload.price = Number(price);
    }

    if (file) {
      const oldImageUrl = product.imageURL;
      if (oldImageUrl) {
        const publicId = oldImageUrl.split("/").pop()?.split(".")[0];
        await cloudinary.uploader.destroy(publicId as string);
      }

      const { secure_url } = await cloudinary.uploader.upload(file.path);
      payload.imageURL = secure_url;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          price: payload.price,
          description,
          imageURL: payload.imageURL,
        },
      },
      { new: true }
    );

    return updatedProduct;
  };

  public deleteProduct = async (
    id: string,
    userId: string
  ): Promise<unknown> => {
    const product = await Product.findOne({ _id: id, createdBy: userId });
    if (!product) {
      throw new NotFound("Product not found");
    }

    const imageUrl = product.imageURL;
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop()?.split(".")[0];
      await cloudinary.uploader.destroy(publicId as string);
    }

    await product.deleteOne();
    return { message: "Product deleted successfully" };
  };

  public searchProducts = async (query: string): Promise<unknown> => {
    const queryObject = {} as Record<string, unknown>;

    if (!query) {
      throw new BadRequest("Query parameter is required");
    }

    if (query) {
      queryObject["$or"] = [
        { name: { $regex: query as string, $options: "i" } },
      ];
    }

    const products = await Product.find(queryObject);

    return products;
  };
}
