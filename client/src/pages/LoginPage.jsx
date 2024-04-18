import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {Card} from "../components/ui/Card.jsx";
import  {Message}  from "../components/ui/Message.jsx";
import { Button } from "../components/ui/Button.jsx";
import {Input} from "../components/ui/Input.jsx";
import {Label} from "../components/ui/Label.jsx";
import { loginSchema } from "../schemas/auth";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  //tras el login llevar a /tasks
  useEffect(() => {
    if (isAuthenticated) navigate ("/tasks")
  }, [isAuthenticated])

  return (
    <main className="flex h-[calc(100vh-100px)] items-center justify-center mt-20">
      <div className="bg-zinc-800 p-10 rounded-md w-96">
        <Card>
        {signinErrors &&
          signinErrors.length > 0 &&
          signinErrors.map((error, i) => (
            <Message className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </Message>
          ))}
        <h2 className="text-2xl font-bold text-center">Inicio sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <p className="text-red-500">Este campo es obligatorio</p>
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
            <p className="text-red-500">Este campo es obligatorio</p>
          )}

          <Button 
          className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 hover:bg-sky-600"
          type="submit">Iniciar sesión</Button>
          <p className="flex gap x-2 justify-between">¿Aún no tienes cuenta? 
          
          <Link 
          to="/register" 
          className="text-sky-500 hover:text-sky-400">Regístrate</Link></p>
        </form>
        </Card>
      </div>
    </main>
  );
}
