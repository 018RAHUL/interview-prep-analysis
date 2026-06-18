import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";
import { logger } from "./middleware/logger.js"
//Security
import helmet from "helmet";
import { sanitizeInput } from "./middleware/sanitize.js";

import { apiLimiter } from "./middleware/rateLimit.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect DB
connectDB();

// Middleware Parser
app.use(helmet());
app.use(sanitizeInput);
app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL,
    credentials: true,
  })
);

//Middleware
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `${req.method} ${req.url} ${res.statusCode}`
    );
  });
  next();
});
app.use("/api", apiLimiter);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/answers", answerRoutes);

// Error middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});