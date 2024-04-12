import Task from '../modules/task.model.js';

//Mostrar todo
export const getTasks = async (req, res) => {
    const tasks = await Task.find({

        //solo trae las tareas del usuario logado
        user: req.user._id
    }).populate('user');
    //con populate le pedimos que nos traiga los datos del user y los vincule con esa tarea
    res.json(tasks);

};

//Mostrar una
export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');

    if(!task) return res.status(404).json({message: 'Task not found'});

    res.json(task);
};

//Crear
export const createTask = async (req, res) => {
    const {title, description, date} = req.body;
    console.log(req.user)
    const newTask = new Task({
        title,
        description,
        date,
        user: req.user._id
    });
    const savedTask = await newTask.save();
    
    res.json(savedTask)
};

//Delete
export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);

    if(!task) return res.status(404).json({message: 'Task not found'});

    return res.sendStatus(204);
};

export const updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id, req.body, {new: true});

    if(!task) return res.status(404).json({message: 'Task not found'});

    res.json(task);
};

