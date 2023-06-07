const { Task } = require("../model/task"); // Ajustar la importación para utilizar Task en lugar de taskSchema

exports.createTask = async (req, res) => {
  try {
    let task;
    task = new Task(req.body); // Utilizar el constructor del esquema de tarea correctamente
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("La tarea no pudo ser creada");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // Obtener todas las tareas utilizando el método find() del esquema de tarea
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ msg: "La tarea no existe." });
    }
    await task.deleteOne();
    res.json({ msg: "Tarea eliminada exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};


exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId; 
    
    if (!taskId) {
      return res.status(400).json({ msg: 'El ID de la tarea es requerido.' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { completed: true } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ msg: 'La tarea no existe.' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ha ocurrido un error en el servidor.');
  }
};
