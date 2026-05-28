import env from "dotenv"
env.config()
import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres", // Define which database are using.
    protocol: "postgres", // Defines the connection protocol.
    logging: false,  //  Disables SQL query logs in the console.
    dialectOptions: { // Extra configuration options for the database connection.
        ssl: {   // Enables SSL (Secure Socket Layer).  SSL encrypts the database connection for security.
            require: true,
            rejectUnauthorized: false, // Accepts SSL certificates even if they are not fully verified.
        },
    },
});