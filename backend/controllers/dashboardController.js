// This controller will talk to your existing User model (and a placeholder for Task and Attendance) to count the totals.
const User = require('../models/User');

exports.getAdminStats = async (req, res) => {
    try {
        // 1. Count Total Employees
        const totalEmployees = await User.countDocuments({ role: 'employee' });

        // 2. Placeholders for other stats (Update these as you build more models)
        const totalTasks = 0; // await Task.countDocuments();
        const presentToday = 0; 
        const pendingTasks = 0;

        res.status(200).json({
            totalEmployees,
            totalTasks,
            presentToday,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats" });
    }
};

exports.getRecentActivity = async (req, res) => {
    try {
        // For now, we return dummy activities. 
        // Later, you can fetch from an 'ActivityLog' collection.
        const activities = [
            { message: "New Employee 'Rahul' joined IT", timestamp: new Date() },
            { message: "Admin updated 'HR' Department", timestamp: new Date() },
        ];
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activity" });
    }
};