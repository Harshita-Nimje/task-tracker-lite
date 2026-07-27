import express from "express";
import protectedRoutes from "./routes/protectedRoutes.js";

const app = express();

app.use(express.json());

console.log("SERVER STARTED");


app.get("/test", (req, res) => {
    res.send("MAIN WORKING");
});


app.use("/api", protectedRoutes);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
