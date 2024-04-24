import { useEffect, useState } from "react";
import { userRequest } from "../api/auth.js";
import { useAuth } from "../context/AuthContext.jsx";


function UserPage() {
  const [users, setUsers] = useState([]); 
  const {user} = useAuth()

  useEffect(() => {
    // Obtén el token de autenticación de localStorage
    const token = localStorage.getItem('token');
    
    // Configura los encabezados de la solicitud
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    // Haz la solicitud a la API
    userRequest({ headers })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });

  }, []);

  // Obtén el tipoRol de localStorage
  const tipoRol = user ? user.tipoRol : null; 

  // Verifica si el tipoRol es 'admin'
  if (tipoRol !== 'admin') {
    return (
      <main>
        <h2>No tienes el permiso necesario para visualizar esta página</h2>
      </main>
    );
  }

 

  // Si el tipoRol no es admin, muestra un mensaje de error
  if (tipoRol !== 'admin') {
    return (
      <main>
        <h2>No tienes el permiso necesario para visualizar esta página</h2>
      </main>
    );
  }


  //Si es admin muestra la lista de usuarios
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default UserPage;
