export default function AnswerCard({
  answer,
}) {
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="mb-3 leading-relaxed">
        {answer.answerText}
      </p>

      <small className="block text-gray-600">
        By:{" "}
        {answer.userId?.name ||
          "Anonymous"}
      </small>

      <small className="block text-gray-500">
        {new Date(
          answer.createdAt
        ).toLocaleDateString()}
      </small>
    </div>
  );
}