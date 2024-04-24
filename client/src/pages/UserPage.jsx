import { useEffect, useState } from "react";
import { userRequest } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";
import { deleteUserRequest } from "../api/auth.js";

function UserPage() {
  const [users, setUsers] = useState([]); 
  const {user} = useAuth()

  // Obtén los usuarios al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };
    userRequest({ headers })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }, []);

  // Obtén el tipoRol del usuario actual
  const tipoRol = user ? user.tipoRol : null; 

  // Si el usuario no es admin, muestra un mensaje de error
  if (tipoRol !== 'admin') {
    return (
      <main>
        <h2>No tienes el permiso necesario para visualizar esta página</h2>
      </main>
    );
  }

  // Función para manejar la eliminación de usuarios
  const handleDelete = (userId) => {    
    deleteUserRequest(userId)
      .then(() => {        
        setUsers(users.filter(user => user._id !== userId));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  // Si el usuario es admin, muestra la lista de usuarios
  return (
    <main>
      <h2 className="flex justify-center text-2xl font-bold mb-4 text-white-800 mt-5">
        Listado de usuarios
      </h2>

      <table className="min-w-full divide-y bg-zinc-800 overflow-x-auto">
        <thead className="bg-zinc-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white-700 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white-700 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-white-700 uppercase tracking-wider"
            >
              Tipo
            </th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 divide-gray-100">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm text-white">{user.username}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-white">{user.email}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p className="text-sm text-white">{user.tipoRol}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" 
                onClick={() => handleDelete(user._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default UserPage;
