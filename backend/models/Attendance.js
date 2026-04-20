const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",   // ✅ FIXED: use User instead of Employee
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  checkIn: {
    type: String,
    default: null
  },

  checkOut: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "Late"],
    default: "Present"
  }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
