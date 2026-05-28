import { userLoginController, userRegisterController } from "./auth.controller.js";
import { cartAddController, cartDeleteController, cartQtyUpdateController, cartViewController } from "./cart.controller.js";
import { categoryAddController, categoryDeleteController, categoryEditController, categorySinglViewController, categoryViewController } from "./category.controller.js";
import { orderAddController, orderStatusUpdateController, orderVieByIdController, orderViewController } from "./order.controller.js";
import { productAddController, productDeleteController, productEditController, productViewBySlugController, productViewController } from "./product.controller.js";
import { userDeleteController, userViewController } from "./user.controller.js";

export {
    userRegisterController,
    userLoginController,
    productAddController,
    productDeleteController,
    productViewController,
    productEditController,
    productViewBySlugController,
    cartAddController,
    cartViewController,
    cartDeleteController,
    categoryAddController,
    categoryViewController,
    categoryEditController,
    categorySinglViewController,
    categoryDeleteController,
    cartQtyUpdateController,
    orderAddController,
    orderVieByIdController,
    orderViewController,
    orderStatusUpdateController,
    userViewController,
    userDeleteController
}