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
<<<<<<< HEAD
    enum: ["Present", "Absent", "HalfDay"],
=======
    enum: ["Present", "Absent", "Late"],
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
    default: "Present"
  }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);