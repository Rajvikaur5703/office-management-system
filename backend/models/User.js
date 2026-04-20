const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Counter = require("./Counter");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

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

// 🔢 EMPLOYEE ID GENERATOR
// userSchema.pre("save", async function () {
//   if (this.employeeId) return;

//   const counter = await Counter.findOneAndUpdate(
//     { name: "employeeId" },
//     { $inc: { value: 1 } },
//     { new: true, upsert: true }
//   );

//   const number = counter.value.toString().padStart(3, "0");
//   this.employeeId = `EMP${number}`;
// });

// 🔑 COMPARE PASSWORD (FIX)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);