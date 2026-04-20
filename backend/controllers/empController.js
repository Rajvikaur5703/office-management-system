const User = require("../models/User");

// GET ALL EMPLOYEES (ONLY EMPLOYEES)
exports.getAllEmployees = async (req, res) => {
    try {
        const users = await User.find({ role: "employee" }).populate("department");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE EMPLOYEE
exports.addEmployee = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "employee",
            jobRole: req.body.jobRole,
            salary: req.body.salary,
            department: req.body.department
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE EMPLOYEE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("department");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 👤 LOGGED IN USER (/me)
exports.getMe = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id).populate("department");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.log(err); // 👈 IMPORTANT FOR DEBUG
        res.status(500).json({ message: err.message });
    }
};

// 📊 EMPLOYEE STATS
exports.getEmployeeStats = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.json({
            name: user.name,
            employeeId: user.employeeId,
            role: user.jobRole,
            salary: user.salary
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};