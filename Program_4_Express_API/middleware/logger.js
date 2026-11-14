/**
 * CLOSETÉ - Program 4 Request Logging Middleware
 * Intercepts incoming requests, calculates processing duration,
 * and formats structured access logs.
 */

function requestLogger(req, res, next) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Listen to response finish event
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const color = statusCode >= 500 ? '\x1b[31m' // Red
      : statusCode >= 400 ? '\x1b[33m'          // Yellow
      : statusCode >= 300 ? '\x1b[36m'          // Cyan
      : '\x1b[32m';                             // Green
    const reset = '\x1b[0m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${color}${statusCode}${reset} - ${duration}ms`
    );
  });

  next();
}

module.exports = requestLogger;
