import Task from '../modules/task.model.js';

//Mostrar todo
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      //solo trae las tareas del usuario logado
      user: req.user._id
    }).populate('user');
    //con populate le pedimos que nos traiga los datos del user y los vincule con esa tarea
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas", error });
  }
};

//Mostrar una
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('user');
    console.log('getTask response:', task);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea", error });
  }
};

//Crear
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  console.log(req.user)
  try {
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user._id
    });
    const savedTask = await newTask.save();
    res.json({ message: 'Tarea creada exitosamente', task: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

//Delete
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    return res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea", error });
  }
};

//Editar
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea actualizada exitosamente', task });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tarea", error });
  }
};
