/**
 * CLOSETÉ - Program 5 Auth & Role Middleware
 */

const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Not authorized: Missing Bearer token'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'closete_production_jwt_secret_token_super_secure_2026'
    );
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired or invalid'
    });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      status: 'error',
      message: 'Forbidden: Admin clearance required.'
    });
  }
};

module.exports = { protect, adminOnly };
