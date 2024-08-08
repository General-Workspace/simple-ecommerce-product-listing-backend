import { Request, Response, NextFunction, RequestHandler } from "express";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

class TryCatch {
  public asyncHandler(fn: AsyncFunction): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}
export default new TryCatch().asyncHandler;

// class TryCatchHandler {
//   constructor(private fn: AsyncFunction) {}

//   public async run(req: Request, res: Response, next: NextFunction) {
//     try {
//       await this.fn(req, res, next);
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// const tryCatch = (fn: AsyncFunction) => {
//   const handler = new TryCatchHandler(fn);
//   return handler.run.bind(handler);
// };

// export default tryCatch;

// class TryCatch {
//   public async asyncHandler(fn: AsyncFunction) {
//     return async (req: Request, res: Response, next: NextFunction) => {
//       try {
//         await fn(req, res, next);
//       } catch (error) {
//         next(error);
//       }
//     };
//   }
// }

// export default new TryCatch().asyncHandler;

//export default TryCatch.asyncHandler;
