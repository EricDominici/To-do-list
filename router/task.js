const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskControllers");

router.post("/tasks", taskController.createTask);
router.get("/tasksget", taskController.getTasks);
router.delete("/tasks/:taskId", taskController.deleteTask);
router.put("/taskss/:taskId", taskController.updateTask);

module.exports = router;
