const express = require('express'); 
const { registerUser, loginUser, resetPassword, registerTeacher } = require('../controllers/authController');

const router = express.Router();

// User registration
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Password reset
router.post('/reset-password', resetPassword);

// Teacher registration
router.post('/register-teacher', registerTeacher);

module.exports = router;