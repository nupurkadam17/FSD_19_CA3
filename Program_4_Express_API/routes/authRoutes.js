/**
 * CLOSETÉ - Program 4 Authentication Routes
 */

const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validator');
const { authenticate } = require('../middleware/auth');

// Public auth endpoints
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

// Protected user profile endpoint
router.get('/profile', authenticate, getProfile);

module.exports = router;
