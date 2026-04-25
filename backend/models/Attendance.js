const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

  hours: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["Present", "Absent", "HalfDay"],
    default: "Present"
  }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);