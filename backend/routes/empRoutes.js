const express = require("express");
const router = express.Router();

const {
    getAllEmployees,
    addEmployee,
    getProfile,
    updateEmployee,
    deleteEmployee,
    getMe,
    getEmployeeStats
} = require("../controllers/empController");

const { authMiddleware } = require("../middleware/authMiddleware");

// 🔥 EMPLOYEE ROUTES
router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.get("/:id", getProfile);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

// 🔐 LOGGED IN USER
router.get("/me", authMiddleware, getMe);

// 📊 STATS
router.get("/stats/:id", getEmployeeStats);

module.exports = router;