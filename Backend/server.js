// imports
import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
// used to be able to get hold of .env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

// connect to the database
connectDB();

// open the port
app.listen(5000, () => {
  console.log("listening on port 5000");
});
