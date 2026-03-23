// Create endpoints for your AdminEmployee.jsx and Profile.jsx frontend pages.
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the model directly for simple operations
const { getAllEmployees, addEmployee, getProfile } = require('../controllers/empController');

// --- READ ALL ---
// For AdminEmployee.jsx table
router.get('/', getAllEmployees);

// --- CREATE ---
// For Add Employee Form
router.post('/', addEmployee);

// --- READ ONE ---
// For Profile.jsx
router.get('/:id', getProfile);

// --- DELETE ---
// To make the "Delete" button work in your table
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error during deletion" });
    }
});

// --- UPDATE (Optional but useful) ---
// For editing employee details later
// Inside your Update (PUT) route
router.put('/:id', async (req, res) => {
    try {
        const { name, email, department, password } = req.body;
        let updateData = { name, email, department };

        // Check if a password was actually provided
        if (password && password.toString().trim() !== "") {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            
            // FIX: Ensure password is a String before hashing
            const hashedPassword = await bcrypt.hash(password.toString(), salt);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: updateData }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Employee updated successfully!" });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(400).json({ message: "Update failed: " + error.message });
    }
});

module.exports = router;