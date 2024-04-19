import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "../components/ui/Card.jsx";
import { Message } from "../components/ui/Message.jsx";
import { Button } from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { Label } from "../components/ui/Label.jsx";
import { registerSchema } from "../schemas/auth.js";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  console.log(formErrors)
  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  //si el usuario esta autenticado le llevamos a /tasks
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values)
    signup(values);
    
  });

  return (
    <main className="flex h-[calc(100vh-100px)] items-center justify-center mt-20">
      <div className="bg-zinc-800 p-10 rounded-md w-96">
        <Card>
          {RegisterErrors &&
            RegisterErrors.length > 0 &&
            RegisterErrors.map((error, i) => (
              <Message className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </Message>
            ))}
          <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
              autoComplete="off"
            />
            {formErrors.username && (
              <Message className="text-red-500">Este campo es obligatorio</Message>
            )}
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {formErrors.email && (
              <Message className="text-red-500">Este campo es obligatorio</Message>
            )}
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              autoComplete="off"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Password"
            />
            {formErrors.password && (
              <Message className="text-red-500">Este campo es obligatorio</Message>
            )}

            <Button
              className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 hover:bg-sky-600"
              type="submit"
            >
              Register
            </Button>
            <p className="flex gap x-2 justify-between">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-sky-500 hover:text-sky-400">
                Iniciar sesión
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
