import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import { analyzeAnswer } from "../utils/analyzeAnswer.js";
import xss from "xss";

// Submit Answer
// controllers/answerController.js

export const submitAnswer = async (req, res, next) => {
  try {
    let {
      questionId,
      answerText,
    } = req.body;

    answerText = xss(answerText);

    if (answerText.length > 5000) {
      return res.status(400).json({
        success: false,
        message:
          "Answer exceeds maximum length.",
      });
    }

    const question =
      await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const analysis =
      await analyzeAnswer(
        question.title,
        answerText
      );

      console.log("ANALYSIS:");
      console.log(analysis);

    const answer =
      await Answer.create({
        questionId: question._id,
        userId: req.user._id,
        answerText,
        score: analysis.score,
        feedback: analysis.feedback,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        missingKeywords: analysis.missingKeywords,
      });

      console.log("SAVED ANSWER:");
      console.log(answer);

    res.status(201).json({
      success: true,
      message:
        "Answer submitted successfully",
      data: answer,
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
      const wordCount =
        answer.answerText
          ?.trim()
          .split(/\s+/).length || 0;

      totalWords += wordCount;
    });

    const averageWords =
      totalAnswers > 0
        ? Math.round(totalWords / totalAnswers)
        : 0;

    const answeredQuestions =
    await Question.find({
      _id: {
        $in: answers.map(
          (a) => a.questionId
        ),
      },
    });

  const easySolved =
    answeredQuestions.filter(
      (q) =>
        q.difficulty === "easy"
    ).length;

  const mediumSolved =
    answeredQuestions.filter(
      (q) =>
        q.difficulty === "medium"
    ).length;

  const hardSolved =
    answeredQuestions.filter(
      (q) =>
        q.difficulty === "hard"
    ).length;

    const totalEasy = 
    await Question.countDocuments({
      difficulty: "easy",
    });

    const totalMedium = 
    await Question.countDocuments({
      difficulty: "medium",
    });
    const totalHard = 
    await Question.countDocuments({
      difficulty: "hard",
    });

    res.status(200).json({
      success: true,
      message:
        "Analytics fetched successfully",
      data: {
        totalAnswers,
        averageWords,
        totalQuestionsAttempted:
          answeredQuestions.length,

        easySolved,
        mediumSolved,
        hardSolved,

        totalEasy,
        totalMedium,
        totalHard,
      },
    });
  } catch (error) {
    next(error);
  }
};