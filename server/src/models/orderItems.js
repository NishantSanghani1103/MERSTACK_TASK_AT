import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";
import { orderModel, productModel } from "./index.js";

export const orderItemModel = sequelize.define("order_item", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: orderModel,
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
            min: 1
        }
    },
    priceAtPurchase: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }

}, {
    timestamps: true
});