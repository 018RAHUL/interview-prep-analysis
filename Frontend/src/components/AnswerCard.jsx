export default function AnswerCard({
  answer,
}) {
  const score =
    answer.score ?? "N/A";

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-6
        shadow-sm
        transition
        hover:shadow-lg
      "
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">

        <div>
          <h3
            className="
              font-semibold
              text-slate-800
              dark:text-white
            "
          >
            {answer.userId?.name ||
              "Anonymous"}
          </h3>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            {new Date(
              answer.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        <div
          className="
            rounded-full
            bg-blue-100
            px-4
            py-1
            text-sm
            font-semibold
            text-blue-700
          "
        >
          Score: {score}
        </div>
      </div>

      {/* Answer */}
      <div
        className="
          rounded-xl
          bg-slate-50
          dark:bg-slate-800
          p-4
        "
      >
        <p
          className="
            whitespace-pre-wrap
            leading-relaxed
            text-slate-700
            dark:text-slate-200
          "
        >
          {answer.answerText}
        </p>
      </div>

      {/* Feedback */}
      {answer.feedback && (
        <div
          className="
            mt-4
            rounded-xl
            border-l-4
            border-green-500
            bg-green-50
            dark:bg-green-900/20
            p-4
          "
        >
          <h4
            className="
              mb-2
              font-semibold
              text-green-700
              dark:text-green-400
            "
          >
            Feedback
          </h4>

          <p
            className="
              text-sm
              text-green-700
              dark:text-green-300
            "
          >
            {answer.feedback}
          </p>
        </div>
      )}
    </div>
  );
}