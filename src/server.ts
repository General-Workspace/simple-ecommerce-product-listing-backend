import http from "node:http";
import dotenv from "dotenv";
import { App } from "./app";
import { sequelize } from "./config/sequelize.config";
import "reflect-metadata";
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
    sequelize
      .sync()
      .then(() => {
        this.server.listen(this.port, () => {
          logger.info(`Server is running on port ${this.port}`);
        });
      })
      .catch((error) => {
        console.error("Error connecting to the database: ", error);
        process.exit(1);
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
