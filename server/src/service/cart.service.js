import { messages } from "../messages/index.js"
import { cartItemModel, cartModel, productModel } from "../models/index.js"


export const cartAddService = async (userId, data) => {
    try {
        const { productId, quantity, productPrice } = data

        let checkCart = await cartModel.findOne({
            where: {
                userId
            }
        })
        if (!checkCart) {
            checkCart = await cartModel.create({ userId })
        }


        const checkProduct = await productModel.findByPk(productId)
        // console.log(checkProduct);

        if (!checkProduct) {
            return {
                status: false,
                statusCode: 400,
                message: messages.product.PRODUCT_NOT_FOUND
            }
        }
        const isExistsInCart = await cartItemModel.findOne({
            where: {
                cartId: checkCart.id,
                productId
            }
        })

        if (isExistsInCart) {
            return {
                status: false,
                statusCode: 400,
                message: messages.cart.ALREADY_IN_CART
            }
        }

        const createCartItems = await cartItemModel.create({
            cartId: checkCart.id,
            productId,
            quantity,
            productPrice
        })

        return {
            status: true,
            createCartItems
        }

    } catch (error) {
        throw error
    }
}

export const cartViewService = async (userId) => {
    try {
        const cart = await cartModel.findOne({
            where: {
                userId
            }
        })
        // console.log(cart);

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
            include: [
                {
                    model: productModel,
                    as: "product",
                    attributes: ["id", "imagesUrl", "images", "name", "slug"]
                }
            ]
        })

        return {
            status: true,
            cartItems
        }
    } catch (error) {
        throw error
    }
}

export const cartDeleteService = async (userId, id) => {
    try {
        // console.log(id);

        const checkCart = await cartModel.findOne({
            where: {
                userId
            }
        })


        // console.log(checkCart);
        const deleteRecord = await cartItemModel.destroy({
            where: {
                id,
                cartId: checkCart.id
            }
        })
        return deleteRecord

    } catch (error) {
        throw error
    }
}

export const cartUpdateQtyService = async (userId, quantity, id) => {
    // console.log(quantity);

    try {
        const checkCart = await cartModel.findOne({
            where: {
                userId
            }
        })
        // console.log(checkCart);
        const cartItems = await cartItemModel.findAll({
            where: {
                cartId: checkCart.id
            }
        })

        const updateQty = await cartItemModel.update(
            { quantity },
            {
                where: { id, cartId: checkCart.id }
            }
        );

        return updateQty

    } catch (error) {
        throw error
    }
}