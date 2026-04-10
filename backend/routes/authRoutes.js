// This creates the endpoint for your frontend to call.
const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
const { login } = require('../controllers/authController');
=======
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
>>>>>>> Stashed changes

// Route: POST /api/auth/login
router.post('/login', login);

<<<<<<< Updated upstream
module.exports = router;
=======
  try {
    // check if fields exist
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter email and password" });
    }

    // find user
    const user = await User.findOne({ email });

    // validate user
    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send response
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department
      }
    });

  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});


// ------------------------
// Add Employee (Register)
// ------------------------
router.post("/register", async (req, res) => {
  const { name, email, password, department, role } = req.body;
  try {
    // 1. Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // 2. Create new user instance
    user = new User({
      name,
      email,
      password, // Note: In the next step, we should hash this!
      department,
      role: role || "user", // Default to user/employee if not specified
    });

    // 3. Save to MongoDB
    await user.save();

    res.status(201).json({ msg: "Employee created successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await User.find({ role: "user" }).select("-password"); // Exclude passwords for security
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// Update employee
router.put("/employee/:id", async (req, res) => {
  try {
    const { name, email, department } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, department },
      { new: true } // Returns the updated document
    );
    res.json({ msg: "Employee updated", updatedUser });
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});


// Delete employee
router.delete("/employee/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});


router.get("/profile", protect, async (req, res) => {
  try {
    // req.user.id comes from your 'protect' middleware
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
>>>>>>> Stashed changes
