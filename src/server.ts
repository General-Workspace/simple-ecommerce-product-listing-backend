import http from "node:http";
import dotenv from "dotenv";
import { App } from "./app";
import connectDB from "./config/database.config";
import logger from "./utils/logger";

dotenv.config();

const app = new App().app;

class Server {
  private server: http.Server;
  private port: string | number;

  constructor() {
    this.port = process.env["PORT"] || 5000;
    app.set("port", this.port);
    this.server = http.createServer(app);
    this.startServer();
    this.handleShutdown();
  }

  private startServer(): void {
    this.server.listen(this.port, async () => {
      await connectDB();
      logger.info(`Server is running on port ${this.port}`);
    });
  }

  private handleShutdown(): void {
    process.on("SIGINT", () => {
      this.server.close(() => {
        console.log("Server is shutting down.");
        process.exit(0);
      });
    });
  }
}

new Server();
