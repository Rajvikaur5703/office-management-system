const express = require("express");
const router = express.Router();

const {
    getAllEmployees,
    addEmployee,
    getProfile,
    updateEmployee,
    deleteEmployee,
    getMe,
<<<<<<< HEAD
    getEmployeeStats,
    getEmployeeDashboard,
    debugEmployeeData
=======
    getEmployeeStats
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
} = require("../controllers/empController");

const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getMe);

<<<<<<< HEAD
// EMPLOYEE ROUTES

=======
// 🔥 EMPLOYEE ROUTES
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
router.get("/", getAllEmployees);
router.post("/", addEmployee);

router.get("/:id", getProfile);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

router.get("/stats/:id", getEmployeeStats);
<<<<<<< HEAD
router.get("/dashboard/:id", getEmployeeDashboard);
router.get("/debug/:id", debugEmployeeData);
=======
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848

module.exports = router;