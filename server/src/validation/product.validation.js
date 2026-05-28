import { body } from "express-validator";
export const productValidation = [
    body("name")
        .notEmpty()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Product name must be a string")
        .isLength({ min: 2, max: 250 })
        .withMessage("Product name must be between 2 and 250 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .isDecimal({ decimal_digits: "0,2" })
        .withMessage("Price must be a valid decimal number"),

    body("stock")
        .notEmpty()
        .withMessage("Stock is required")
        .isInt({ min: 0 })
        .withMessage("Stock must be a positive integer"),

    body("categoryId")
        .notEmpty()
        .withMessage("Category is required")
        .isUUID()
        .withMessage(`UUID is invalid`),

    body("description")
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 2, max: 500 })
        .withMessage("Description must be between 2 and 500 characters"),

    body("images")
        .optional()
        .isArray()
        .withMessage("Images must be an array"),
];