import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";
import { userModel } from "./index.js";


export const orderModel = sequelize.define("order", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
    },


    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },


    status: {
        type: DataTypes.ENUM(
            "pending",
            "placed",
            "shipped",
            "delivered",
            "cancelled"
        ),
        defaultValue: "pending"
    },


    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.ENUM("pending", "paid", "failed"),
        defaultValue: "pending"
    },

    firstName: {
        type: DataTypes.STRING,

    },
    lastName: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.STRING,

    },
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,

    },
    state: {
        type: DataTypes.STRING,

    },
    postalCode: {
        type: DataTypes.STRING,

    },
    country: {
        type: DataTypes.STRING,
        defaultValue: "India"
    }

}, {
    timestamps: true
});