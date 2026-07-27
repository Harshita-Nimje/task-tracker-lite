// import bcrypt from "bcryptjs";
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword } = req.body;

//         // Check passwords match
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         // Check if user exists
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const user = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         res.status(201).json({
//             message: "User registered successfully",
//             user,
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Check user exists
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // Generate token
//         const token = jwt.sign(
//             { id: user.id, role: user.role },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user.id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             },
//         });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ✅ REGISTER
export const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        // ✅ Check passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        // ✅ Check if user exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user WITH ROLE SUPPORT
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role ? role : "user", // 🔥 FIX
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Register Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check user exists
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // ✅ Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        // ✅ Generate token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role, // ✅ include role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};