import express from "express"

import { cartAddController, cartDeleteController, cartQtyUpdateController, cartViewController } from "../controller/index.js"
import { uuidValidation, validate } from "../validation/index.js"

export const cartRoutes = express.Router()

cartRoutes.post("/add",
    cartAddController
)
cartRoutes.get("/view",
    uuidValidation,
    validate,
    cartViewController)

cartRoutes.delete("/delete/:id",
    uuidValidation,
    validate,
    cartDeleteController
)
cartRoutes.put("/update-qty/:id",
    cartQtyUpdateController
)