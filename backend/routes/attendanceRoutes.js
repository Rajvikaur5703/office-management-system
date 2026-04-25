const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Check In
router.post("/checkin", async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        const { employee, date, checkIn } = req.body;

        if (!employee || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if already checked in today
        const today = new Date(date);
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(date);
        tomorrow.setHours(23, 59, 59, 999);

        const existingAttendance = await Attendance.findOne({
            employee: employee,
            date: {
                $gte: today,
                $lte: tomorrow
            }
        });

        if (existingAttendance) {
            return res.status(400).json({ message: "Already checked in today" });
        }

        const attendance = new Attendance({
            employee,
            date,
            checkIn,
            status: "Present"
        });

        await attendance.save();

        // Populate employee info before sending
        const populatedAttendance = await Attendance.findById(attendance._id)
            .populate("employee", "name email");

        res.status(201).json(populatedAttendance);

    } catch (err) {
        console.error("🔥 BACKEND ERROR:", err.message);
        res.status(500).json({ message: err.message });
    }
});

// Check Out
router.put("/checkout/:id", async (req, res) => {
    try {
        const { checkOut, hours } = req.body;

        const updated = await Attendance.findByIdAndUpdate(
            req.params.id,
            {
                checkOut: checkOut,
                hours: hours
            },
            { new: true }
        ).populate("employee", "name email");

        if (!updated) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ message: err.message });
    }
});

<<<<<<< HEAD
// Get Employee History - FIXED to use employee field
=======
// ✅ Get Employee History - FIXED to use employee field
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
router.get("/:employeeId", async (req, res) => {
    try {
        console.log("Fetching attendance for employee:", req.params.employeeId);

        const data = await Attendance.find({ employee: req.params.employeeId })
            .sort({ createdAt: -1 })
            .populate("employee", "name email");

        console.log(`Found ${data.length} records`);
        res.json(data);
    } catch (err) {
        console.error("Fetch error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Admin - Get All
router.get("/", async (req, res) => {
    try {
        const data = await Attendance.find()
            .populate("employee", "name")
            .sort({ createdAt: -1 });

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update attendance status (Admin)
router.put("/update-status/:id", async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        ).populate("employee", "name email");

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;