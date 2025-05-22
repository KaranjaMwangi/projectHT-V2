const User = require('../models/userModel');
const Teacher = require('../models/teacherModel');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to generate JWT token
const generateToken = (user, role) => {
  return jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
};

// Helper function to sanitize user data
const sanitizeUserData = (user) => {
  const userData = user.toObject();
  delete userData.password;
  delete userData.__v;
  return userData;
};

// ADMIN CONTROLLERS
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Admin login attempt for:', email);

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log('No admin found with email:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid admin credentials' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log('Password mismatch for admin:', email);
      return res.status(401).json({ 
        success: false,
        error: 'Invalid admin credentials' 
      });
    }

    // Create and return token
    const token = generateToken(admin, 'admin');
    const adminData = sanitizeUserData(admin);

    console.log('Admin login successful:', email);
    res.status(200).json({
      success: true,
      token,
      user: adminData,
      message: 'Admin login successful'
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during admin login' 
    });
  }
};

// USER CONTROLLERS
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Name, email, and password are required' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'User already exists' 
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      phone: phone || null
    });

    await user.save();

    // Create and return token
    const token = generateToken(user, 'user');
    const userData = sanitizeUserData(user);

    res.status(201).json({
      success: true,
      token,
      user: userData,
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Validate input
    if ((!email && !phone) || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email/phone and password are required' 
      });
    }

    // Find user by email or phone
    const query = email ? { email } : { phone };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid credentials' 
      });
    }

    // Create and return token
    const token = generateToken(user, 'user');
    const userData = sanitizeUserData(user);

    res.status(200).json({
      success: true,
      token,
      user: userData,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
};

// PASSWORD RESET
exports.resetPassword = async (req, res) => {
  try {
    const { email, phone, newPassword } = req.body;

    // Validate input
    if ((!email && !phone) || !newPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Email/phone and new password are required' 
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Password must be at least 6 characters' 
      });
    }

    // Find user by email or phone
    const query = email ? { email } : { phone };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during password reset' 
    });
  }
};

// TEACHER CONTROLLERS
exports.registerTeacher = async (req, res) => {
  try {
    const { name, email, password, subject, phone } = req.body;

    // Validate input
    if (!name || !email || !password || !subject || !phone) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields are required' 
      });
    }

    // Check if teacher exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ 
        success: false,
        error: 'Teacher already exists' 
      });
    }

    // Create new teacher
    const teacher = new Teacher({
      name,
      email,
      password,
      subject,
      phone
    });

    await teacher.save();

    // Create and return token
    const token = generateToken(teacher, 'teacher');
    const teacherData = sanitizeUserData(teacher);

    res.status(201).json({
      success: true,
      token,
      user: teacherData,
      message: 'Teacher registered successfully'
    });

  } catch (error) {
    console.error('Teacher registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during teacher registration' 
    });
  }
};

// COMMON CONTROLLERS
exports.verifyToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user based on role
    let user;
    switch (decoded.role) {
      case 'admin':
        user = await Admin.findById(decoded.id);
        break;
      case 'teacher':
        user = await Teacher.findById(decoded.id);
        break;
      default:
        user = await User.findById(decoded.id);
    }

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    const userData = sanitizeUserData(user);

    res.status(200).json({
      success: true,
      user: userData,
      role: decoded.role
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during logout' 
    });
  }
};