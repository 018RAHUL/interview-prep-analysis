export default function AnalysisModal({
  isOpen,
  onClose,
  analysis,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          max-h-[85vh]
          overflow-y-auto
          rounded-3xl
          border
          border-slate-700
          bg-slate-900
          p-8
          shadow-2xl
          scrollbar-thin
          scrollbar-thumb-violet-600
          scrollbar-track-slate-800
        "
      >
        <div className="mb-8 flex items-center justify-between">
          <h2
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            🤖 AI Answer Analysis
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              px-3
              py-1
              text-slate-400
              hover:bg-slate-800
            "
          >
            ✕
          </button>
        </div>

        {/* Score */}
        <div
          className="
            mb-8
            rounded-2xl
            border
            border-slate-700
            bg-slate-950
            p-6
          "
        >
          <p className="mb-2 text-slate-400">
            Score
          </p>

          <h3
            className={`text-5xl font-black ${
              analysis?.score >= 80
                ? "text-green-400"
                : analysis?.score >= 60
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {analysis?.score}/100
          </h3>       

          <div
            className="
              mt-4
              h-3
              overflow-hidden
              rounded-full
              bg-slate-800
            "
          >
            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                to-violet-500
              "
              style={{
                width: `${analysis?.score || 0}%`,
              }}
            />
          </div>
        </div>

        {/* Feedback */}
        {/* Strengths */}
        <div
          className="
            mb-6
            rounded-2xl
            border
            border-green-700/40
            bg-slate-950
            p-6
          "
        >
          <h3
            className="
              mb-3
              text-xl
              font-semibold
              text-green-400
            "
          >
            ✅ Strengths
          </h3>

          {analysis?.strengths?.length > 0 ? (
            <ul className="space-y-2 text-slate-300">
              {analysis.strengths.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">
              No strengths identified.
            </p>
          )}
        </div>

        <div
          className="
            mb-6
            rounded-2xl
            border
            border-yellow-700/40
            bg-slate-950
            p-6
          "
        >
          <h3
            className="
              mb-3
              text-xl
              font-semibold
              text-yellow-400
            "
          >
            📌 Missing Keywords
          </h3>

  <ul className="space-y-2 text-slate-300">
    {analysis?.missingKeywords?.map(
      (item, index) => (
        <li key={index}>
          • {item}
        </li>
      )
    )}
  </ul>
</div>

        {/* Areas for Improvement */}
        <div
          className="
            mb-6
            rounded-2xl
            border
            border-red-700/40
            bg-slate-950
            p-6
          "
        >
          <h3
            className="
              mb-3
              text-xl
              font-semibold
              text-red-400
            "
          >
            ❌ Areas for Improvement
          </h3>

          {analysis?.weaknesses?.length > 0 ? (
            <ul className="space-y-2 text-slate-300">
              {analysis.weaknesses.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400">
              No weaknesses identified.
            </p>
          )}
        </div>

        {/* Overall Feedback */}
        <div
          className="
            rounded-2xl
            border
            border-slate-700
            bg-slate-950
            p-6
          "
        >
          <h3
            className="
              mb-3
              text-xl
              font-semibold
              text-white
            "
          >
            💬 Overall Feedback
          </h3>

          <p
            className="
              leading-relaxed
              text-slate-300
            "
          >
            {analysis?.feedback}
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            mt-8
            w-full
            rounded-2xl
            bg-violet-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-violet-700
          "
        >
          Close Analysis
        </button>
      </div>
    </div>
  );
}