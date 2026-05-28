import jwt from "jsonwebtoken"

export const token = (obj, key) => {
    return jwt.sign(obj, key)
}

export const verify = (token, key) => {
    return jwt.verify(token, key)
}