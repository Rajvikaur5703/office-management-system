// Map the URLs to the controller functions.
const express = require('express');
const router = express.Router();
const { getAdminStats, getRecentActivity } = require('../controllers/dashboardController');

// Matches your frontend fetch calls
router.get('/stats', getAdminStats);
router.get('/activity', getRecentActivity);

module.exports = router;