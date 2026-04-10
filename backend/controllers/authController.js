const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // response
    res.json({
      msg: "Login successful",
      token
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};