import { sequelize } from "../config/index.js";
import { DataTypes } from "sequelize";

export const userModel = sequelize.define(
    "user", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        role: {
            type: DataTypes.ENUM("ADMIN", "CUSTOMER"),
            defaultValue: "CUSTOMER",
        },

        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        profilePictureUrl: {
            type: DataTypes.VIRTUAL,
            get() {
                const file = this.getDataValue("profilePicture");

                if (!file) return null;

                return `${process.env.USER_PROFILE_PATH}${file}`;
            },
        }
    }, {
        timestamps: true, // createdAt + updatedAt automatically
    }
);