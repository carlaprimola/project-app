import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/tasks.js";
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
    console.log(task)
    try {
      const res = await createTaskRequest(task);
      console.log(res)
      if (res ) {
        const { data, status, statusText, headers, config } = res;
        console.log("Response from createTaskRequest:", res);
        console.log(data)
        setTasks(prevTasks => [...prevTasks, data]);
        return { data, status, statusText, headers, config };
      }    
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }   
  };

  useEffect(() => {
    // console.log("Current tasks:", tasks);
  }, [tasks]);

 


  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node 
};