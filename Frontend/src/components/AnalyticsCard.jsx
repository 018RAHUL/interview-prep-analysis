export default function AnalyticsCard({
  title,
  value,
}) {
  return (
    <div className="min-w-[200px] rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
      <h3 className="font-medium text-gray-600">
        {title}
      </h3>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}