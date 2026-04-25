const User = require('../models/User');
const Task = require('../models/Task'); // make sure you have this model
const Department = require('../models/Department');
const Attendance = require('../models/Attendance');


// 🔥 DASHBOARD STATS + CHART DATA
exports.getAdminStats = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

<<<<<<< HEAD
        // Total Employees
=======
        // 🔹 Total Employees
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        const totalEmployees = await User.countDocuments({ role: 'employee' });
        // Total Tasks
        const totalTasks = await Task.countDocuments();
        // Pending Tasks
        const pendingTasks = await Task.countDocuments({ status: 'pending' });
        // Present Today (dummy for now)
        const presentToday = await Attendance.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay }});

<<<<<<< HEAD
        // Employees per Department (for BAR chart)
        const employees = await User.find({ role: 'employee' }).populate('department');

=======
        // 🔹 Total Tasks
        const totalTasks = await Task.countDocuments();

        // 🔹 Pending Tasks
        const pendingTasks = await Task.countDocuments({ status: 'pending' });

        // 🔹 Present Today (dummy for now)
        const presentToday = await Attendance.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay }
        });

        // 🔹 Employees per Department (for BAR chart)
        const employees = await User.find({ role: 'employee' }).populate('department');

>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        const employeesPerDept = {};
        employees.forEach(emp => {
            const dept = emp.department?.name || "Other";
            employeesPerDept[dept] = (employeesPerDept[dept] || 0) + 1;
        });

<<<<<<< HEAD
        // Task Status (for PIE chart)
=======
        // 🔹 Task Status (for PIE chart)
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        const tasks = await Task.find();

        const taskStatus = {
            pending: 0,
            completed: 0,
            "in-progress": 0
        };

        tasks.forEach(task => {
            if (taskStatus[task.status] !== undefined) {
                taskStatus[task.status]++;
            }
        });

<<<<<<< HEAD
        // Final Response
=======
        // ✅ Final Response
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
        res.status(200).json({
            totalEmployees,
            totalTasks,
            presentToday,
            pendingTasks,
            employeesPerDept, // for charts
            taskStatus        // for charts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching stats" });
    }
};


<<<<<<< HEAD
// IMPROVED RECENT ACTIVITY
=======
// 🔥 IMPROVED RECENT ACTIVITY
>>>>>>> 3c55bf2b1470949dee93eb0b99682a0e7ce19848
exports.getRecentActivity = async (req, res) => {
    try {
        // Get latest employees
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(3);

        const activities = recentUsers.map(user => ({
            message: `${user.name} joined as ${user.role}`,
            timestamp: user.createdAt
        }));

        res.status(200).json(activities);

    } catch (error) {
        res.status(500).json({ message: "Error fetching activity" });
    }
};

