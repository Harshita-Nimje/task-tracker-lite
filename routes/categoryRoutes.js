import express from "express";
import {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} from "../controllers/categoryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Admin only
router.post("/", authMiddleware, checkRole("admin"), createCategory);
router.put("/:id", authMiddleware, checkRole("admin"), updateCategory);
router.delete("/:id", authMiddleware, checkRole("admin"), deleteCategory);

// ✅ All users
router.get("/", authMiddleware, getCategories);

export default router;