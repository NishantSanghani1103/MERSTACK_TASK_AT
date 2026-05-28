import { userModel } from "../models/index.js"

export const userViewAllService = async (data) => {
    try {
        const data = await userModel.findAll({
            order: [["createdAt", "DESC"]]
        })
        return data
    } catch (error) {
        throw error
    }
}


export const userDeleteService = async (id) => {
    try {
        const data = await userModel.destroy({
            where: {
                id
            }
        })
        return data
    } catch (error) {
        throw error
    }
}