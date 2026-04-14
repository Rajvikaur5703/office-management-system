const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userId: String,
    name: String,
    date: String,
    checkIn: String,
    checkOut: String,
    hours: String,
    status: String
});

module.exports = mongoose.model("Attendance", attendanceSchema);
