import { messages } from "../messages/index.js"
import { response, verify } from "../utils/index.js"

export const checkToken = async (req, res, next) => {
 

    const token = req?.headers?.authorization?.split(" ")[1]
   
   
    if (!token) {
        return response(res, {
            status: false,
            statusCode: 400,
            message: messages.general.TOKEN_ERROR
        })
    }

    const decode = verify(token, process.env.TOKENKEY)
    // console.log(decode);
    
    req.user = decode

    next()
}