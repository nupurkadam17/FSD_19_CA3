/**
 * CLOSETÉ - Program 4 Input Validation Middleware
 * Validates request schemas and returns 400 Bad Request with field-level errors.
 */

const VALID_CATEGORIES = [
  'Dresses', 'Tops', 'Shirts', 'Trousers', 'Co-ord Sets', 'Outerwear', 'Accessories'
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister(req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters.' });
  }

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push({ field: 'email', message: 'Valid email address is required.' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters long.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Validation failed for registration input.',
      errors
    });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    errors.push({ field: 'email', message: 'A valid registered email is required.' });
  }

  if (!password || typeof password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Login credentials incomplete.',
      errors
    });
  }

  next();
}

function validateProduct(req, res, next) {
  const { name, category, price, stock } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push({ field: 'name', message: 'Garment name must be at least 3 characters.' });
  }

  if (!category || !VALID_CATEGORIES.includes(category)) {
    errors.push({
      field: 'category',
      message: `Category must be one of: ${VALID_CATEGORIES.join(', ')}`
    });
  }

  const numPrice = Number(price);
  if (price === undefined || isNaN(numPrice) || numPrice <= 0) {
    errors.push({ field: 'price', message: 'Price must be a positive number in INR.' });
  }

  if (stock !== undefined) {
    const numStock = Number(stock);
    if (isNaN(numStock) || numStock < 0 || !Number.isInteger(numStock)) {
      errors.push({ field: 'stock', message: 'Stock must be a non-negative integer.' });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      statusCode: 400,
      message: 'Product validation failed.',
      errors
    });
  }

  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct
};
