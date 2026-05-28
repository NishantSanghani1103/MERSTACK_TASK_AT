import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

import slugify from "slugify";
import { generateSlug } from "../utils/index.js";
import { categoryModel } from "./category.model.js";
export const productModel = sequelize.define(
    "product",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 250]
            }
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: categoryModel,
                key: "id"
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [2, 500]
            }
        },
        images: {
            type: DataTypes.JSON
        },
        imagesUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                const images = this.getDataValue("images");

                if (!images || !Array.isArray(images)) {
                    return [];
                }

                return images.map((img) => {
                    return `${process.env.PRODUCT_IMAGE_PATH}${img}`;
                });
            }
        }
    },
    {
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ["categoryId", "name"]
            }
        ],
        hooks: {
            beforeValidate: (product) => generateSlug(product),
            beforeUpdate: (product) => {
                generateSlug(product);

                product.changed("slug", true);
            }
        }
    }
);