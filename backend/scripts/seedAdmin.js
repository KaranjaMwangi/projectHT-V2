require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const seedAdmin = async () => {
  try {
    // Connect using your existing db config
    const db = require('../config/db');
    await mongoose.connect(process.env.MONGO_URI, db.options);
    console.log('📦 MongoDB connected for seeding...');

    // Admin check
    const existingAdmin = await User.findOne({ 
      email: process.env.ADMIN_EMAIL,
      role: 'admin' 
    });
    
    if (existingAdmin) {
      console.log('✅ Admin already exists:', existingAdmin.email);
      return process.exit(0);
    }

    // Create admin
    const admin = new User({
      name: process.env.ADMIN_NAME || 'System Admin',
      email: process.env.ADMIN_EMAIL,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12),
      phone: process.env.ADMIN_PHONE || '+254700000000',
      role: 'admin',
      verified: true
    });

    await admin.save();
    console.log('🎉 Admin created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('🔑 Temporary Password:', process.env.ADMIN_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdmin();