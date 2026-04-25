const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./Counter");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneno: { type: String, default: "" },
  address: { type: String, default: "" },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },

  employeeId: {
    type: String,
    unique: true
  },

  jobRole: { type: String, default: "" },
  salary: { type: Number, default: 0 },

  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    default: null
  }
});

// 🔐 HASH PASSWORD
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔑 COMPARE PASSWORD (FIX)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
