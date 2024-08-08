import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  field: string;
  message: string;
}

const errorFormatter = ({ msg, param }: any): CustomError => {
  //return `${location}[${param}]: ${msg}`;
  return { field: param, message: msg } as CustomError;
};

/**
 * @description validate user registration
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {object} error
 */

type ValidateUserResponse = Response<unknown, Record<string, unknown>>;

export const signUpValidation = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .trim()
    .escape(),
  body("username")
    .exists()
    .withMessage("Username is required")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Invalid username")
    .trim()
    .escape(),

  (req: Request, res: ValidateUserResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }
    return next();
  },
];

export const loginValidation = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email")
    .trim()
    .escape(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .trim()
    .escape(),

  (req: Request, res: ValidateUserResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }
    return next();
  },
];
