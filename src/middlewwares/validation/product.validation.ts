import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";

interface CustomError extends Error {
  field: string;
  message: string;
}

const errorFormatter = ({ msg, param }: any): CustomError => {
  return { field: param, message: msg } as CustomError;
};

/**
 * @description validate create product
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {object} error
 */

type ValidateProductResponse = Response<unknown, Record<string, unknown>>;

export const productValidation = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Invalid name")
    .trim()
    .escape(),
  body("price")
    .exists()
    .withMessage("Price is required")
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isNumeric()
    .withMessage("Invalid price")
    .trim()
    .escape(),
  body("description")
    .exists()
    .withMessage("Description is required")
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Invalid description")
    .trim()
    .escape(),

  (req: Request, res: ValidateProductResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    return next();
  },
];

/**
 * @description validate get product by id
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {object} error
 */

export const productIdValidation = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Invalid id")
    .trim()
    .escape(),

  (req: Request, res: ValidateProductResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    return next();
  },
];

/**
 * @description validate update product
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {object} error
 */

export const updateProductValidation = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Invalid id")
    .trim()
    .escape(),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isString()
    .withMessage("Invalid name")
    .trim()
    .escape(),
  body("price")
    .optional()
    .notEmpty()
    .withMessage("Price cannot be empty")
    .isString()
    .withMessage("Invalid price")
    .trim()
    .escape(),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty")
    .isString()
    .withMessage("Invalid description")
    .trim()
    .escape(),

  (req: Request, res: ValidateProductResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    return next();
  },
];

/**
 * @description validate delete product
 * @param {string} req
 * @param {string} res
 * @param {string} next
 * @returns {object} error
 */

export const deleteProductValidation = [
  param("id")
    .exists()
    .withMessage("Id is required")
    .notEmpty()
    .withMessage("Id cannot be empty")
    .isString()
    .withMessage("Invalid id")
    .trim()
    .escape(),

  (req: Request, res: ValidateProductResponse, next: NextFunction) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.mapped() });
    }

    return next();
  },
];
