const express = require('express');
const { 
  registerUser, 
  loginUser, 
  resetPassword, 
  registerTeacher,
  loginAdmin // Add this new controller
} = require('../controllers/authController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Admin login
router.post('/admin/login', loginAdmin); // Add this new route

// Password reset
router.post('/reset-password', resetPassword);

// Teacher registration
router.post('/register-teacher', registerTeacher);

module.exports = router;