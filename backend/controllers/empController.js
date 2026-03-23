// This logic allows the Admin to manage employees and link them to the Departments you just created.
const User = require('../models/User');

// Admin: Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        // Find all users where role is 'employee'
        const employees = await User.find({ role: 'employee' }).select('-password');
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Admin: Add a new employee
exports.addEmployee = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;
        
        // Check if employee already exists
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Employee already exists" });

        const newEmployee = new User({
            name,
            email,
            password, // Hashing happens automatically in your User model!
            role: 'employee',
            department
        });

        await newEmployee.save();
        res.status(201).json({ message: "Employee added successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Employee: Get specific profile
exports.getProfile = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select('-password');
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: "Employee not found" });
    }
};