import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import AnswerCard from "../components/AnswerCard";
import Loader from "../components/Loader";

import { getQuestionById } from "../api/questions";

import {
  getAnswersByQuestion,
  submitAnswer,
} from "../api/answers";

export default function QuestionDetails() {
  const { id } = useParams();

  const [question, setQuestion] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [answerText, setAnswerText] = useState("");

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

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

      await submitAnswer({
        questionId: id,
        answerText,
      });

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
      {/* Question Section */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-4 text-3xl font-bold">
          {question?.title}
        </h1>

        <p className="mb-6 text-gray-700">
          {question?.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {question?.category && (
            <span className="rounded-md bg-blue-100 px-3 py-1 text-sm">
              📚 {question.category}
            </span>
          )}

          {question?.difficulty && (
            <span className="rounded-md bg-green-100 px-3 py-1 text-sm">
              ⚡ {question.difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Answer Form */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-2xl font-semibold">
          Submit Your Answer
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <textarea
            rows="6"
            placeholder="Write your answer here..."
            value={answerText}
            onChange={(e) =>
              setAnswerText(
                e.target.value
              )
            }
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              p-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />

          <button
            type="submit"
            disabled={submitting}
            className="
              rounded-lg
              bg-blue-600
              px-5
              py-3
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {submitting
              ? "Submitting..."
              : "Submit Answer"}
          </button>
        </form>
      </div>

      {/* Answers Section */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">
          Answers ({answers.length})
        </h2>

        {answers.length === 0 ? (
          <div
            className="
              rounded-xl
              border
              border-dashed
              border-gray-400
              bg-white
              p-8
              text-center
            "
          >
            No answers submitted yet.
          </div>
        ) : (
          answers.map((answer) => (
            <AnswerCard
              key={answer._id}
              answer={answer}
            />
          ))
        )}
      </div>
    </div>
  );
}