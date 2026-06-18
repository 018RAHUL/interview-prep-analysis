export default function AnalyticsCard({
  title,
  value,
}) {
  const getIcon = () => {
    switch (title) {
      case "Total Answers":
        return "📝";

      case "Average Words":
        return "📊";

      case "Questions Attempted":
        return "🎯";

      default:
        return "📈";
    }
  };

  return (
    <div
      className="
        min-w-[200px]
        rounded-2xl
        border
        border-gray-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-5
        text-center
        shadow
        transition
        hover:-translate-y-1
      "
    >
      <h3 className="font-medium text-gray-600 dark:text-slate-400">
        {title}
      </h3>

      <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
        {value}
      </h2>
    </div>
  );
}