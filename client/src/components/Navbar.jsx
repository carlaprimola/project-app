import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-zinc-700 m-3 flex justify-between py-5 px-10">
      <Link to="/">
        <h1 className="text-2xl font-bold">Task Application</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link 
              className="bg-indigo-500 px-4 py-1 rounded-sm"
              to="/add-task">Nueva tarea</Link>
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
              className="bg-indigo-500 px-4 py-1 rounded-sm" 
              to="/login">Login</Link>
            </li>
            <li>
              <Link 
              className="bg-indigo-500 px-4 py-1 rounded-sm"
              to="/register">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
