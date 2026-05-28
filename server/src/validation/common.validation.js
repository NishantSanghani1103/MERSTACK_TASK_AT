import { body, param } from "express-validator";

export const uuidValidation = [
    param("id")
        .optional()
        .isUUID()
        .withMessage(`UUID is invalid`),

    body("productId")
        .optional()
        .isUUID()
        .withMessage("Body UUID is invalid")
]