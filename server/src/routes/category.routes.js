import express from "express"
import { categoryAddController, categoryDeleteController, categoryEditController, categorySinglViewController, categoryViewController } from "../controller/index.js"
import { categoryValidation, uuidValidation, validate } from "../validation/index.js"
import { checkRole, checkToken } from "../middleware/index.js"
export const categoryRoutes = express.Router()
categoryRoutes.post("/add",
    checkToken,
    checkRole("ADMIN"),
    categoryValidation,
    validate,
    categoryAddController)

categoryRoutes.get("/view", categoryViewController)

categoryRoutes.delete("/delete/:id",
    checkToken,
    checkRole("ADMIN"),
    uuidValidation,
    validate,
    categoryDeleteController
)

categoryRoutes.get("/view/:id", categorySinglViewController)

categoryRoutes.put("/edit/:id",
    checkToken,
    checkRole("ADMIN"),
    categoryEditController
)