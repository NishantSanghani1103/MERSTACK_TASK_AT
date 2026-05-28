import { cartItemModel, cartModel, categoryModel, orderItemModel, orderModel, productModel, userModel } from "./index.js";





productModel.belongsTo(categoryModel, {
    as: "category",
    foreignKey: "categoryId"
})
userModel.hasOne(cartModel, {
    as: "cart",
    foreignKey: "userId"
})

cartModel.belongsTo(userModel, {
    as: "user",
    foreignKey: "userId"
})


cartModel.hasMany(cartItemModel, {
    as: "cartitems",
    foreignKey: "cartId"
})

cartItemModel.belongsTo(cartModel, {
    as: "cart",
    foreignKey: "cartId"

})


productModel.hasMany(cartItemModel, {
    as: "cartitems",
    foreignKey: "productId"
})

cartItemModel.belongsTo(productModel, {
    as: "product",
    foreignKey: "productId"
})

// order module

userModel.hasMany(orderModel, {
    as: "order",
    foreignKey: "userId"
})
orderModel.belongsTo(userModel, {
    as:"user",
    foreignKey:"userId"
})

userModel.hasMany(orderItemModel, {
    as: "orders",
    foreignKey: "userId"
})
orderItemModel.belongsTo(userModel, {
    as: "user",
    foreignKey: "userId"
})

orderModel.hasMany(orderItemModel, {
    as: "items",
    foreignKey: "orderId"
});

orderItemModel.belongsTo(orderModel, {
    as: "orders",
    foreignKey: "orderId"
})

orderItemModel.belongsTo(productModel, {
    foreignKey: "productId",
    as: "product"
});
