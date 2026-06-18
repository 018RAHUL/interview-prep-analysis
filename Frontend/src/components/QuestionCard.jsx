import { useNavigate } from "react-router-dom";

export default function QuestionCard({
  question,
}) {
  const navigate = useNavigate();

  return (
    <div
      className="
        mb-5
        rounded-2xl
        border
        border-gray-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-6
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Title */}
      <h2
        className="
          mb-3
          text-2xl
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {question.title}
      </h2>

      {/* Description */}
      <p
        className="
          mb-5
          text-gray-600
          dark:text-slate-400
          leading-relaxed
        "
      >
        {question.description}
      </p>

      {/* Category & Difficulty */}
      <div className="mb-5 flex flex-wrap gap-3">
        <span
          className="
            rounded-full
            bg-violet-100
            px-4
            py-1
            text-sm
            font-medium
            text-violet-700
            dark:bg-violet-900/40
            dark:text-violet-300
          "
        >
          📚 {question.category}
        </span>

        <span
          className="
            rounded-full
            bg-emerald-100
            px-4
            py-1
            text-sm
            font-medium
            text-emerald-700
            dark:bg-emerald-900/40
            dark:text-emerald-300
          "
        >
          ⚡ {question.difficulty}
        </span>
      </div>

      {/* Date */}
      <small
        className="
          mb-5
          block
          text-gray-500
          dark:text-slate-500
        "
      >
        Created on{" "}
        {new Date(
          question.createdAt
        ).toLocaleDateString()}
      </small>

      {/* Button */}
      <button
        onClick={() =>
          navigate(
            `/questions/${question._id}`
          )
        }
        className="
          rounded-xl
          bg-violet-600
          px-5
          py-3
          font-medium
          text-white
          shadow-md
          transition-all
          duration-300
          hover:bg-violet-700
          hover:shadow-lg
        "
      >
        View Details →
      </button>
    </div>
  );
}