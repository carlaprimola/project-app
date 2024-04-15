//rutas protegidas
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx"


function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuth();


//si el usuario no esta autenticado, le redirigimos siempre a /login
if(loading) return <p>Loading...</p>
  if(!loading && !isAuthenticated) return <Navigate to="/login" replace/>;
  //replace es para que no regrese a la ruta anterior
    return (
    <Outlet/>
  )
}

export default ProtectedRoute
