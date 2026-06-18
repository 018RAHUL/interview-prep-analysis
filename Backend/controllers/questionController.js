import Question from "../models/Question.js";
import { validateQuestion } from "../utils/validateQuestion.js";
import xss from "xss";
// Get all questions (with filters)
export const getQuestions = async (req, res, next) => {
  try {
    const {
      category,
      difficulty,
      search,
      page = 1,
    } = req.query;

    let filter = {};

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Search by title (case-insensitive)
    if (search) {
      filter.title = {
        $regex: new RegExp(search, "i"),
      };
    }

    // Pagination
    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip =
      (pageNumber - 1) * limit;

    const questions =
      await Question.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit);

    const total =
      await Question.countDocuments(
        filter
      );

    res.status(200).json({
      success: true,
      message:
        "Questions fetched successfully",
      data: questions,
      meta: {
        total,
        page: pageNumber,
        pages: Math.ceil(
          total / limit
        ),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get all unique categories
export const getCategories = async (
  req,
  res,
  next
) => {
  try {
    const categories =
      await Question.distinct(
        "category"
      );

    categories.sort();

    res.status(200).json({
      success: true,
      message:
        "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

// Get single question by ID
export const getQuestionById = async (
  req,
  res,
  next
) => {
  try {
    const question =
      await Question.findById(
        req.params.id
      );

    if (!question) {
      res.status(404);
      throw new Error(
        "Question not found"
      );
    }

    res.status(200).json({
      success: true,
      message:
        "Question fetched successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// Create new question
export const createQuestion = async (
  req,
  res,
  next
) => {
  try {
    let {
      title,
      description,
      category,
      difficulty,
    } = req.body;

    if (
      !title ||
      !description ||
      !category
    ) {
      res.status(400);
      throw new Error(
        "Title, description and category are required"
      );
    }

    //Security

    title = xss(title);
    description = xss(description);
    category = xss(category);

    if (title.length > 200) {
      return res.status(400).json({
        success: false,
        message:
          "Title too long.",
      });
    }

    if (description.length > 2000) {
      return res.status(400).json({
        success: false,
        message:
          "Description too long.",
      });
    }

    const validation =
      await validateQuestion(
        title,
        description,
        category,
        difficulty
      );

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message:
          validation.reason,
      });
    }

    const existingQuestion =
    await Question.findOne({
      title: {
        $regex: new RegExp(
          `^${title}$`,
          "i"
        ),
      },
    });

  if (existingQuestion) {
    return res.status(400).json({
      success: false,
      message:
        "Question already exists",
    });
  }

    const question =
      await Question.create({
        title,
        description,
        category,
        difficulty,
        createdBy:
          req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Question created successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};

// Delete question
export const deleteQuestion = async (
  req,
  res,
  next
) => {
  try {
    const question =
      await Question.findById(
        req.params.id
      );

    if (!question) {
      res.status(404);
      throw new Error(
        "Question not found"
      );
    }

    if (
      question.createdBy &&
      question.createdBy.toString() !==
        req.user.id
    ) {
      res.status(403);
      throw new Error(
        "Not authorized to delete this question"
      );
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};