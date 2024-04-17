import PropTypes from "prop-types";
import { useTasks } from "../context/TaskContext.jsx";

function TaskCard({ task }) {
  
    const {deleteTask} = useTasks();
    
  return (
    <section className="bg-zinc-800 max-W-md w-full">
      <header className="flex justify-between">
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <div className="flex gap-x-2 items-center">
          <button>Editar</button>
          <button
           onClick={() => {
            deleteTask(task._id)
          }}
          >Eliminar</button>
        </div>
      </header>

      <p className="text-slate-300">{task.description}</p>
      <p>{new Date(task.date).toLocaleDateString()}</p>
    </section>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
