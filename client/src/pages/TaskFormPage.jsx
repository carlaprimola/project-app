import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";

export default function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    //tras crear la tarea llevar a /tasks
    navigate('/tasks')
  });

  return (
    <main 
    className="bg-zing-800 max-w-md w-full rounded-md flex items-center justify-center h-[calc(100vh-100px)] m-auto">
      <div className="bg-zinc-800 p-10 rounded-md w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold text-center">
        Crear nueva tarea</h2>
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
        />

        <button type="submit">Guardar</button>
      </form>
      </div>
      
    </main>
  );
}
