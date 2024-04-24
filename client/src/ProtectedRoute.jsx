//rutas protegidas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx"

function ProtectedRoute() {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Outlet />
  );
}

export default ProtectedRoute;

