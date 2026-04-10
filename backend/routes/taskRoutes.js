const express = require("express");
const router = express.Router();
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

// Get tasks for employee
router.get("/employee/:name", async (req, res) => {
    try {
        const tasks = await Task.find({ assigned: req.params.name });
        res.json(tasks);
    } catch (err) {
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

// Delete task
router.delete("/delete/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
