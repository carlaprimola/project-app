import { useEffect } from "react";
import { useTasks } from "../context/TaskContext.jsx";
import TaskCard from "../components/TaskCard.jsx"


function TaskPage() {
  const { getTasks, tasks } = useTasks();
  //console.log(tasks)

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) return <h2>No hay tareas</h2>;

  return (
    <main className="grid grid-cols-3 gap-2">
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
