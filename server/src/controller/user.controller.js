import { messages } from "../messages/index.js"
import { userDeleteService, userViewAllService } from "../service/index.js"
import { response } from "../utils/index.js"


export const userViewController = async (req, res) => {
    try {
        const data = await userViewAllService()
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.user.USER_VIEWD,
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
export const userDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await userDeleteService(id)
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.user.USER_DELETED,
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