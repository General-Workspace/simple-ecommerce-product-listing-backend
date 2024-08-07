import { Request, Response, NextFunction } from "express";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown> | void;

// class TryCatch {
//   public static async asyncHandler(fn: AsyncFunction) {
//     return (req: Request, res: Response, next: NextFunction) => {
//       return Promise.resolve(fn(req, res, next)).catch(next);
//     };
//   }
// }

// export default TryCatch.asyncHandler;

class TryCatchHandler {
  constructor(private fn: AsyncFunction) {}

  public async run(req: Request, res: Response, next: NextFunction) {
    try {
      await this.fn(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}

const tryCatch = (fn: AsyncFunction) => {
  const handler = new TryCatchHandler(fn);
  return handler.run.bind(handler);
};

export default tryCatch;
