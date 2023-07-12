const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

router.post("/tasksPost", taskController.createTask);
router.get("/tasksGest", taskController.getTasks);
router.delete("/tasksDelete/:taskId", taskController.deleteTask);
router.put("/taskss/:taskId", taskController.updateTask);

module.exports = router;