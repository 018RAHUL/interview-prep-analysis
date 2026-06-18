import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] =
    useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await loginUser(form);

      login(res.data.token);

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-slate-100
        dark:bg-slate-950
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-gray-200
          dark:border-slate-700
          bg-white
          dark:bg-slate-900
          shadow-xl
        "
      >
        {/* Header */}
        <div
          className="
            bg-gradient-to-r
            from-violet-600
            to-indigo-700
            p-8
            text-center
            text-white
          "
        >
          <h1 className="text-4xl font-bold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-violet-100">
            Continue your interview
            preparation journey
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
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
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
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

            {/* Password */}
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
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password:
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

            {/* Submit */}
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
                ? "Logging In..."
                : "Login 🚀"}
            </button>
          </form>

          {/* Footer */}
          <p
            className="
              mt-6
              text-center
              text-gray-600
              dark:text-slate-400
            "
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                font-semibold
                text-violet-600
                hover:text-violet-700
              "
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}