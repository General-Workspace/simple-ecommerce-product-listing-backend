import { Request, Response } from "express";
import { Document } from "mongoose";

declare type ResponseData<T> = Response<T>;

declare interface SuccessResponseData<T> {
  status_code: number;
  status: string;
  message: string;
  data: T;
}

declare interface ErrorResponseData {
  status_code: number;
  status: string;
  message: string;
}

declare interface UserObject extends Request {
  user: User;
}

declare interface IUser extends Document {
  email: string;
  password: string;
  username: string;
}

declare interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageURL: string;
  createdBy: string | IUser;
}

declare interface IUserLogin {
  email: string;
  password: string;
}

declare interface IAuthService {
  signUp(payload: IUserRegister, res: unknown): Promise<unknown>;
  login(payload: IUserLogin): Promise;
}

declare interface IProductService {
  createProduct(
    payload: IProduct,
    userId: string,
    file: Express.Multer.File
  ): Promise<unknown>;
  fetchProducts(): Promise<unknown>;
  fetchProductById(id: string): Promise<unknown>;
  updateProduct(
    id: string,
    userId: string,
    payload: IProduct
  ): Promise<unknown>;
  deleteProduct(id: string, userId): Promise<unknown>;
  searchProducts(query: string): Promise<unknown>;
}

declare interface CustomParams {
  folder: string;
  allowedFormats: string[];
}

// declare type UserResponse = ResponseData<
//   SuccessResponseData<RegisterUserRequest> | ErrorResponseData
// >;
