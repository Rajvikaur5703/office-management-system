const Attendance = require("../models/Attendance");

const getToday = () => new Date().toISOString().split("T")[0];

// ================= EMPLOYEE =================
<<<<<<< HEAD
=======

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
// Check In
const checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const today = getToday();

        const exists = await Attendance.findOne({ employee: employeeId, date: today });
        if (exists) return res.status(400).json({ message: "Already checked in" });

        const record = await Attendance.create({
            employee: employeeId,
            date: today,
            checkIn: new Date().toLocaleTimeString(),
            status: "Present",
        });

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Check Out
const checkOut = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const today = getToday();

        const record = await Attendance.findOne({ employee: employeeId, date: today });
        if (!record) return res.status(400).json({ message: "Check-in first" });

        record.checkOut = new Date().toLocaleTimeString();
        await record.save();

        res.json(record);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get My Attendance
const getMyAttendance = async (req, res) => {
    try {
        const data = await Attendance.find({ employee: req.params.id })
            .sort({ createdAt: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

<<<<<<< HEAD

// ================= ADMIN =================
=======
// ================= ADMIN =================

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
// Get All Attendance
const getAllAttendance = async (req, res) => {
    try {
        const data = await Attendance.find()
            .populate("employee", "name email")
            .sort({ createdAt: -1 });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update
const updateAttendance = async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete
const deleteAttendance = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getMyAttendance,
    getAllAttendance,
    updateAttendance,
    deleteAttendance,
};