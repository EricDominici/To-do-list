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
    const task = await Task.findById(req.params.taskId); // Buscar la tarea por su ID utilizando el método findById() del esquema de tarea
    if (!task) {
      res.status(404).json({ msg: "La tarea no existe." });
    }
    await task.deleteOne(); // Eliminar la tarea utilizando el método remove() del objeto de tarea
    res.json({ msg: "Tarea eliminada exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.taskId,
      { text: req.body.text },
      { new: true }
    ); // Actualizar la tarea utilizando el método findByIdAndUpdate() del esquema de tarea
    if (!task) {
      res.status(404).json({ msg: "La tarea no existe." });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};
