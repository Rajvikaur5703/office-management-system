const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// ------------------------
// Login
// ------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

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

module.exports = router;