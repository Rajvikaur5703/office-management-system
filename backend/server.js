const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const empRoutes = require('./routes/empRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB= require("./config/db");

const app = express();

// Middleware
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/employees', empRoutes);
app.use('/api/admin', adminRoutes);

// Routes
app.use('/api/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
