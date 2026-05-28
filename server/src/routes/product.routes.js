import express from "express"
import { checkRole, checkToken, uploadFiles } from "../middleware/index.js"
import { productAddController, productDeleteController, productEditController, productViewBySlugController, productViewController } from "../controller/index.js"

import { productValidation, uuidValidation, validate } from "../validation/index.js"
export const productRoutes = express.Router()
productRoutes.post("/add",
    checkToken,
    checkRole("ADMIN"),
    uploadFiles("products", "images", 5),
    productValidation,
    validate,
    productAddController
)

productRoutes.get("/view", productViewController)


productRoutes.put("/edit/:id",
    checkToken,
    checkRole("ADMIN"),
    uploadFiles("products", "images", 5),
    uuidValidation,
    productValidation,
    validate,
    productEditController
)

productRoutes.delete("/delete/:id",
    checkToken,
    checkRole("ADMIN"),
    uuidValidation,
    validate,
    productDeleteController
)

productRoutes.get("/view/:slug", productViewBySlugController)