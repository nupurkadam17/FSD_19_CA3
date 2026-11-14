/**
 * CLOSETÉ - Program 4 Authentication Controller
 * Handles user registration with bcrypt password hashing and
 * user authentication with signed JWT issuance.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'closete_luxury_atelier_jwt_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Registers a new customer account
 * POST /api/v1/auth/register
 */
async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({
        status: 'error',
        statusCode: 409,
        message: 'An account with this email address is already registered.'
      });
    }

    // Hash password with bcrypt (10 rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = db.createUser({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'customer'
    });

    // Sign JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      status: 'success',
      statusCode: 201,
      message: 'Account successfully registered.',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Authenticates user credentials and issues JWT
 * POST /api/v1/auth/login
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        statusCode: 401,
        message: 'Invalid credentials: User not found.'
      });
    }

    // Verify bcrypt hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        statusCode: 401,
        message: 'Invalid credentials: Incorrect password.'
      });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      status: 'success',
      statusCode: 200,
      message: 'Authentication successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Retrieves current authenticated user profile
 * GET /api/v1/auth/profile
 */
function getProfile(req, res) {
  res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: req.user
  });
}

module.exports = {
  register,
  login,
  getProfile
};
