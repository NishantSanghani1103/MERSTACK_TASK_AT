import { messages } from "../messages/index.js"
import { userLoginService, userRegisterService } from "../service/index.js"
import { response } from "../utils/index.js"

export const userRegisterController = async (req, res) => {
    try {

        if (req.file && req.file.filename) {
            req.body.profilePicture = req.file.filename
        }

        const data = await userRegisterService(req.body)

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
            message: messages.auth.SIGNUP_SUCCESS,
            data: data.res
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}

export const userLoginController = async (req, res) => {
    try {
        const data = await userLoginService(req.body)

        if (!data.status) {
            return response(res, {
                status: false,
                statusCode: data.statusCode,
                message: data.message
            })
        }

        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.auth.SIGNIN_SUCCESS,
            data: data.data,
            token: data.tokenValue
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: error.message
        })
    }
}