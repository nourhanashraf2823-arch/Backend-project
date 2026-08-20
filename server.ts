import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {connectdb} from "./config/db"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger"
const app = express();
const PORT =process.env.PORT||3000;

app.use(express.json());
app.use ('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

connectdb();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});