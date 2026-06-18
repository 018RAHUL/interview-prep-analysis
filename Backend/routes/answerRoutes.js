import express from "express";
import {
  submitAnswer,
  getUserAnswers,
  getAnswersByQuestion,
  deleteAnswer,
  getAnalytics,
} from "../controllers/answerController.js";

import { aiLimiter } from "../middleware/rateLimit.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// AI Analysis Route (Rate Limited)
router.post(
  "/",
  protect,
  aiLimiter,
  submitAnswer
);

// User Answers
router.get(
  "/user",
  protect,
  getUserAnswers
);

// Answers for a Question
router.get(
  "/question/:questionId",
  getAnswersByQuestion
);

// Analytics
router.get(
  "/analytics",
  protect,
  getAnalytics
);

// Delete Answer
router.delete(
  "/:id",
  protect,
  deleteAnswer
);

export default router;