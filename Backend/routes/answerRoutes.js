import express from "express";
import {
  submitAnswer,
  getUserAnswers,
  getAnswersByQuestion,
  deleteAnswer,
  getAnalytics,
} from "../controllers/answerController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, submitAnswer);
router.get("/user", protect, getUserAnswers);
router.get("/question/:questionId", getAnswersByQuestion);
router.delete("/:id", protect, deleteAnswer);
router.get("/analytics",  protect,  getAnalytics);
export default router;