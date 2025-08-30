import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import servicesRouter from "./routes/services.js";
import inquiriesRouter from "./routes/inquiries.js";
import adminRouter from "./routes/admin.js";
// ✅ remove require, use ESM style
// import authRoutes from "./routes/auth.js"; // only if you actually created routes/auth.js

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/services", servicesRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/auth", authRoutes);  // only if needed

// Static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 10000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error("MongoDB error:", err));
