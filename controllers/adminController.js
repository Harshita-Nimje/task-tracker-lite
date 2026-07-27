import Task from "../models/Task.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import { Op } from "sequelize";


export const getAllTasks = async (req, res) => {
    try {
        const { userId, status, startDate, endDate } = req.query;

        let where = {};

        if (userId) {
            where.UserId = userId;
        }


        if (status) {
            where.status = status;
        }


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