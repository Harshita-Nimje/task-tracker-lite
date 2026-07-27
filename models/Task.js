import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import User from "./User.js";
import Category from "./Category.js";

const Task = sequelize.define("Task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.ENUM("Todo", "Doing", "Done"),
        defaultValue: "Todo",
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

// 🔗 Associations
User.hasMany(Task);
Task.belongsTo(User);

Category.hasMany(Task);
Task.belongsTo(Category);

export default Task;