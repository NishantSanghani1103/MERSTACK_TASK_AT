import { messages } from "../messages/index.js";
import { response } from "../utils/index.js";

export const checkRole = (...roles) => {
    return (req, res, next) => {
        // console.log(roles);
        const { role } = req.user
        // console.log(role);
        if (!roles.includes(role)) {
            return response(res, {
                status: false,
                statusCode: 400,
                message: `${messages.general.UNAUTHORIZED} For ${role}`
            })
        }
        next()

    }
}