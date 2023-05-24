const taskSchema  = require("../model/task");//llamando
exports.createTask = async(req, res) => {//crear las tareas
    try{
        let task;
        task = new taskSchema(req.body)
        await task.save();
        res.send(task);     
    }catch(error){
        console.log(error);
        res.status(500).send("te jodite");

    }
}
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskSchema.find();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};


exports.deleteTask = async (req, res) => {
  try {
    let task = await taskSchema.findById(req.params.taskId);
    if (!task) {
      res.status(404).json({ msg: "La tarea no existe." });
    }
    await taskSchema.findByIdAndRemove({ _id: req.params.taskId });
    res.json({ msg: "Tarea eliminada exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};

exports.updateTask = async (req, res) => {
  try {
    let task = await taskSchema.findById(req.params.taskId);
    if (!task) {
      res.status(404).json({ msg: "La tarea no existe." });
    }
    task.text = req.body.text;
    task = await task.save();
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).send("Ha ocurrido un error en el servidor.");
  }
};





