import Category from "../models/Category.js";


export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await Category.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({ name });

        res.status(201).json({
            message: "Category created",
            category,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();

        res.json(categories);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.name = name;
        await category.save();

        res.json({
            message: "Category updated",
            category,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();

        res.json({
            message: "Category deleted",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};