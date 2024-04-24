import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">Gestión de Proyectos</h1>
      <p className="text-md text-slate-400">
       ¡Hola!Esta es una aplicación de tareas diseñada con React, Vite  para la parte de frontend. 
       La base de datos está hecha con MongoDB Atlass y la parte de backend con Node y Express.
       ¡Espero que la disfrutes!
      </p>

      <Link
        className="bg-indigo-500 hover:bg-indigo-600  text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/register"
      >
        Empezar
      </Link>
    </header>
  </section>
  );
}

export default HomePage;

