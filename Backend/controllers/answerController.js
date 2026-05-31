import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import { analyzeAnswer } from "../utils/analyzeAnswer.js";


// Submit Answer
export const submitAnswer = async (req, res, next) => {
  try {
    const { questionId, answerText } = req.body;

    // Validation
    if (!questionId || !answerText) {
      res.status(400);
      throw new Error("Question ID and Answer are required");
    }

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404);
      throw new Error("Question not found");
    }

    // Analyze answer (your USP)
    const result = analyzeAnswer(answerText);

    // Create answer
    const answer = await Answer.create({
      userId: req.user.id, // from auth middleware
      questionId,
      answerText,
      score: result.score,
      feedback: result.feedback,
    });

    // Populate before sending
    const populatedAnswer = await Answer.findById(answer._id)
      .populate("userId", "name") //Show name instead of userId in answer/response
      .populate("questionId", "title category");    //Show title and category instead of questionId in answer/response

    res.status(201).json({
      success: true,
      message: "Answer submitted successfully",
      data: populatedAnswer
    });
  } catch (error) {
    next(error);
  }
};



// Get all answers of logged-in user
export const getUserAnswers = async (req, res, next) => {
  try {
    const { page } = req.query;

    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const answers = await Answer.find({
      userId: req.user.id,
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Answer.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: `Answers of ${req.user.name} fetched successfully`,
      meta: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limit),
      },
      data: answers,
    });
  } catch (error) {
    next(error);
  }
};



// Get answers for a specific question
export const getAnswersByQuestion = async (req, res, next) => {
  try {
    const { page } = req.query;

    const pageNumber = Number(page) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;

    const answers = await Answer.find({
      questionId: req.params.questionId,
    })
      .populate("userId", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Answer.countDocuments({
      questionId: req.params.questionId,
    });

    res.status(200).json({
      success: true,
      message: "Answers fetched successfully",
      meta: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limit),
      },
      data: answers,
    });
  } catch (error) {
    next(error);
  }
};



// 🔹 Delete Answer (optional)
export const deleteAnswer = async (req, res, next) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) {
      res.status(404);
      throw new Error("Answer not found");
    }

    // only owner can delete
    if (answer.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Not authorized to delete this answer");
    }

    await answer.deleteOne();

    res.status(201).json({
      success: true,
       message: "Answer deleted successfully" 
      });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const answers = await Answer.find({
      userId: req.user.id,
    });

    const totalAnswers = answers.length;

    let totalWords = 0;

    answers.forEach((answer) => {
      totalWords += answer.wordCount;
    });

    const averageWords =
      totalAnswers > 0
        ? Math.round(totalWords / totalAnswers)
        : 0;

    const uniqueQuestions = new Set(
      answers.map((a) => a.questionId.toString())
    );

    res.status(200).json({
      success: true,
      message: "Analytics fetched successfully",
      data: {
        totalAnswers,
        averageWords,
        totalQuestionsAttempted:
          uniqueQuestions.size,
      },
    });
  } catch (error) {
    next(error);
  }
};