import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import { cartModel, productModel } from "./index.js";
export const cartItemModel = sequelize.define("cart_item", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    cartId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: cartModel,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    productId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: productModel,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1
        }
    },
    productPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ["cartId", "productId"]
        }
    ]
}
);