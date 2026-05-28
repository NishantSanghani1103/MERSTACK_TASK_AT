import { messages } from "../messages/index.js"
import { cartAddService, cartDeleteService, cartUpdateQtyService, cartViewService } from "../service/index.js";
import { response } from "../utils/index.js"

export const cartAddController = async (req, res) => {
    try {
        const { id } = req.user
        console.log(req.user);

        console.log(id);
        const data = await cartAddService(id, req.body)

        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.cart.CART_ADDED,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const cartViewController = async (req, res) => {
    try {
        const { id } = req.user
        const data = await cartViewService(id)
        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.cart.CART_VIWED,
            data: data.cartItems
        })

    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const cartDeleteController = async (req, res) => {
    try {
        const { user } = req
        const { id } = req.params
        const data = await cartDeleteService(user.id, id)

        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.cart.CART_REMOVED,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const cartQtyUpdateController = async (req, res) => {
    try {
        const { id: userId } = req.user
        // console.log(userId);
        
    
        const { id } = req.params
        // console.log(id);
        
        const { quantity } = req.body
        // console.log(quantity);

        const data = await cartUpdateQtyService(userId, quantity, id)
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.cart.CART_QTY_UPDATED
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}