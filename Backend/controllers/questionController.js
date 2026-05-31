import Question from "../models/Question.js";


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
      filter.title = { $regex: new RegExp(search, "i") };
    }

    // Pagination logic
    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const questions = await Question.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

   const total = await Question.countDocuments(filter);

  res.status(200).json({
    success: true,
    message: "Question fetched successfully",
    data: questions,
    meta:{
      total,
      page: pageNumber,
      pages: Math.ceil(total / limit)
    },
  });
  } catch (error) {
    next(error);
  }
};



// Get single question by ID
export const getQuestionById = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      res.status(404);
      throw new Error("Question not found");
    }

    res.status(200).json({
      success: true,
      message: "Question of given id fetched successfully",
      data: question
    });
  } catch (error) {
    next(error);
  }
};



// Create new question
export const createQuestion = async (req, res, next) => {
  try {
    const { title, description, category, difficulty } = req.body;

    // Validation
    if (!title || !description || !category) {
      res.status(400);
      throw new Error("Title, description and category are required");
    }

    const question = await Question.create({
      title,
      description,
      category,
      difficulty,
      createdBy: req.user.id, // from auth middleware
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
};



// Delete question
export const deleteQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      res.status(404);
      throw new Error("Question not found");
    }

    // Only creator can delete
    if (question.createdBy && question.createdBy.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized to delete this question");
    }

    await question.deleteOne();

    res.status(201).json({ 
      success: true,
      message: "Question deleted successfully" 
    });
  } catch (error) {
    next(error);
  }
};