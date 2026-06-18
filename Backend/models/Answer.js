import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    answerText: {
      type: String,
      required: [true, "Answer cannot be empty"],
      trim: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    feedback: {
      type: [String], // array of feedback messages
      default: [],
    },

    strengths: [
      {
        type: String,
      },
    ],

    weaknesses: [
      {
        type: String,
      },
    ],

    missingKeywords:[
      {
        type: String,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

export default Answer;