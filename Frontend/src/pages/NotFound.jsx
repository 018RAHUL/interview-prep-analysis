import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-7xl font-bold">
        404
      </h1>

      <p className="my-4 text-xl">
        Page Not Found
      </p>

      <Link
        to="/dashboard"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Go To Dashboard
      </Link>
    </div>
  );
}