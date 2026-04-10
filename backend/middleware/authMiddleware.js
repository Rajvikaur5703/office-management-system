const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes (JWT verification)
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 1️⃣ Extract token
      token = req.headers.authorization.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Find user
      req.user = await User.findById(decoded.id).select("-password");

      // 4️⃣ Continue
      next();

    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Admin-only routes
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied: Admin only" });
  }
};

module.exports = { protect, adminOnly };
