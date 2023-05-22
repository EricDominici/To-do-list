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
exports.getTaks = async (req, res) => {//traer las tareas, get
    try {
      //create product
      const product = await Product.find();
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error in the data");
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      let taks = await Product.findById(req.params.id);
      if (!taks) {
        res.status(404).json({ mgs: "The product does not exist "});
      }
      await Product.findByIdAndRemove({_id: req.params.id})
      res.json({msg: "Producto eliminado con existo"})
    } catch (error) {
      console.log(error);
      res.status(500).send("There was an error in the data");
    }
  };
//   exports.udateProduct = async (req, res) => {
//     try {
//       //create product
//       const { text } = req.body;
//       let taksUpdate = await TaksShemman.findById(req.params.id);
//       if (!taksUpdate) {
//         res.status(404).json({ mgs: “The product does not exist” });
//       }
//       taks.text = nombre;
//      taksUpdate = await TaksShemman.findByIdAndUpdate({ _id: req.params.id }, taksUpdate, {
//         new: true,
//       });
//       res.json(product);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send(“There was an error in the data”);
//     }
//   }; 