const express = require("express");
const router = express.Router();
const { login } = require("../controllers/authController");

router.post("/login", login);


module.exports = router;








// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// const { protect } = require("../middleware/authMiddleware");
// const bcrypt = require("bcrypt");

// // ------------------------
// // Login
// // ------------------------
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // check if fields exist
//     if (!email || !password) {
//       return res.status(400).json({ msg: "Please enter email and password" });
//     }

//     // find user
//     const user = await User.findOne({ email });

//     // validate user
//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // Compare the hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     // generate token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     // send response
//     res.status(200).json({
//       msg: "Login successful",
//       token,
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         department: user.department
//       }
//     });

//   } catch (err) {
//     console.error("Login Error:", err.message);
//     res.status(500).json({ msg: "Server error" });
//   }
// });


// // ------------------------
// // Add Employee (Register)
// // ------------------------
// router.post("/register", async (req, res) => {
//   const { name, email, password, department, role } = req.body;

//   try {
//     // 1. Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ msg: "User already exists" });
//     }

//      // ✅ Hash the password before saving
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 2. Create new user instance
//     user = new User({
//       name,
//       email,
//       password: hashedPassword, // Save hashed password
//       department,
//       role: role || "user", // Default to user/employee if not specified
//     });

//     // 3. Save to MongoDB
//     await user.save();
    
//     res.status(201).json({ msg: "Employee created successfully", user });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });


// // Get all employees
// router.get("/employees", async (req, res) => {
//   try {
//     const employees = await User.find({ role: "user" }).select("-password"); // Exclude passwords for security
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });


// // Update employee
// router.put("/employee/:id", async (req, res) => {
//   try {
//     const { name, email, department } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { name, email, department },
//       { new: true } // Returns the updated document
//     );
//     res.json({ msg: "Employee updated", updatedUser });
//   } catch (err) {
//     res.status(500).json({ msg: "Update failed" });
//   }
// });


// // Delete employee
// router.delete("/employee/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ msg: "Employee deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Delete failed" });
//   }
// });

// //Get current user profile
// router.get("/profile", protect, async (req, res) => {
//   try {
//     res.json(req.user); // user already loaded in middleware
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// });

// //Update current user profile
// router.put("/profile", protect, async (req, res) => {
//   try {
//     const user = req.user;

//     user.name = req.body.name || user.name;
//     user.department = req.body.department || user.department;
//     user.email = req.body.email || user.email;
//     user.phoneno = req.body.phoneno || user.phoneno;
//     user.address = req.body.address || user.address;

//     await user.save();

//     res.json(user);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;