import express from "express";
import { getAllTasks } from "../controllers/adminController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// 🔒 Admin only
router.get("/tasks", authMiddleware, checkRole("admin"), getAllTasks);

export default router;