import { useNavigate } from "react-router-dom";

export default function QuestionCard({
  question,
}) {
  const navigate = useNavigate();

  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-xl font-bold">
        {question.title}
      </h2>

      <p className="mb-4 text-gray-600">
        {question.description}
      </p>

      <div className="mb-4 flex gap-3">
        <span className="rounded-md bg-blue-100 px-3 py-1 text-sm">
          📚 {question.category}
        </span>

        <span className="rounded-md bg-green-100 px-3 py-1 text-sm">
          ⚡ {question.difficulty}
        </span>
      </div>

      <small className="mb-4 block text-gray-500">
        Created:{" "}
        {new Date(
          question.createdAt
        ).toLocaleDateString()}
      </small>

      <button
        onClick={() =>
          navigate(
            `/questions/${question._id}`
          )
        }
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
}