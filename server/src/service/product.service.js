import { Op } from "sequelize"
import { messages } from "../messages/index.js"
import { categoryModel, productModel } from "../models/index.js"

export const productAddService = async (data) => {
    try {
        const { name, categoryId } = data

        const checkCategory = await categoryModel.findByPk(categoryId)

        if (!checkCategory) {
            return {
                status: false,
                statusCode: 400,
                message: messages.category.CATEGORY_NOT_FOUND
            }
        }
        const checkProduct = await productModel.findOne({
            where: {
                name,
                categoryId
            }
        })
        // console.log(checkProduct);

        if (checkProduct) {
            return {
                status: false,
                statusCode: 400,
                message: messages.product.PRODUCT_ALREADY_EXIST
            }
        }

        const res = await productModel.create(data)

        return {
            status: true,
            res
        }
    } catch (error) {
        throw error
    }
}


export const productViewService = async (categoryId, sorting, name, priceFrom, priceTo, skip = 1) => {
    try {
        const condition = {}
        // console.log(priceFrom);
        const limit = 4
        const finalSkip = ((skip - 1) * limit) ?? 3
        let order = ["createdAt", "DESC"]

        if (categoryId) {
            condition.categoryId = categoryId.split(",")
        }
        if (name) {
            condition.name = {
                [Op.iLike]: `%${name}%`
            }
        }
        if (priceFrom && priceTo) {
            condition.price = {
                [Op.between]: [priceFrom, priceTo]
            }
        }
        if (sorting == 1) {
            order = ["createdAt", "DESC"]
        }
        if (sorting == 2) {
            order = ["price", "ASC"]
        }
        if (sorting == 3) {
            order = ["price", "DESC"]
        }
        const totalRecords = await productModel.count({
            where: condition
        });

        const data = await productModel.findAll({
            where: condition,
            limit,
            offset: finalSkip,
            include: [
                {
                    model: categoryModel,
                    as: "category",
                    attributes: ["id", "name"]
                }
            ],
            order: [order]
        })
        return { data, totalRecords: Math.ceil(totalRecords / limit), count: totalRecords }
    } catch (error) {
        throw error
    }
}

export const productEditService = async (id, data) => {
    try {
        // console.log(id);
        // console.log(data);
        const { name, price, stock, categoryId, description, images } = data
        const checkProduct = await productModel.findByPk(id)

        if (!checkProduct) {
            return {
                status: false,
                statusCode: 400,
                message: messages.product.PRODUCT_NOT_FOUND
            }
        }
        // const isSame = await productModel.findOne({
        //     where: {
        //         name,
        //         categoryId
        //     }
        // })
        // if (isSame) {
        //     return {
        //         status: false,
        //         statusCode: 400,
        //         message: messages.product.PRODUCT_ALREADY_EXIST
        //     }
        // }
        const editProduct = await checkProduct.update(
            {
                name,
                price,
                stock,
                categoryId,
                description,
                images
            },
            {
                where: {
                    id
                }
            }
        )
        await checkProduct.save();
        return {
            status: true,
            editProduct
        }

    } catch (error) {
        throw error
    }
}

export const productDeleteService = async (id) => {
    try {
        const checkProduct = await productModel.findByPk(id)

        if (!checkProduct) {
            return {
                status: false,
                statusCode: 400,
                message: messages.product.PRODUCT_NOT_FOUND
            }
        }
        const deleteProduct = await productModel.destroy({
            where: {
                id
            }
        })

        return {
            status: true,
            deleteProduct
        }
    } catch (error) {
        throw error
    }
}

export const productViewBySlugService = async (slug) => {
    try {
        const data = await productModel.findOne({
            where: {
                slug
            },
            include: [
                {
                    model: categoryModel,
                    as: "category",
                    attributes: ["id", "name"]
                }
            ]
        })
        if (!data) {
            return {
                status: false,
                statusCode: 400,
                message: messages.product.PRODUCT_NOT_FOUND
            }
        }
        return {
            status: true,
            data
        }
    } catch (error) {
        throw error
    }
}