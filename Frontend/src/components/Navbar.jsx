import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } =
    useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-slate-800 px-6 py-4 text-white">
      <h2 className="text-xl font-bold">
        <Link
          to={
            isAuthenticated
              ? "/dashboard"
              : "/"
          }
        >
          Interview Prep 🚀
        </Link>
      </h2>

      <div className="flex items-center gap-5">
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="hover:text-blue-300"
            >
              Dashboard
            </Link>

            <Link
              to="/create-question"
              className="hover:text-blue-300"
            >
              Create Question
            </Link>

            <Link
              to="/profile"
              className="hover:text-blue-300"
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="hover:text-blue-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}