import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  //console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 m-3 flex justify-between py-5 px-10">
      {/* Si estoy autenticado me lleva a /tasks y sino, a / */}
      <Link to={
        isAuthenticated ? "/tasks" : "/"
      }>
        <h1 className="text-2xl font-bold">Gestión de Proyectos</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>¡Hola, <strong>{user ? user.username : 'Invitado'}</strong>!</li>

            <li>
              <Link 
              className="bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-600"
              to="/add-task">Nueva tarea</Link>
            </li>
            <li>
              <Link 
              className="px-4 py-1 rounded-sm "
              to="/user">Usuarios</Link>
            </li>
            <li>
              <Link 
              
              to="/" onClick={() => {
                logout()
              }}>
                Salir
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
              className="bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-600" 
              to="/login">Login</Link>
            </li>
            <li>
              <Link 
              className="bg-indigo-500 px-4 py-1 rounded-sm hover:bg-indigo-600"
              to="/register">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
