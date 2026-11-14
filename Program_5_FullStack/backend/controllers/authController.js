/**
 * CLOSETÉ - Program 5 Mongoose Auth Controller
 */

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Fallback in-memory cache if MongoDB service is not running
const fallbackUsers = [
  {
    _id: "6735e5d304ab123456789099",
    name: 'Atelier Director',
    email: 'admin@closete.com',
    password: bcrypt.hashSync('Admin@123', 10),
    role: 'admin'
  }
];

const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'closete_production_jwt_secret_token_super_secure_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user;
    if (mongoose.connection.readyState === 1) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          status: 'error',
          message: 'Account with this email already exists.'
        });
      }

      user = await User.create({
        name,
        email,
        password,
        role: 'customer'
      });
    } else {
      // Memory fallback mode
      const exists = fallbackUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.status(409).json({ status: 'error', message: 'Account already exists.' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = {
        _id: `mem-usr-${Date.now()}`,
        name,
        email,
        password: hashedPassword,
        role: 'customer'
      };
      fallbackUsers.push(user);
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      status: 'success',
      message: 'Registration successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user;
    let isMatch = false;

    if (mongoose.connection.readyState === 1) {
      user = await User.findOne({ email });
      if (user) {
        isMatch = await user.matchPassword(password);
      }
    } else {
      user = fallbackUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/profile
const getProfile = async (req, res, next) => {
  try {
    let user;
    if (mongoose.connection.readyState === 1) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      user = fallbackUsers.find(u => String(u._id) === String(req.user.id));
    }

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found.' });
    }
    res.status(200).json({ status: 'success', data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getProfile
};
