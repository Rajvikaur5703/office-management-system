const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");

// Add leave (Employee)
router.post("/apply", async (req, res) => {
    try {
        const leave = new Leave(req.body);
        await leave.save();
        res.json(leave);
    } catch (err) {
        res.status(500).json({ message: "Failed to apply for leave!" });
    }
});

// Get all leaves (Admin)
router.get("/", async (req, res) => {
    try {
        const leaves = await Leave.find().sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get leaves for employees
router.get("/:name", async (req, res) => {
    try {
        const leaves = await Leave.find({ name: req.params.name });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Update leave status 
router.put("/:id", async (req, res) => {
    try {
        const updated = await Leave.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;