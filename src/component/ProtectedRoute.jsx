import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/authContext";

const ProtectedRoute = () => {
  const { user } = useAuth();
  console.log("ProtectedRoute user:", user);
  // const isAuthenticated = user || localStorage.getItem("isAuthenticated");
  const isAuthenticated = !!user; // Hanya cek state

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
