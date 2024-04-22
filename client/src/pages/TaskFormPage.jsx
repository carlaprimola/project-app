import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Textarea } from "../components/ui/Textarea";
import utc from 'dayjs/plugin/utc'
import dayjs from "dayjs";
dayjs.extend(utc)

export default function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

useEffect(() => {
  const loadTask = async function () {
    if(params.id){
      const task = await getTask(params.id)
      console.log("Tareas",task)
      setValue("title", task.title)
      setValue("description", task.description)
      setValue("date", dayjs(task.date).utc().format())
    }
  }
  loadTask()
}, [])

  const onSubmit = handleSubmit((data) => {
    
    const dataValid = {
      ...data, 
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),    
    }

    if (data.date) dataValid.date = dayjs.utc(data.date).format()

    if (params.id) {
      updateTask(params.id,dataValid)
    } else {
      createTask(dataValid);
    
    }
    //tras crear la tarea llevar a /tasks
    navigate('/tasks')
  });

  return (
    <main 
    className="bg-zing-800 max-w-md w-full rounded-md flex items-center justify-center h-[calc(100vh-100px)] m-auto">
      <div className="bg-zinc-800 p-10 rounded-md w-96">
      <form onSubmit={handleSubmit(onSubmit)}>
      {/* <h2 className="text-2xl font-bold text-center">
        Crear nueva tarea</h2> */}
        <label htmlFor="title">Título de la tarea:</label>
        <input
          type="text"
          name="title"
          placeholder="title"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("title")}
          autoFocus
        />

        <label htmlFor="description">Descripción:</label>
        <Textarea
          rows={3}
          name="description"
          placeholder="description"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description")}
        />

        <label htmlFor="date">Fecha:</label>
        <input
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        type="date" {...register('date')} />

        <button 
        className="bg-indigo-500 px-3 py-2 rounded-md" 
        type="submit">Guardar</button>
      </form>
      </div>
      
    </main>
  );
}
