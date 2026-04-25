const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Task = require("../models/Task");

// Add Task (Admin)
router.post("/add", async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Failed to add task" });
    }
});

// Get all tasks (Admin)
router.get("/my-tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Get tasks for employee - Accept both ID and name
router.get("/employee/:identifier", async (req, res) => {
    try {
        const identifier = req.params.identifier;
        let tasks;
        
        // Check if identifier is a valid ObjectId (24 characters hex)
        if (mongoose.Types.ObjectId.isValid(identifier)) {
            // Query by ID
            tasks = await Task.find({ assigned: identifier });
            console.log(`Querying tasks by ID: ${identifier}, found: ${tasks.length}`);
        } else {
            // Query by name (fallback for backward compatibility)
            tasks = await Task.find({ assigned: identifier });
            console.log(`Querying tasks by name: ${identifier}, found: ${tasks.length}`);
        }
        
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ message: "Error fetching tasks" });
    }
});

// Update task status (Employee)
router.put("/update-status/:id", async (req, res) => {
    const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );

    res.json(updated);
});

// Update full task (Admin)
router.put("/update-task/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { 
                title: req.body.title,
                assigned: req.body.assigned,
                dueDate: req.body.dueDate,
                status: req.body.status 
            },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

// Delete task
router.delete("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
