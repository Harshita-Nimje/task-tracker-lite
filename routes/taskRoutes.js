import express from "express";
import {
    createTask,
    getMyTasks,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getMyTasks);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;