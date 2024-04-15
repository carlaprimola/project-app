import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskCOntext.jsx";

export default function TaskFormPage() {
  
  const {register, handleSubmit} = useForm();
  const {createTask} = useTasks()
  
  
  const onSubmit = async (data) => {
    createTask(data)
    console.log(data)
  }
  

  return (
    <main className="bg-zing-800 max-w-md w-full p-10 rounded-md">
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
        type="text"
        name="title" 
        placeholder="title"
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        {...register("title")}
        autoFocus
        />
        <textarea 
        rows={3} 
        name="description"
        placeholder="description"
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        {...register("description")}
        autoFocus
        />

        <button type="submit">Guardar</button>
      </form>

    </main>
  )
}
