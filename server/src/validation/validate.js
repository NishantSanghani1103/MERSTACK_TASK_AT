import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    // console.log(req.params);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()[0].msg,
            field: errors.array()[0].path
        });
    }

    next();
};