const express = require("express");
const router = express.Router();
const taskSchema = require("../controllers/taskControllers");


router.post("/getTaks",taskSchema.createTask);
router.get("/postTaks",taskSchema.getTask);
router.delete("/deleteTaks",taskSchema.getTask);
router.put("/deleteTaks",taskSchema.getTask);