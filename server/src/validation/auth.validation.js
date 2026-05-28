import { body } from "express-validator";
export const userRegisterValidator = [
    body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2 })
        .withMessage("Name must be at least 2 characters"),
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("confirmPassword")
        .notEmpty()
        .withMessage("Confirm Password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("confirm Password Doesn't Matched")
            }
            return true
        }),
    body("phone")
        .optional()
        .isMobilePhone()
        .withMessage("Invalid phone number"),
    body("role")
        .optional()
        .isIn(["ADMIN", "CUSTOMER"])
        .withMessage("Invalid role"),

    body("profilePicture")
        .optional()
        .isString()
        .withMessage("Profile picture must be a string (filename)")
];

export const userLoginValidator = [
    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters")
]