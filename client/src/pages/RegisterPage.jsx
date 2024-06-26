import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "../components/ui/Card.jsx";
import { Message } from "../components/ui/Message.jsx";
import { Button } from "../components/ui/Button.jsx";
//import Input from "../components/ui/Input.jsx";
import { Label } from "../components/ui/Label.jsx";
import { registerSchema } from "../schemas/auth.js";

import ReCAPTCHA from "react-google-recaptcha";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
  const navigate = useNavigate();

  //si el usuario esta autenticado le llevamos a /tasks
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    register('honeypot');
    register('timestamp');
  }, [register]);
  

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    if (!recaptchaCompleted) {
      console.log("Completa el reCAPTCHA antes de registrarte.")();
      return;
    } else {
      // Establecer el valor de timestamp justo antes de enviar el formulario
    values.timestamp = Date.now();
    signup(values);
      }      
      });
  

  // Funcion Recaptcha
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);  
  const onChange = () => {
    console.log("Captcha complete");
    setRecaptchaCompleted(true);
  };
 

  return (
    <main className="px-10 flex h-[calc(100vh-100px)] items-center justify-center mt-10 mx-auto" style={{ paddingTop: '20px' }}>
      
      <div className="bg-zinc-800 p-10 rounded-md w-110 m-auto">
        <Card>
          {RegisterErrors && RegisterErrors.length > 0 && (
            <div className="relative" style={{ marginBottom: "2rem" }}>
              {RegisterErrors.map((error, i) => (
                <Message
                  className="bg-red-500 p-2 text-white mb-5"
                  key={i}
                  style={{ marginBottom: "0.5rem" }}
                >
                  {error}
                </Message>
              ))}
            </div>
          )}
          <h2 className="text-2xl font-bold text-center">Crear cuenta</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* campo oculto1 */}
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
            type="hidden"             
            name="honeypot" 
            {...register("honeypot")} 
            autoComplete="off"            
            />
            {/* campo oculto2 */}
            <input 
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            type="hidden" {...register('timestamp')} 
            value={Date.now()} 
            />

            <Label htmlFor="username">Username:</Label>
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Username"
              autoComplete="off"
            />
            {formErrors.username && (
              <Message message={formErrors.username.message} />
              

            )}

            <Label htmlFor="email">Email:</Label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Email"
            />
            {formErrors.email && <Message message={formErrors.email.message} />}
            <Label htmlFor="password">Password:</Label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              {...register("password", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-1 rounded-md my-2"
              placeholder="Password"
            />
            {formErrors.password && (
              <Message message={formErrors.password.message} />
            )}

            {/* Recaptcha */}
            <div className="w-full mx-auto my-2" style={{ marginTop: "2rem" }}>
              <ReCAPTCHA
                sitekey="6LdXacEpAAAAACGdk8ZNcEm0zjpFlTb9cXxqTWEs"
                secretkey="6LdXacEpAAAAALGR6abuvJdiCIcIvYPFdqJSWGK4"
                onChange={onChange}
                className="cursor-pointer flex justify-center border-none text-white w-full rounded-md"
                theme="dark"
                required={true}
              />
            </div>

            <div className="flex justify-center">
              <Button
                className="bg-sky-500 text-white px-4 py-2 rounded-md my-2 hover:bg-sky-600"
                type="submit"
              >
                Register
              </Button>
            </div>

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
