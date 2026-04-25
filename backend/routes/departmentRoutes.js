const express = require("express");
const router = express.Router();
const {
    createDepartment,
    getDepartment,
    deleteDepartment,
    updateDepartment
} = require("../controllers/departmentController");

router.post("/", createDepartment);
router.get("/", getDepartment);
router.delete("/:id", deleteDepartment);
router.put("/:id", updateDepartment);

module.exports = router;