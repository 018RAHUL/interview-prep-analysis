import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  getCategories,
  deleteQuestion,
} from "../controllers/questionController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


// Get all questions (with filters)
router.get("/", getQuestions);

router.get("/categories",getCategories);

// Get single question by ID
router.get("/:id", getQuestionById);


// Create new question (protected)
router.post("/", protect, createQuestion);


// Delete question (protected)
router.delete("/:id", protect, deleteQuestion);


export default router;