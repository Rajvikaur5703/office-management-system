const express = require("express");
const multer = require('multer');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const taskRoutes = require("./routes/taskRoutes");
const leaveRoutes = require("./routes/leaveRoutes")


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());  // 1. Allow React to talk to Node
app.use(express.json());  // 2. Allow Node to read the JSON data you send

// serve uploaded files
app.use("/uploads", express.static("uploads"));    //global middleware, meaning it should run before all routes.

app.use("/api/documents", documentRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/auth", authRoutes);  // Only Auth Routes (Login/Register)

// Test route
app.get("/", (req, res) => {
    res.send("Auth API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});