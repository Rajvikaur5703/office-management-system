const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all employees
router.get("/count", async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ totalEmployees: count });
    }
    catch (err) {
        // console.error("Could not Fetch employees..", err);
        res.status(500).json({ message: "Internal server error" });
    }
});