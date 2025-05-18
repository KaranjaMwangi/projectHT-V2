const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '20m'; // 20 minute expiration

// Register User (Preserved all existing functionality)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Existing validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const user = new User({ name, email, password });
    if (phone) user.phone = phone;

    await user.save();

    // Modified to include phone in response and 20m expiry
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${field} must be unique` });
    }
    res.status(400).json({ error: error.message });
  }
};

// Login User (Preserved all existing functionality)
exports.loginUser = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!password || (!email && !phone)) {
      return res.status(400).json({ error: 'Email/phone and password are required' });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: email || '' },
        { phone: phone || '' }
      ]
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    // Modified to include 20m expiry
    const token = jwt.sign({ 
      id: user._id, 
      role: user.role 
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        ...(user.subject && { subject: user.subject })
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Verify Token (New implementation)
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    res.json({ valid: false });
  }
};

// Logout (Preserved existing)
exports.logout = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// Reset Password (Preserved all existing functionality)
exports.resetPassword = async (req, res) => {
  try {
    const { email, phone, newPassword } = req.body;

    if (!newPassword || (!email && !phone)) {
      return res.status(400).json({ error: 'Email/phone and new password are required' });
    }

    const user = await User.findOne({
      $or: [
        { email: email || '' },
        { phone: phone || '' }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    // Modified to include 20m expiry
    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ 
      message: 'Password reset successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        ...(user.subject && { subject: user.subject })
      }
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register Teacher (Preserved all existing functionality)
exports.registerTeacher = async (req, res) => {
  try {
    const { name, email, password, subject, phone } = req.body;

    if (!name || !email || !password || !subject || !phone) {
      return res.status(400).json({ 
        error: 'Name, email, password, subject, and phone are required' 
      });
    }

    const teacher = new User({ 
      name, 
      email, 
      password, 
      subject,
      phone,
      role: 'teacher' 
    });

    await teacher.save();

    // Modified to include 20m expiry
    const token = jwt.sign(
      { id: teacher._id, role: teacher.role }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({ 
      message: 'Teacher registered successfully',
      token,
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        role: teacher.role,
        subject: teacher.subject
      }
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${field} must be unique` });
    }
    res.status(400).json({ error: error.message });
  }
};