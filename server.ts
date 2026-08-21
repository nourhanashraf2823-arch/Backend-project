import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";

import bookingRoutes from "./routes/booking.router";
import classSessionRoutes from "./routes/classSession.router";
import searchRoutes from "./routes/search.router";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/bookings", bookingRoutes);
app.use("/class-sessions", classSessionRoutes);
app.use("/search", searchRoutes);

connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});