import express from "express"
import { checkRole, checkToken } from "../middleware/index.js"
import { orderAddController, orderStatusUpdateController, orderVieByIdController, orderViewController } from "../controller/index.js"
import { uuidValidation, validate } from "../validation/index.js"
export const orderRoutes = express.Router()

orderRoutes.post("/add",
    checkToken,
    checkRole("CUSTOMER"),
    orderAddController
)

orderRoutes.get("/view",
    checkToken,
    checkRole("CUSTOMER"),
    orderVieByIdController
)

orderRoutes.get("/view-all",
    checkToken,
    checkRole("ADMIN"),
    orderViewController
)

orderRoutes.put("/edit-status/:id",
    checkToken,
    checkRole("ADMIN"),
    uuidValidation,
    validate,
    orderStatusUpdateController
)