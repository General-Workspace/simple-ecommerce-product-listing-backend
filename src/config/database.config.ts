import { connect, connection } from "mongoose";
import logger from "../utils/logger";

const connectDB = async (): Promise<void> => {
  const MONGO_URI: string = process.env["MONGO_URL"] || "";
  try {
    await connect(MONGO_URI);
    logger.info(`🟢 Database connected successfully: ${connection.host}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`🔴 Database connection failed: ${error.message}`);
    } else {
      logger.error("🔴 Database connection failed: Unknown error");
    }
  }
};

export default connectDB;
