import { messages } from "../messages/index.js"
import { orderAddService, orderStatusUpdateService, orderViewAllService, orderViewService } from "../service/index.js"
import { response } from "../utils/index.js"

export const orderAddController = async (req, res) => {
    try {
        const { id } = req.user
        // console.log(id);

        const data = await orderAddService(id, req.body)

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
            message: messages.order.ORDER_PLACED
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}

export const orderVieByIdController = async (req, res) => {
    try {
        const { id } = req.user
        // console.log("userId",id);

        const data = await orderViewService(id)
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.order.ORDER_VIEWD,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}

export const orderViewController = async (req, res) => {
    try {
        const data = await orderViewAllService()

        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.order.ORDER_VIEWD,
            data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}

export const orderStatusUpdateController = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.query


        const data = await orderStatusUpdateService(id, status)
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
            message: messages.order.ORDER_STATUS_UPDATED,
            data
        })

    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}