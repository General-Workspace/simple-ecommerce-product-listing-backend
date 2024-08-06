import express, { Application, Request, Response, NextFunction } from "express";
// import { routes } from "./routes";
// import { errorHandler } from './middleware/error-handler';
import cors from "cors";
import morgan from "morgan";
import { StatusCodes } from "http-status-codes";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
    this.mountRoutes();
    this.initializeErrorHandling();
  }

  private configure() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    // this.app.use(router);
    // this.app.use(errorHandler);
  }

  private mountRoutes() {
    //this.app.use("/", routes);

    this.app.get("/", (_req: Request, res: Response) => {
      res.status(StatusCodes.OK).json({
        message: "Welcome to this mini Ecommerce app",
      });
    });

    this.app.all("*", (_req: Request, res: Response) => {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "Resource not found",
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(
      (
        error: Error,
        _req: Request,
        res: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _next: NextFunction
      ): void => {
        const err: {
          name: string;
          message: string;
          stack?: string | undefined;
        } = {
          name: error.name,
          message: error.message,
          stack: error.stack,
        };

        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      }
    );
  }
}

export default App;
