import Task from "../models/Task.js";
import Category from "../models/Category.js";


export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate, categoryId } = req.body;

        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            CategoryId: categoryId,
            UserId: req.user.id,
        });

        res.status(201).json({
            message: "Task created",
            task,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { UserId: req.user.id },
            include: [Category],
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }


        if (task.UserId !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }


        const now = new Date();
        if (new Date(task.dueDate) < now && status) {
            return res.status(400).json({
                message: "Cannot update status after due date",
            });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        if (status) task.status = status;

        await task.save();

        res.json({
            message: "Task updated",
            task,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.UserId !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await task.destroy();

        res.json({ message: "Task deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};