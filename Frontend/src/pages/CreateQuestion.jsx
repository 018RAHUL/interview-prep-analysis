import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createQuestion } from "../api/questions";

export default function CreateQuestion() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "easy",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createQuestion(form);
      toast.success(
        "Question created successfully"
      );
      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to create question"
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-3xl font-bold">
        Create Question
      </h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        />

        <textarea
          rows="6"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        />

        <select
          value={form.difficulty}
          onChange={(e) =>
            setForm({
              ...form,
              difficulty: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="easy">
            Easy
          </option>
          <option value="medium">
            Medium
          </option>
          <option value="hard">
            Hard
          </option>
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Create Question
        </button>
      </form>
    </div>
  );
}