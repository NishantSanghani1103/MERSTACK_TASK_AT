import { messages } from "../messages/index.js"
import { categoryModel } from "../models/index.js"

export const categoryAddService = async (data) => {
    try {
        const { name } = data

        const checkCategory = await categoryModel.findOne({
            where: {
                name
            }
        })

        if (checkCategory) {
            return {
                status: false,
                statusCode: 400,
                message: messages.category.CATEGORY_ALREADY_EXIST
            }
        }

        const res = await categoryModel.create(data)

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}

export const categoryViewService = async () => {
    try {
        const data = await categoryModel.findAll()

        return data
    } catch (error) {
        throw error
    }
}

export const categoryDeleteService = async (id) => {
    try {
        const checkCategory = await categoryModel.findByPk(id)

        if (!checkCategory) {
            return {
                status: false,
                statusCode: 400,
                message: messages.category.CATEGORY_NOT_FOUND
            }
        }

        const data = await categoryModel.destroy({
            where: {
                id
            }
        })
        return {
            status: true,
            data
        }
    } catch (error) {
        throw error
    }
}

export const categoryEditService = async (id, name) => {
    try {
        const checkCategory = await categoryModel.findByPk(id)

        if (!checkCategory) {
            return {
                status: false,
                statusCode: 400,
                message: messages.category.CATEGORY_NOT_FOUND
            }
        }

        const res = await categoryModel.update(
            { name },
            {
                where: {
                    id
                }
            }
        )
        return { status: true, res }
    } catch (error) {
        throw error
    }
}

export const categorySingleViewService = async (id) => {
    try {
        const checkCategory = await categoryModel.findByPk(id)

        if (!checkCategory) {
            return {
                status: false,
                statusCode: 400,
                message: messages.category.CATEGORY_NOT_FOUND
            }
        }

        return { status: true, checkCategory }
    } catch (error) {
        throw error
    }
}