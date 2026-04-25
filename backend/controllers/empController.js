const mongoose = require("mongoose");
const User = require("../models/User");
const Task= require("../models/Task");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");


//GET ALL EMPLOYEES 
exports.getAllEmployees = async (req, res) => {
    try {
        const users = await User.find({ role: "employee" }).populate("department");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE EMPLOYEE
exports.addEmployee = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: "employee",
            jobRole: req.body.jobRole,
            salary: req.body.salary,
            department: req.body.department
        });

        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET SINGLE EMPLOYEE
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("department");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE EMPLOYEE
exports.updateEmployee = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("department");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE EMPLOYEE
exports.deleteEmployee = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//LOGGED IN USER (/me)
exports.getMe = async (req, res) => {
    try {
        // Check for both .id and ._id just in case
        const userId = req.user.id || req.user._id;

        if (!userId) {
            console.error("No ID found in token payload:", req.user);
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await User.findById(userId).populate("department");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("getMe Error:", err);
        res.status(500).json({ message: err.message });
    }
};

// EMPLOYEE STATS
exports.getEmployeeStats = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        res.json({
            name: user.name,
            employeeId: user.employeeId,
            role: user.jobRole,
            salary: user.salary
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// // 🧠 HELPER FUNCTION
// function calculateHours(checkIn, checkOut) {
//     if (!checkIn || !checkOut) return 0;

//     let inTime, outTime;

//     if (checkIn.includes(":") && checkOut.includes(":")) {
//         let [inH, inM] = checkIn.split(":").map(Number);
//         let [outH, outM] = checkOut.split(":").map(Number);

//         inM = inM || 0;
//         outM = outM || 0;

//         if (isNaN(inH) || isNaN(inM) || isNaN(outH) || isNaN(outM)) return 0;

//         inTime = inH * 60 + inM;
//         outTime = outH * 60 + outM;
//     } else {
//         return 0;
//     }

//     if (outTime <= inTime) return 0;

//     return (outTime - inTime) / 60;
// }


// EMPLOYEE DASHBOARD
exports.getEmployeeDashboard = async (req, res) => {
    try {
        const userId = req.params.id;
        
        console.log("Dashboard request for userId:", userId);
        
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error("Invalid ObjectId:", userId);
            return res.status(400).json({ message: "Invalid user ID format" });
        }
        
        const objectId = new mongoose.Types.ObjectId(userId);
        
        // Get user (for name display only)
        const user = await User.findById(objectId);
        if (!user) {
            console.error("User not found for ID:", userId);
            return res.status(404).json({ message: "User not found" });
        }
        
        const employeeName = user.name;
        console.log("Employee Name:", employeeName);
        
        // TASKS - Query by ObjectId (not name)
        const totalTasks = await Task.countDocuments({
            assigned: objectId  // Use ObjectId, not name
        });
        
        const completedTasks = await Task.countDocuments({
            assigned: objectId,
            status: { $in: ["completed", "Completed", "COMPLETED"] }
        });
        
        console.log(`Tasks found for ${employeeName}: Total=${totalTasks}, Completed=${completedTasks}`);
        
        // ATTENDANCE
        const totalDays = await Attendance.countDocuments({
            employee: objectId
        });
        
        const presentDays = await Attendance.countDocuments({
            employee: objectId,
            status: "Present"
        });
        
        const attendanceDays = totalDays === 0 ? 0 : Math.round((presentDays / totalDays) * 100);
        
        console.log(`Attendance - Total Days: ${totalDays}, Present: ${presentDays}`);
        
        // WORK HOURS
        const attendanceRecords = await Attendance.find({
            employee: objectId,
            status: "Present"
        });
        
        let totalMinutes = 0;
        
        attendanceRecords.forEach(record => {
            if (record.checkIn && record.checkOut) {
                const hours = calculateHours(record.checkIn, record.checkOut);
                if (!isNaN(hours) && hours > 0) {
                    totalMinutes += hours * 60;
                }
            }
        });
        
        const hoursPart = Math.floor(totalMinutes / 60);
        const minutesPart = Math.round(totalMinutes % 60);
        const totalHours = minutesPart === 0 ? `${hoursPart}h` : `${hoursPart}h ${minutesPart}m`;
        
        // RECENT TASKS - Query by ObjectId
        const recentTasks = await Task.find({
            assigned: objectId
        }).sort({ updatedAt: -1 }).limit(3);
        
        const recentAttendance = await Attendance.find({
            employee: objectId
        }).sort({ createdAt: -1 }).limit(2);
        
        // Build activities
        const activities = [];
        
        recentTasks.forEach(task => {
            activities.push({
                message: `Task "${task.title}" is ${task.status}`,
                time: task.updatedAt
            });
        });
        
        recentAttendance.forEach(att => {
            activities.push({
                message: `Marked ${att.status}`,
                time: att.createdAt
            });
        });
        
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        const recentActivity = activities.slice(0, 5);
        
        console.log(`Recent Activities: ${activities.length}`);

        // Task Status (for PIE chart) - Filtered by specific user
const userTasks = await Task.find({ assigned: objectId });

const taskStatus = {
    pending: 0,
    completed: 0,
    "in-progress": 0
};

userTasks.forEach(task => {
    if (task.status) {
        const statusKey = task.status.toLowerCase().trim();
        
        if (statusKey === "completed") {
            taskStatus.completed++;
        } else if (statusKey === "pending") {
            taskStatus.pending++;
        } else if (statusKey === "in-progress" || statusKey === "in progress") {
            taskStatus["in-progress"]++;
        }
    }
});
        
        res.json({
            totalTasks,
            completedTasks,
            attendanceDays,
            totalHours,
            recentActivity,
            taskStatus
        });
        
    } catch (err) {
        console.error("Dashboard Error:", err);
        res.status(500).json({ message: err.message });
    }
};

exports.debugEmployeeData = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.json({ error: "User not found" });
        }
        
        const tasksByName = await Task.find({ assigned: user.name });
        const tasksById = await Task.find({ assigned: userId });
        const allTasks = await Task.find({});
        
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            tasksByName: {
                count: tasksByName.length,
                tasks: tasksByName
            },
            tasksById: {
                count: tasksById.length,
                tasks: tasksById
            },
            allTasksCount: allTasks.length,
            sampleTask: allTasks[0] || null
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};