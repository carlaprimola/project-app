import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest } from "../api/tasks.js";
import PropTypes from 'prop-types';
import { useEffect } from "react";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async() => {
    try {
      const res = await getTasksRequest()
      setTasks(res)
      // console.log(res)
    } catch (error) {
      console.error(error)
    }

  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      if (res) {
        const newTask = res.data;
        setTasks(prevTasks => [...prevTasks, newTask]);
        return res;
      }    
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }   
  };
  
  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    console.log(res)
  }

  useEffect(() => {
    // console.log("Current tasks:", tasks);
  }, [tasks]);

 


  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node 
};