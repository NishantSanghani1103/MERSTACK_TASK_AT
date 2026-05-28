import { body } from "express-validator";

export const categoryValidation = [
    body("name")
        .notEmpty()
        .withMessage("category name is required")
        .isString()
        .withMessage("category name must be a string")
        .isLength({ min: 2, max: 250 })
        .withMessage("category name must be between 2 and 250 characters"),

]