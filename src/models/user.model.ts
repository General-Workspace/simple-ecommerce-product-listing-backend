import { Schema, model } from "mongoose";
import { IUser } from "../@types";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
