const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendence");

// ✅ Check In
router.post("/checkin", async (req, res) => {
    try {
        const { userId, name, date, checkIn } = req.body;

        const newRecord = new Attendance({
            userId,
            name,
            date,
            checkIn,
            checkOut: "-",
            hours: "-",
            status: "Present"
        });

        await newRecord.save();
        res.json(newRecord);

    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Check Out
router.put("/checkout/:id", async (req, res) => {
    try {
        const updated = await Attendance.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
});

// ✅ Get Employee History
router.get("/:userId", async (req, res) => {
    const data = await Attendance.find({ userId: req.params.userId }).sort({ _id: -1 });
    res.json(data);
});

// ✅ Admin - Get All
router.get("/", async (req, res) => {
    const data = await Attendance.find().sort({ _id: -1 });
    res.json(data);
});

// Update attendance status (Admin)
router.put("/update-status/:id", async (req, res) => {
    const updated = await Attendance.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );

    res.json(updated);
});


module.exports = router;
