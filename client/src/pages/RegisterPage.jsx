import {useForm} from 'react-hook-form'
import { registerRequest } from '../api/auth.js'



export default function RegisterPage() {

    const {register, handleSubmit} = useForm()


  return (
    <main className='bg-zinc-800 max-w-md p-10 rounded-md'>      
      
      <form onSubmit={handleSubmit( async (values) => {
        console.log(values)
        const res = await registerRequest(values)
        console.log(res)
      })}>
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
