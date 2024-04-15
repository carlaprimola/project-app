/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";
import { createTaskRequest } from "../api/tasks.js";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks] = useState([]);

  const createTask = async (task) => {
   await createTaskRequest(task);
    console.log(task);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
