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

  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Hero Section */}
      <div
        className="
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          to-indigo-700
          p-8
          text-white
          shadow-xl
        "
      >
        <h1 className="text-4xl font-bold">
          Create Interview Question 🚀
        </h1>

        <p className="mt-3 text-violet-100">
          Add a new interview question
          and expand your preparation
          database.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="
          rounded-2xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          p-8
          shadow-md
        "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Title */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
                dark:text-slate-300
              "
            >
              Question Title
            </label>

            <input
              type="text"
              placeholder="Enter question title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-4
                text-slate-900
                dark:text-white
                outline-none
                transition
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/30
              "
            />
          </div>

          {/* Description */}
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
                dark:text-slate-300
              "
            >
              Description
            </label>

            <textarea
              rows="8"
              placeholder="Describe the interview question..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                dark:border-slate-700
                bg-white
                dark:bg-slate-800
                p-4
                text-slate-900
                dark:text-white
                outline-none
                transition
                focus:border-violet-500
                focus:ring-2
                focus:ring-violet-500/30
              "
            />
          </div>

          {/* Category + Difficulty */}
          <div
            className="
              grid
              gap-6
              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-slate-300
                "
              >
                Category
              </label>

              <input
                type="text"
                placeholder="DSA, DBMS, OS..."
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  p-4
                  text-slate-900
                  dark:text-white
                  outline-none
                  transition
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/30
                "
              />
            </div>

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                  dark:text-slate-300
                "
              >
                Difficulty
              </label>

              <select
                value={form.difficulty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    difficulty:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-800
                  p-4
                  text-slate-900
                  dark:text-white
                  outline-none
                  transition
                  focus:border-violet-500
                  focus:ring-2
                  focus:ring-violet-500/30
                "
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
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              rounded-xl
              bg-violet-600
              px-6
              py-4
              font-semibold
              text-white
              shadow-md
              transition
              hover:bg-violet-700
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {submitting
              ? "Creating Question..."
              : "Create Question 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}