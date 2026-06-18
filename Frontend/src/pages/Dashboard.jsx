import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import QuestionCard from "../components/QuestionCard";

import { getQuestions, getCategories } from "../api/questions";
import { getAnalytics } from "../api/answers";

export default function Dashboard() {
  const [questions, setQuestions] =
    useState([]);

  const [analytics, setAnalytics] =
    useState({
      totalAnswers: 0,
      averageWords: 0,
      totalQuestionsAttempted: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      totalEasy: 0,
      totalMedium: 0,
      totalHard: 0,
    });

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [searchInput, setSearchInput] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {
    fetchDashboardData();
  }, [page, search, category]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(
        res.data.data
      );
    } catch (error) {
      console.error(
        "Failed to fetch categories:",
        error
      );
    }
  };

  const fetchDashboardData =
    async () => {
      try {
        setLoading(true);

        const questionsRes =
          await getQuestions(
            page,
            search,
            category
          );

        const analyticsRes =
          await getAnalytics();

        setQuestions(
          questionsRes.data.data
        );

        setAnalytics(
          analyticsRes.data.data
        );

        if (
          questionsRes.data.meta
        ) {
          setTotalPages(
            questionsRes.data.meta
              .pages
          );
        }
      } catch (err) {
        setError(
          err.response?.data
            ?.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div className="text-center">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Loading Dashboard...
          </h2>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-slate-400
            "
          >
            Fetching your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="
          flex
          min-h-[60vh]
          items-center
          justify-center
        "
      >
        <div
          className="
            rounded-2xl
            border
            border-red-300
            bg-red-50
            dark:border-red-700
            dark:bg-red-900/20
            p-8
            text-center
          "
        >
          <h2
            className="
              text-xl
              font-semibold
              text-red-600
            "
          >
            {error}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-6
      "
    >
      {/* Header */}
      <div>
        <h1
          className="
            text-5xl
            font-bold
            tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          Dashboard
        </h1>

        <p
          className="
            mt-2
            text-lg
            text-gray-600
            dark:text-slate-400
          "
        >
          Track your interview
          preparation progress and
          performance.
        </p>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid items-stretch gap-6 lg:grid-cols-3">

        {/* Questions Attempted */}
        <div
          className="
            lg:col-span-2
            rounded-3xl
            border
            border-gray-200
            dark:border-slate-700
            bg-gradient-to-br
            from-white
            to-slate-50
            dark:from-slate-900
            dark:to-slate-900
            p-8
            shadow-xl
          "
        >
          <div className="flex items-center justify-between">

            {/* Circle */}
            <div
              className="
                flex
                h-56
                w-56
                items-center
                justify-center
                rounded-full
                shadow-[0_0_40px_rgba(139,92,246,0.4)]
              "
              style={{
                background: `
                  conic-gradient(
                    #22c55e 0deg 120deg,
                    #facc15 120deg 240deg,
                    #8b5cf6 240deg 360deg
                  )
                `,
              }}
            >
              <div
                className="
                  flex
                  h-44
                  w-44
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  dark:bg-slate-950
                "
              >
                <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                  {
                    analytics.totalQuestionsAttempted
                  }
                </h2>

                <p className="text-green-400">
                  ✓ Solved
                </p>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="space-y-4">

              <div
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  px-8
                  py-4
                  text-center
                  shadow-sm
                "
              >
                <h4 className="font-bold text-green-400">
                  Easy
                </h4>

                <p className="text-2xl font-bold text-slate-400 dark:text-white">
                  {analytics.easySolved} / {analytics.totalEasy}
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                  px-8
                  py-4
                  text-center
                  shadow-sm
                "
              >
                <h4 className="font-bold text-yellow-400">
                  Medium
                </h4>

                <p className="text-2xl font-bold text-slate-400 dark:text-white">
                  {analytics.mediumSolved}  / {analytics.totalMedium}
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                  px-8
                  py-4
                  text-center
                  shadow-sm
                "
              >
                <h4 className="font-bold text-violet-400">
                  Hard
                </h4>

                <p className="text-2xl font-bold text-slate-400 dark:text-white">
                  {analytics.hardSolved} / {analytics.totalHard}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex h-full flex-col gap-6">

          <div
            className="
              flex
              flex-1
              flex-col
              justify-center
              rounded-3xl
              border
              border-gray-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-6
              shadow-xl
            "
          >
            <h3 className="font-bold text-gray-600 dark:text-slate-400">
              Total Answers
            </h3>

            <h2 className="mt-4 text-5xl font-black text-cyan-400">
              {analytics.totalAnswers}
            </h2>
          </div>

          <div
            className="
              flex
              flex-1
              flex-col
              justify-center
              rounded-3xl
              border
              border-gray-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-6
              shadow-xl
            "
          >
            <h3 className="font-bold text-gray-600 dark:text-slate-400">
              Average Words
            </h3>

            <h2 className="mt-4 text-5xl font-black text-pink-400">
              {Math.round(
                analytics.averageWords || 0
              )}
            </h2>
          </div>

        </div>
      </div>

      {/* Categories */}
      <div
        className="
          flex
          flex-wrap
          gap-3
        "
      >
        <button
          onClick={() => {
            setCategory("");
            setPage(1);
          }}
          className={`
            rounded-xl
            px-4
            py-2
            font-medium
            transition
            ${
              category === ""
                ? "bg-violet-600 text-white"
                : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            }
          `}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setCategory(cat);
              setPage(1);
            }}
            className={`
              rounded-xl
              px-4
              py-2
              font-medium
              transition
              ${
                category === cat
                  ? "bg-violet-600 text-white"
                  : "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div
        className="
          flex
          items-center
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          px-4
          py-3
          shadow-md
        "
      >
        <input
          type="text"
          placeholder="Search interview questions..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(
              e.target.value
            )
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter"
            ) {
              setPage(1);
              setSearch(
                searchInput
              );
            }
          }}
          className="
            flex-1
            bg-transparent
            outline-none
            text-slate-900
            dark:text-white
            placeholder:text-slate-400
          "
        />

        <button
          onClick={() => {
            setPage(1);
            setSearch(
              searchInput
            );
          }}
          className="
            rounded-xl
            p-2
            text-violet-500
            transition
            hover:bg-violet-100
            dark:hover:bg-slate-800
          "
        >
          <Search size={20} />
        </button>
      </div>

      {/* Questions */}
      <div>
        <h2
          className="
            mb-4
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          Interview Questions
        </h2>

        {questions.length ===
        0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-400
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-10
              text-center
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
              No Questions Found
            </h3>

            <p
              className="
                mt-2
                text-gray-500
                dark:text-slate-400
              "
            >
              Create a question to
              get started.
            </p>
          </div>
        ) : (
          questions.map(
            (question) => (
              <QuestionCard
                key={
                  question._id
                }
                question={
                  question
                }
              />
            )
          )
        )}
      </div>

      {/* Pagination */}
      <div
        className="
          flex
          items-center
          justify-center
          gap-4
          pt-4
        "
      >
        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              (prev) =>
                prev - 1
            )
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            px-5
            py-2
            font-medium
            text-slate-900
            dark:text-white
            transition
            hover:bg-slate-100
            dark:hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          ← Previous
        </button>

        <span
          className="
            rounded-xl
            bg-violet-600
            px-5
            py-2
            font-semibold
            text-white
          "
        >
          Page {page} of{" "}
          {totalPages}
        </span>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(
              (prev) =>
                prev + 1
            )
          }
          className="
            rounded-xl
            border
            border-gray-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-900
            px-5
            py-2
            font-medium
            text-slate-900
            dark:text-white
            transition
            hover:bg-slate-100
            dark:hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Next →
        </button>
      </div>
    </div>
  );
}