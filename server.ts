import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db";

import authRoutes from "./routes/auth.router"; 
import bookingRoutes from "./routes/booking.router";
import classSessionRoutes from "./routes/classSession.router";
import searchRoutes from "./routes/search.router";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/sessions", classSessionRoutes); 
app.use("/api/search", searchRoutes);

const PORT = process.env.PORT || 3000;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB:", error);
  }
};

startServer();