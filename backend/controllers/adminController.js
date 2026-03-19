// importing user model to fetch user data from mongodb
const User = require("../models/User");
// If you have a Task model, import it here:
// const Task = require("../models/Task"); 

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    // 1. Count Total Employees (users where role is 'employee')
    const totalEmployees = await User.countDocuments({ role: "employee" });

    // 2. Count Total Admins (optional)
    const totalAdmins = await User.countDocuments({ role: "admin" });

    // Placeholder values for Tasks until you have a Task model
    const totalTasks = 0; 
    const pendingTasks = 0;
    const presentToday = 0;

    res.status(200).json({
      totalEmployees,
      totalTasks,
      presentToday,
      pendingTasks,
      totalAdmins
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ message: "Server Error fetching stats" });
  }
};

// @desc    Get Recent Activities
// @route   GET /api/admin/activity
exports.getActivities = async (req, res) => {
  try {
    // For now, we return static data. 
    // Later, you can create an 'Activity' model to track real logs.
    const activities = [
      { message: "System started successfully", timestamp: new Date() },
      { message: "Admin dashboard accessed", timestamp: new Date() },
    ];

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: "Server Error fetching activities" });
  }
};