import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";



export default function RegisterPage() {

  const {register, handleSubmit, 
    formState: {errors: formErrors} 
  } = useForm()
  const {signup, isAuthenticated, errors: RegisterErrors} = useAuth()
  const navigate = useNavigate()
  
  //si el usuario esta autenticado le llevamos a /tasks
  useEffect(() => {
      if(isAuthenticated) {
          navigate("/tasks")
      }
  }, [isAuthenticated])

  const onSubmit = handleSubmit (async (values) => {
    signup(values)
  })  

return (
  <main className='bg-zinc-800 max-w-md p-10 rounded-md'>      
    {
    RegisterErrors && RegisterErrors.length > 0 && RegisterErrors.map((error, i) => (
      <p className='bg-red-500 p-2 text-white' key={i}>
        {error}
      </p>
    ))
  }
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' {...register("username", {required: true})}
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='Username'
          autoComplete='off'
      />
      {formErrors.username && <p className='text-red-500'>Este campo es obligatorio</p>}
      
      <input type='email' autoComplete='off' {...register("email", {required: true})}
      className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
      placeholder='Email'
      />
      {formErrors.email && <p className='text-red-500'>Este campo es obligatorio</p>}

      <input type='password' autoComplete='off' {...register("password", {required: true})}
      className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
      placeholder='Password'
      />
      {formErrors.password && <p className='text-red-500'>Este campo es obligatorio</p>}
      
      <button type='submit'>Register</button>
      <p className="flex gap x-2 justify-between">¿Ya tienes cuenta? <Link to="/login" className="text-sky-500">Iniciar sesión</Link></p>
    </form>

  </main>
)
}

