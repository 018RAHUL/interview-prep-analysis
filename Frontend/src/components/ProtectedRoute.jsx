import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // ❌ not logged in
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in
  return children;
}