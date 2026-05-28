import { messages } from "../messages/index.js"
import { userModel } from "../models/index.js"
import { checkPassword, hashedPassword, token } from "../utils/index.js"

export const userRegisterService = async (data) => {
    try {
        const { email, password } = data

        const isUserExists = await userModel.findOne({
            where: {
                email
            }
        })

        if (isUserExists) {
            return {
                status: false,
                statusCode: 400,
                message: messages.user.USER_ALREADY_EXIST
            }
        }
        const hashPassword = await hashedPassword(password)

        const res = await userModel.create({
            ...data,
            password: hashPassword
        })

        return {
            status: true,
            res
        }

    } catch (error) {
        throw error
    }
}

export const userLoginService = async (data) => {
    try {
        const { email, password } = data
        const checkUser = await userModel.findOne({
            where: {
                email
            }
        })

        if (!checkUser) {
            return {
                status: false,
                statusCode: 400,
                message: messages.user.USER_NOT_FOUND
            }
        }

        const isSame = await checkPassword(password, checkUser.password)
        // console.log(isSame);

        if (!isSame) {
            return {
                status: false,
                statusCode: 400,
                message: messages.auth.INVALID_CREDENTIAL
            }
        }

        const obj = {
            id: checkUser.id,
            name: checkUser.name,
            email: checkUser.email,
            role: checkUser.role
        }
        const tokenValue = token(obj, process.env.TOKENKEY)

        return {
            status: true,
            data: obj,
            tokenValue
        }
    } catch (error) {
        throw error
    }
}