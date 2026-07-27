import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import User from "./models/User.js";
import adminRoutes from "./routes/adminRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js"; 
import categoryRoutes from "./routes/categoryRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js"; 

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminRoutes);


app.use("/api", protectedRoutes);


app.get("/", (req, res) => {
    res.send("API is running...");
});



app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You are authorized",
        user: req.user,
    });
});


sequelize
    .authenticate()
    .then(async () => {
        console.log("Database connected");

        await sequelize.sync();

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("DB Error:", err));
