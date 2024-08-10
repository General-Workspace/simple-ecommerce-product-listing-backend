import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponseData, SuccessResponseData } from "../../@types";

class ResponseHandler {
  public successResponse<T>(
    res: Response,
    status_code: number = StatusCodes.OK,
    message: string,
    data: T
  ) {
    const response: SuccessResponseData<T> = {
      status: true,
      status_code,
      message,
      data,
    };
    return res.status(status_code).json(response);
  }

  public errorResponse(
    res: Response,
    status_code: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string
  ) {
    const response: ErrorResponseData = {
      status: false,
      status_code,
      message,
    };
    return res.status(status_code).json(response);
  }
}

export const responseHandler = new ResponseHandler();
