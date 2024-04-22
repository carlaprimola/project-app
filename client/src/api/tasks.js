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
export const getTaskRequest = async (id) => {
  try {
    const response = instance.get(`/tasks/${id}`, JSON.stringify(id), {
      headers:{
        "Content-type": "application/json",
  }});
  console.log(response.data)
  return (await response).data;
  } catch (error) {
    console.error("Error al mostrar la tarea:", error);
      throw error;
  }
}


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
    console.log(response.data)
    return response;
 } catch (error) {
   console.error("Error al eliminar la tarea:",error)
 }
}


//Editar una tarea
export const updateTaskRequest = async (id, task) => {
  try {
    const response = await instance.put(`/tasks/${id}`, JSON.stringify(task), {
      headers:{
        "Content-type": "application/json",
      }
    });
    console.log(response.data)
    return response;
  } catch (error) {
    console.error("Error al editar la tarea:",error)
  }
}
  



