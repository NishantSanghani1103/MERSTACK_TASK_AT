import { messages } from "../messages/index.js"
import { categoryAddService, categoryDeleteService, categoryEditService, categorySingleViewService, categoryViewService } from "../service/index.js"
import { response } from "../utils/index.js"

export const categoryAddController = async (req, res) => {
    try {
        const data = await categoryAddService(req.body)

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
            message: messages.category.CATEGORY_ADDED,
            data: data.res

        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const categoryViewController = async (req, res) => {
    try {
        const data = await categoryViewService()
        return response(res, {
            status: true,
            statusCode: 201,
            message: messages.category.CATEGORY_VIEWD,
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

export const categoryDeleteController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await categoryDeleteService(id)
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
            message: messages.category.CATEGORY_DELETED,
            data: data.data

        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}
export const categoryEditController = async (req, res) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const data = await categoryEditService(id, name)
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
            message: messages.category.CATEGORY_UPDATED,
            data: data.res

        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}

export const categorySinglViewController = async (req, res) => {
    try {
        const { id } = req.params
        const data = await categorySingleViewService(id)
        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.category.CATEGORY_VIEWD,
            data: data.checkCategory

        })

    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error.message
        })
    }
}