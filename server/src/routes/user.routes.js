import express from "express"
import { checkRole, checkToken } from "../middleware/index.js"
import { userDeleteController, userViewController } from "../controller/index.js"
export const userRoutes = express.Router()

userRoutes.get("/view",
    checkToken,
    checkRole("ADMIN"),
    userViewController
)
userRoutes.delete("/delete/:id",
    checkToken,
    checkRole("ADMIN"),
    userDeleteController
)