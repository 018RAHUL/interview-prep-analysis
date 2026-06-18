import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { isAuthenticated, logout } =
    useAuth();

  const navigate = useNavigate();

  const { darkMode, setDarkMode } =
    useTheme();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        border-b
        border-slate-200
        dark:border-slate-800
        bg-white/80
        dark:bg-slate-950/80
        backdrop-blur-md
        shadow-sm
        transition-colors
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
      >
        {/* Logo */}
        <Link
          to={
            isAuthenticated
              ? "/dashboard"
              : "/"
          }
        >
          <span
            className="
              text-3xl
              font-extrabold
              tracking-tight
              bg-gradient-to-r
              from-violet-400
              to-cyan-400
              bg-clip-text
              text-transparent
            "
          >
            Interview Prep And Analysis
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                  transition
                  hover:text-violet-500
                "
              >
                Dashboard
              </Link>

              <Link
                to="/create-question"
                className="
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                  transition
                  hover:text-violet-500
                "
              >
                Create Question
              </Link>

              <Link
                to="/profile"
                className="
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                  transition
                  hover:text-violet-500
                "
              >
                Profile
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="
                  rounded-xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-900
                  p-2
                  shadow-sm
                  transition
                  hover:scale-105
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                {darkMode ? (
                  <Sun
                    size={20}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-slate-700 dark:text-slate-300"
                  />
                )}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="
                  rounded-xl
                  bg-red-500
                  px-4
                  py-2
                  font-medium
                  text-white
                  shadow
                  transition
                  hover:bg-red-600
                  hover:shadow-lg
                "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="
                  font-medium
                  text-slate-700
                  dark:text-slate-300
                  transition
                  hover:text-violet-500
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                className="
                  rounded-xl
                  bg-violet-600
                  px-4
                  py-2
                  font-medium
                  text-white
                  shadow
                  transition
                  hover:bg-violet-700
                  hover:shadow-lg
                "
              >
                Register
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                className="
                  rounded-xl
                  border
                  border-slate-300
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-900
                  p-2
                  shadow-sm
                  transition
                  hover:scale-105
                  hover:bg-slate-100
                  dark:hover:bg-slate-800
                "
              >
                {darkMode ? (
                  <Sun
                    size={20}
                    className="text-yellow-400"
                  />
                ) : (
                  <Moon
                    size={20}
                    className="text-slate-700 dark:text-slate-300"
                  />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}