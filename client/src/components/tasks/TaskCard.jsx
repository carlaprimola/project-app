import PropTypes from "prop-types";
import { useTasks } from "../../context/TaskContext.jsx";
import { Link } from "react-router-dom";
import days from 'dayjs'
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

days.extend(utc)

function TaskCard({ task }) {
  
    const {deleteTask} = useTasks();
    
  return (
    <section className="bg-zinc-800 max-W-md w-full">
      <header className="flex justify-between">
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <div className="flex gap-x-2 items-center">
          <Link 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          to={`/tasks/${task._id}`}>
          Editar</Link>
          <button 
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          onClick={() => deleteTask(task._id)}>
            Eliminar</button>

        </div>
      </header>

      <p className="text-slate-300">{task.description}</p>
      <p>{days(task.date).utc().format("DD/MM/YYYY")}</p>
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
