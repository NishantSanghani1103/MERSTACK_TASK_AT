import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";
import { userModel } from "./user.model.js";

export const cartModel = sequelize.define("cart", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel,
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    timestamps: true
})