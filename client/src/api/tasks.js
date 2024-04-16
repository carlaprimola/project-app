import axios from "axios";
import instance from "./axios";

export const getTasksRequest = async () => {
  try {
    const response = await instance.get("/tasks")

    // console.log(response)
    return response.data
     
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }


}




export const createTaskRequest = async (task) => {
  try {
    const response = await instance.post("/add-task", JSON.stringify(task), {
      headers: {
        "Content-Type": "application/json",
      }
    });

    console.log("Response from createTaskRequest:", response);
    
    return response.data; // Devolver los datos de la tarea creada
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
}

export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
