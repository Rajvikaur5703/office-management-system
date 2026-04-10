const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const empRoutes = require('./routes/empRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB= require("./config/db");

const app = express();

// Middleware
<<<<<<< Updated upstream
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/employees', empRoutes);
app.use('/api/admin', adminRoutes);
=======
app.use(cors());  // 1. Allow React to talk to Node
app.use(express.json());  // 2. Allow Node to read the JSON data you send

>>>>>>> Stashed changes

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
