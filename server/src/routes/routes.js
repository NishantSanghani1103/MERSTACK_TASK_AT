import express from "express"
import { authRoutes, cartRoutes, categoryRoutes, orderRoutes, productRoutes, userRoutes } from "./index.js"
import { checkRole, checkToken } from "../middleware/index.js"
export const routes = express.Router()
routes.use("/auth", authRoutes)
routes.use("/product", productRoutes)
routes.use("/cart", checkToken, checkRole("CUSTOMER"), cartRoutes)
routes.use("/category", categoryRoutes)
routes.use("/order", orderRoutes)
routes.use("/user", userRoutes)