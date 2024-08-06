import { Sequelize } from "sequelize-typescript";
import { User } from "../models/users.model";
import { Product } from "../models/products.model";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env["DB_NAME"] as string,
  username: process.env["DB_USER"] as string,
  password: process.env["DB_PASSWORD"] as string,
  models: [User, Product],
});
