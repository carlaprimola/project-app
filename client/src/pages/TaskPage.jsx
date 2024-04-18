import { useEffect } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import TaskCard from "../components/tasks/TaskCard.jsx"


function TaskPage() {
  const { getTasks, tasks } = useTasks();
  //console.log(tasks)

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h2>No hay tareas</h2>;

  return (
    <main className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map(
        (task) =>
          task && (
           <TaskCard 
           task={task} 
           key={task._id}
           />
          )
      )}
    </main>
  );
}

export default TaskPage;
