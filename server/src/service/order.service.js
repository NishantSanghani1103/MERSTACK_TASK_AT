import { where } from "sequelize";
import { sequelize } from "../config/index.js";
import { messages } from "../messages/index.js";
import {
    cartItemModel,
    cartModel,
    orderItemModel,
    orderModel,
    productModel,
    userModel
} from "../models/index.js";

export const orderAddService = async (userId, data) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            postalCode,
            country,
            paymentMethod
        } = data

        return await sequelize.transaction(async (t) => {

            const cart = await cartModel.findOne({
                where: {
                    userId
                },
                transaction: t
            });

            if (!cart) {
                return {
                    status: false,
                    statusCode: 400,
                    message: messages.cart.CAR_NOT_FOUND
                }
            }

            const cartItems = await cartItemModel.findAll({
                where: {
                    cartId: cart.id
                },
                transaction: t
            })

            if (!cartItems.length) {
                return {
                    status: false,
                    statusCode: 400,
                    message: messages.cart.CAR_NOT_FOUND
                }
            }

            let total = 0

            for (const items of cartItems) {

                const product = await productModel.findByPk(items.productId, {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                })

                if (!product) {
                    return {
                        status: false,
                        statusCode: 404,
                        message: `Product Not Found`
                    }
                }

                if (product.stock < items.quantity) {
                    return {
                        status: false,
                        statusCode: 401,
                        message: `Insufficient Stock For Product ${product.name}`
                    }
                }

                total += product.price * items.quantity;
            }

            const order = await orderModel.create({
                userId,
                totalAmount: total,
                paymentMethod,
                firstName,
                lastName,
                email,
                phone,
                address,
                city,
                state,
                postalCode,
                country
            }, {
                transaction: t
            })

            const orderItems = []

            for (const items of cartItems) {

                const product = await productModel.findByPk(items.productId, {
                    transaction: t,
                    lock: t.LOCK.UPDATE
                })

                await product.update(
                    {
                        stock: product.stock - items.quantity
                    },
                    {
                        transaction: t
                    }
                )

                orderItems.push({
                    orderId: order.id,
                    productId: items.productId,
                    quantity: items.quantity,
                    priceAtPurchase: product.price
                })
            }

            await orderItemModel.bulkCreate(orderItems, {
                transaction: t
            })

            await cartItemModel.destroy({
                where: {
                    cartId: cart.id
                },
                transaction: t
            })

            return {
                status: true,
                statusCode: 201,
                message: messages.order.ORDER_PLACED,
                dataRes: order
            }

        });

    } catch (error) {
        throw error;
    }
}

export const orderViewService = async (userId) => {
    try {
        // console.log(userId);

        const order = await orderModel.findAll({
            where: {
                userId
            },
            include: [
                {
                    model: orderItemModel,
                    as: "items",
                    attributes: ["quantity"],
                    include: [
                        {
                            model: productModel,
                            as: "product",
                            attributes: ["id", "imagesUrl", "images", "name", "price", "description"]
                        },
                        {
                            model: orderModel,
                            as: "orders",
                            attributes: ["id", "totalAmount", "paymentMethod", "paymentStatus", "status"]
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        })
        return order
    } catch (error) {
        throw error
    }
}

export const orderViewAllService = async () => {
    try {
        const data = await orderModel.findAll({
            include: [
                {
                    model: userModel,
                    as: "user",
                    attributes: ["name", "email"]
                },
                {
                    model: orderItemModel,
                    as: "items",
                    attributes: ["quantity"],
                    include: [
                        {
                            model: productModel,
                            as: "product",
                            attributes: ["id", "imagesUrl", "images", "name", "price", "description"]
                        },
                        {
                            model: orderModel,
                            as: "orders",
                            attributes: ["id", "totalAmount", "paymentMethod", "paymentStatus", "status"]
                        }
                    ]
                }
            ],
            order: [["createdAt", "DESC"]]
        })
        return data
    } catch (error) {
        throw error
    }
}
export const orderStatusUpdateService = async (id, status) => {
    try {
        const checkOrder = await orderModel.findByPk(id)
        if (!checkOrder) {
            return {
                status: false,
                statusCode: 400,
                message: messages.order.ORDER_NOT_FOUND
            }
        }
        const data = await orderModel.update(
            {
                status
            },
            {
                where: {
                    id
                }
            }
        )
        return { status: true, data }
    } catch (error) {
        throw error
    }
}