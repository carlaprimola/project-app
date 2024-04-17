import axios from "axios";
import instance from "./axios";

//Mostrar todas las tareas
export const getTasksRequest = async () => {
  try {
    const response = await instance.get("/tasks")
    
    return response.data
     
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

//Mostrar una tarea
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);

//Crear tarea
export const createTaskRequest = async (task) => {
  try {
    const response = await instance.post("/add-task", JSON.stringify(task), {
      headers: {
        "Content-Type": "application/json",
      }
    });
    //console.log("Response from createTaskRequest:", response);
    return response.data; // Devolver los datos de la tarea creada
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
}

//Eliminar tarea  
export const deleteTaskRequest = async (id) => {
  try {
    const response = await instance.delete(`/tasks/${id}`, JSON.stringify(id), {
      headers:{
        "Content-type": "application/json",
      }
    });
    console.log("Response from DeleteTaskRequest:",response.data)
    return response.data;
 } catch (error) {
   console.error("Error al eliminar la tarea:",error)
 }
}



//Editar una tarea
export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task);



