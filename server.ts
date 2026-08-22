import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";

import bookingRoutes from "./routes/booking.router";
import classSessionRoutes from "./routes/classSession.router";
import searchRoutes from "./routes/search.router";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/bookings", bookingRoutes);
app.use("/class-sessions", classSessionRoutes);
app.use("/search", searchRoutes);
import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});