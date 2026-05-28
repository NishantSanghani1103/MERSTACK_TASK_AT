import { messages } from "../messages/index.js"
import { productAddService, productDeleteService, productEditService, productViewBySlugService, productViewService } from "../service/index.js"
import { response } from "../utils/index.js"

export const productAddController = async (req, res) => {
    try {
        if (req.files.images) {
            req.body.images = req.files.images.map((value) => value.filename)
        }
        const data = await productAddService(req.body)
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
            message: messages.product.PRODUCT_CREATED,
            data: data.res
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error
        })
    }
}

export const productViewController = async (req, res) => {
    try {
        const { categoryId, sorting, name, priceFrom, priceTo, skip } = req.query
        const data = await productViewService(categoryId, sorting, name, priceFrom, priceTo, skip)

        return response(res, {
            status: true,
            statusCode: 201,
            count: data.totalRecords,
            message: messages.product.PRODUCT_VIEWD,
            count: data.count,
            totalRecords: data.totalRecords,
            data: data.data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error
        })
    }
}

export const productEditController = async (req, res) => {
    try {
        const { id } = req.params
        if (req.files.images) {
            req.body.images = req.files.images.map((value) => value.filename)
        }
        const data = await productEditService(id, req.body)

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
            message: messages.product.PRODUCT_UPDATED,
            data: data.editProduct
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error
        })
    }
}

export const productDeleteController = async (req, res) => {
    try {
        const { id } = req.params


        const data = await productDeleteService(id)

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
            message: messages.product.PRODUCT_DELETED,
            data: data.deleteProduct
        })

    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error
        })
    }
}

export const productViewBySlugController = async (req, res) => {
    try {
        const { slug } = req.params
        const data = await productViewBySlugService(slug)
        if (!data.status) {
            return response(res, {
                status: data.status,
                statusCode: data.statusCode,
                message: data.message
            })
        }
        return response(res, {
            status: true,
            statusCode: 200,
            message: messages.product.PRODUCT_VIEWD,
            data: data.data
        })
    } catch (error) {
        return response(res, {
            status: false,
            statusCode: 500,
            message: error
        })
    }
}