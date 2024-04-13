import {useForm} from 'react-hook-form'
import {useAuth} from '../context/AuthContext.jsx'



export default function RegisterPage() {

    const {register, handleSubmit} = useForm()
    const {signup, user} = useAuth()

    console.log(user)

    const onSubmit = handleSubmit (async (values) => {
      signup(values)
    })  

  return (
    <main className='bg-zinc-800 max-w-md p-10 rounded-md'>      
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' {...register("username", {required: true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='Username'
            autoComplete='off'
        />
        <input type='email' autoComplete='off' {...register("email", {required: true})}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='Email'
        />
        
        <input type='password' autoComplete='off' {...register("password", {required: true})}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
        placeholder='Password'
        />
        
        <button type='submit'>Register</button>
      </form>

    </main>
  )
}
