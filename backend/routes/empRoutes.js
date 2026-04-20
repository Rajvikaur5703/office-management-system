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

router.get("/me", authMiddleware, getMe);

// 🔥 EMPLOYEE ROUTES
router.get("/", getAllEmployees);
router.post("/", addEmployee);

router.get("/:id", getProfile);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

router.get("/stats/:id", getEmployeeStats);

module.exports = router;