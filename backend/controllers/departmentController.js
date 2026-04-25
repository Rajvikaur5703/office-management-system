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
<<<<<<< HEAD
            { name: req.body.name, description: req.body.description },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Department not found" });
        }
=======
            { name: req.body.name },
            { new: true }
        );
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
};