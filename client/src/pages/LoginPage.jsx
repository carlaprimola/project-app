import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();
  const { signin, errors: signinErrors } = useAuth();
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <main className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 p-10 rounded-md w-96">
        {signinErrors &&
          signinErrors.length > 0 &&
          signinErrors.map((error, i) => (
            <p className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </p>
          ))}
        <h2 className="text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            autoComplete="off"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {formErrors.email && (
            <p className="text-red-500">Este campo es obligatorio</p>
          )}

          <input
            type="password"
            autoComplete="off"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {formErrors.password && (
            <p className="text-red-500">Este campo es obligatorio</p>
          )}

          <button type="submit">Iniciar sesión</button>
          <p className="flex gap x-2 justify-between">¿Aún no tienes cuenta? <Link to="/register" className="text-sky-500">Regístrate</Link></p>
        </form>
      </div>
    </main>
  );
}
