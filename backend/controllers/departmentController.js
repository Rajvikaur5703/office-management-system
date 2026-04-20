const Department = require("../models/Department");

//create deparmtnet (Admin)
exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.json(department);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get all departments
exports.getDepartment = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json(err);
    }
};

//delete departments
exports.deleteDepartment = async (req, res) => {
    try {
        console.log("Deleting department id:", req.params.id); // debug
        const deleted = await Department.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Department not found" });
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateDepartment = async (req, res) => {
    try {
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
};