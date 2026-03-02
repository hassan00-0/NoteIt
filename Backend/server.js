// imports
import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";
// used to be able to get hold of .env vars
dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
}

app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", noteRoutes);

const _dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(_dirname, "..", "Frontend", "dist");

  app.use(express.static(frontendPath));

  app.get("*path", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
// connect to the database
connectDB();

// open the port
app.listen(5000, () => {
  console.log("listening on port 5000");
});
