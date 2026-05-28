import { DataTypes } from "sequelize";
import { sequelize } from "../config/index.js";

export const categoryModel = sequelize.define("category", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 252]
        }
    }
}, {
    timestamps: true
});