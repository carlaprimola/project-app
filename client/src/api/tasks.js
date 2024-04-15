import axios from "axios";
import instance from "./axios";


export const getTasksRequest = async () => axios.get("/tasks");

export const createTaskRequest = async (task) => {
  
  //antes de una solicitud añadimos instance, que es el parametro que estamos usando dentro del archivo axios, para llamar a nuestro back
  instance.post("/add-task", JSON.stringify(task), {
  headers: {
    "Content-Type": "application/json",
  }

})
console.log(task)
}

export const updateTaskRequest = async (task) =>
  axios.put(`/tasks/${task._id}`, task);

export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);