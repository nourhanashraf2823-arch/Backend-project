import express from "express";
import {connectdb} from "./config/db"
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger"
const app = express();
 app.use ('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))
dotenv.config();
const PORT =process.env.PORT||3000;

app.use(express.json());
connectdb();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});