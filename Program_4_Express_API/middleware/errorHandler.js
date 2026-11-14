/**
 * CLOSETÉ - Program 4 Centralized Error Handling Middleware
 * Intercepts unhandled errors, logs diagnostic traces, and formats
 * a standardized JSON error response.
 */

function errorHandler(err, req, res, next) {
  console.error('\x1b[31m[CENTRALIZED ERROR HANDLER]\x1b[0m', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal server error occurred.';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = errorHandler;
