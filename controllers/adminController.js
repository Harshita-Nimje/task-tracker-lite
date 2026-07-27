import Task from "../models/Task.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import { Op } from "sequelize";

// ✅ GET ALL TASKS WITH FILTERS (Admin only)
export const getAllTasks = async (req, res) => {
    try {
        const { userId, status, startDate, endDate } = req.query;

        let where = {};

        // 🔍 Filter by user
        if (userId) {
            where.UserId = userId;
        }

        // 🔍 Filter by status
        if (status) {
            where.status = status;
        }

        // 🔍 Filter by due date range
        if (startDate && endDate) {
            where.dueDate = {
                [Op.between]: [new Date(startDate), new Date(endDate)],
            };
        }

        const tasks = await Task.findAll({
            where,
            include: [
                { model: User, attributes: ["id", "name", "email"] },
                { model: Category, attributes: ["id", "name"] },
            ],
            order: [["dueDate", "ASC"]],
        });

        res.json({
            total: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};