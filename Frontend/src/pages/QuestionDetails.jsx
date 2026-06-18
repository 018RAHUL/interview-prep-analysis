import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import AnswerCard from "../components/AnswerCard";
import Loader from "../components/Loader";

import AnalysisModal from "../components/AnalysisModal";

import { getQuestionById } from "../api/questions";

import {
  getAnswersByQuestion,
  submitAnswer,
} from "../api/answers";

export default function QuestionDetails() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [showAnalysis, setShowAnalysis] =
  useState(false);

  const [analysisData, setAnalysisData] =
  useState(null);

  const [answerText, setAnswerText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const questionRes =
        await getQuestionById(id);

      const answerRes =
        await getAnswersByQuestion(id);

      setQuestion(
        questionRes.data.data
      );

      setAnswers(
        answerRes.data.data
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load question"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!answerText.trim()) {
      toast.error(
        "Answer cannot be empty"
      );
      return;
    }

    try {
      setSubmitting(true);

      const res = await submitAnswer({
        questionId: id,
        answerText,
      });

      console.log("SUBMIT RESPONSE:");
      -console.log(res.data);

      setAnalysisData({
        score: res.data.data.score,
        feedback: res.data.data.feedback,
        strengths: res.data.data.strengths,
        missingKeywords: res.data.data.missingKeywords,
        weaknesses: res.data.data.weaknesses,
      });

      setShowAnalysis(true);

      toast.success(
        "Answer submitted successfully"
      );

      setAnswerText("");

      await fetchData();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit answer"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-700
          p-8
          text-white
          shadow-xl
        "
      >
        <h1 className="text-4xl font-bold">
          {question?.title}
        </h1>

        <p className="mt-4 text-violet-100 leading-relaxed">
          {question?.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {question?.category && (
            <span
              className="
                rounded-full
                bg-white/20
                px-4
                py-1
                text-sm
                font-medium
              "
            >
              📚 {question.category}
            </span>
          )}

          {question?.difficulty && (
            <span
              className="
                rounded-full
                bg-white/20
                px-4
                py-1
                text-sm
                font-medium
              "
            >
              ⚡ {question.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Submit Answer */}
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-6
          shadow-md
        "
      >
        <h2
          className="
            mb-5
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Submit Your Answer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <textarea
            rows="8"
            placeholder="Write your answer here..."
            value={answerText}
            onChange={(e) =>
              setAnswerText(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-4
              text-slate-900
              dark:text-white
              outline-none
              transition
              focus:border-violet-500
              focus:ring-2
              focus:ring-violet-500/30
            "
          />

          <button
            type="submit"
            disabled={submitting}
            className="
              rounded-xl
              bg-violet-600
              px-6
              py-3
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-violet-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {submitting
              ? "Submitting..."
              : "Submit Answer 🚀"}
          </button>
        </form>
      </div>

      {/* Answers Section */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="
              text-3xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Answers
          </h2>

          <span
            className="
              rounded-full
              bg-violet-100
              px-4
              py-2
              text-sm
              font-semibold
              text-violet-700
              dark:bg-violet-900/30
              dark:text-violet-300
            "
          >
            {answers.length} Response
            {answers.length !== 1
              ? "s"
              : ""}
          </span>
        </div>

        {answers.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-12
              text-center
              shadow-sm
            "
          >
            <h3
              className="
                text-xl
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              No Answers Yet
            </h3>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-slate-400
              "
            >
              Be the first person to
              answer this question.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {answers.map(
              (answer) => (
                <AnswerCard
                  key={
                    answer._id
                  }
                  answer={
                    answer
                  }
                />
              )
            )}
          </div>
        )}
      </div>
      <AnalysisModal
        isOpen={showAnalysis}
        onClose={() =>
          setShowAnalysis(false)
        }
        analysis={analysisData}
      />
    </div>
  );
}