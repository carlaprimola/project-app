import { useEffect } from "react"
import { useTasks } from "../context/TaskContext.jsx"

function TaskPage() {

  const {getTasks, tasks} = useTasks()
  console.log(tasks)
  useEffect(() => {
    getTasks()
  }, [])
  
   if (tasks.length === 0) return (<h2>No hay tareas</h2>) 
  
  return (
    <main>
      {tasks.map((task) => (
        <section key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </section>
      ))}
    
    </main>
  )
}

export default TaskPage