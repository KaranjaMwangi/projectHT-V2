const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
const { protect, admin } = require('../middleware/adminMiddleware');

// Admin Login Route
router.post('/login', loginAdmin);

// Protected Admin Routes
// router.get('/dashboard', protect, admin, adminDashboardController);
// router.get('/users', protect, admin, getAllUsersController);
// Add other protected admin routes here

module.exports = router;