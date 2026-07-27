// // const express = require("express");
// // const app = express();

// // app.use(express.json());

// // // ✅ Import routes
// // const protectedRoutes = require("./routes/protectedRoutes");

// // // ✅ Use routes
// // app.use("/api", protectedRoutes);

// // console.log("Routes loaded");

// // // ✅ Start server
// // const PORT = 5000;
// // app.listen(PORT, () => {
// //     console.log(`Server running on port ${PORT}`);
// // });

// // import express from "express";

// // const app = express();

// // console.log("🔥 SERVER STARTED");

// // app.get("/test", (req, res) => {
// //     res.send("WORKING NOW");
// // });

// // const PORT = 8000;

// // app.listen(PORT, () => {
// //     console.log(`✅ Running on http://localhost:${PORT}`);
// // });

// import express from "express";
// import protectedRoutes from "./routes/protectedRoutes.js";

// const app = express();

// app.use(express.json());

// console.log("🔥 SERVER STARTED");

// // main test
// app.get("/test", (req, res) => {
//     res.send("MAIN WORKING");
// });

// // routes
// app.use("/api", protectedRoutes);

// const PORT = 8000;

// app.listen(PORT, () => {
//     console.log(`✅ Running on http://localhost:${PORT}`);
// });

import express from "express";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();

app.use(express.json());

console.log("🔥 SERVER STARTED");

// Main test
app.get("/test", (req, res) => {
    res.send("MAIN WORKING");
});

// Routes
app.use("/api", protectedRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`✅ Running on http://localhost:${PORT}`);
});