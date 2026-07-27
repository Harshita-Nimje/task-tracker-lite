import express from "express";
import protect from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

console.log("✅ ProtectedRoutes LOADED");

// Admin only route
router.get("/admin", protect, checkRole("admin"), (req, res) => {
    console.log("USER:", req.user); // 👈 ADD THIS
    res.json({ message: "Welcome Admin!" });
});

// Normal user route
router.get("/user", protect, (req, res) => {
    res.json({ message: "Welcome User!" });
});

// Test route
router.get("/test", (req, res) => {
    res.send("Route test working");
});

export default router;