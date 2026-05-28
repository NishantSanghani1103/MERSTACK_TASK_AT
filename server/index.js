import env from "dotenv"
import { app } from "./src/app.js";
import { connectDb } from "./src/config/index.js";
import * as db from "./src/models/index.js";
import * as relation from "./src/models/association.js";
env.config()
connectDb()