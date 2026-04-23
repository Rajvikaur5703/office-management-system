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

        // 🔹 Total Employees
        const totalEmployees = await User.countDocuments({ role: 'employee' });

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

        const employeesPerDept = {};
        employees.forEach(emp => {
            const dept = emp.department?.name || "Other";
            employeesPerDept[dept] = (employeesPerDept[dept] || 0) + 1;
        });

        // 🔹 Task Status (for PIE chart)
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

        // ✅ Final Response
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


// 🔥 IMPROVED RECENT ACTIVITY
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

