import { createContext, useContext, useState } from "react";
import { createTaskRequest, 
  getTasksRequest, 
  deleteTaskRequest, 
  getTaskRequest,
updateTaskRequest } from "../api/tasks.js";
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

  //Get Tasks
  const getTasks = async() => {
    try {
      const res = await getTasksRequest()
      setTasks(res)
      // console.log(res)
    } catch (error) {
      console.error(error)
    }

  }

    //Get Task
  const getTask = async (id) => {
    try {
    const res = await getTaskRequest(id)
    console.log(res)
    return res;
    
    } catch (error) {
      console.error(error)
    }
  }

    //Create Task
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
  
    //Delete Task
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);     
      if (res.status === 200 || res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
          } catch (error) {
      console.log(error);
    }
  };

  //Update Task
  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.error(error)
    }
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
        getTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node 
};