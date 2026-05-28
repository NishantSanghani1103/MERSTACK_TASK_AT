import express from "express"
import { userLoginController, userRegisterController } from "../controller/index.js"
import { userLoginValidator, userRegisterValidator, validate } from "../validation/index.js"
import { uploadFiles } from "../middleware/index.js"



export const authRoutes = express.Router()
authRoutes.post("/register",
    uploadFiles("users", "profilePicture", 1),
    userRegisterValidator,
    validate,
    userRegisterController
)

authRoutes.post("/login",
    userLoginValidator,
    validate,
    userLoginController
)