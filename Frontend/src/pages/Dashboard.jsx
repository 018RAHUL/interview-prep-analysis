import { useEffect, useState } from "react";

import QuestionCard from "../components/QuestionCard";
import AnalyticsCard from "../components/AnalyticsCard";

import { getQuestions } from "../api/questions";
import { getAnalytics } from "../api/answers";

export default function Dashboard() {
  const [questions, setQuestions] = useState([]);

  const [analytics, setAnalytics] = useState({
    totalAnswers: 0,
    averageWords: 0,
    totalQuestionsAttempted: 0,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchDashboardData();
  }, [page, search]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const questionsRes = await getQuestions(
        page,
        search
      );

      const analyticsRes =
        await getAnalytics();

      setQuestions(
        questionsRes.data.data
      );

      setAnalytics(
        analyticsRes.data.data
      );

      if (questionsRes.data.meta) {
        setTotalPages(
          questionsRes.data.meta.pages
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-2xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <h2 className="text-xl font-semibold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Track your interview preparation
          progress.
        </p>
      </div>

      {/* Analytics */}
      <div className="flex flex-wrap gap-5">
        <AnalyticsCard
          title="Total Answers"
          value={analytics.totalAnswers}
        />

        <AnalyticsCard
          title="Average Words"
          value={analytics.averageWords}
        />

        <AnalyticsCard
          title="Questions Attempted"
          value={
            analytics.totalQuestionsAttempted
          }
        />
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            rounded-xl
            border
            border-gray-300
            bg-white
            p-3
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        />
      </div>

      {/* Questions */}
      <div>
        {questions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-400 p-8 text-center">
            <h3 className="text-lg font-medium">
              No questions found
            </h3>
          </div>
        ) : (
          questions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
          className="
            rounded-lg
            border
            px-4
            py-2
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span className="font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage((prev) => prev + 1)
          }
          className="
            rounded-lg
            border
            px-4
            py-2
            transition
            hover:bg-gray-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}