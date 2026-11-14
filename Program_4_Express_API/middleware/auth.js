/**
 * CLOSETÉ - Program 4 JWT Authentication & Role Authorization Middleware
 * Verifies Bearer tokens and enforces Role-Based Access Control (RBAC).
 */

const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'closete_luxury_atelier_jwt_secret_key_2026';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message: 'Access denied: Missing or malformed Bearer authorization token.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.findUserById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: 'error',
        statusCode: 401,
        message: 'Invalid session: User account associated with token no longer exists.'
      });
    }

    // Attach user payload (excluding password hash) to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? 'Authorization token has expired. Please log in again.'
      : 'Invalid authorization token.';

    return res.status(401).json({
      status: 'error',
      statusCode: 401,
      message
    });
  }
}

/**
 * Restricts route access to specific roles (e.g., 'admin')
 */
function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        status: 'error',
        statusCode: 401,
        message: 'Unauthorized: Authentication required.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        statusCode: 403,
        message: `Forbidden: Access restricted to [${allowedRoles.join(', ')}] roles. Your role is '${req.user.role}'.`
      });
    }

    next();
  };
}

module.exports = {
  authenticate,
  authorize
};
