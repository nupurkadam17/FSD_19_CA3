/**
 * CLOSETÉ - Program 4 Product Routes
 */

const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { validateProduct } = require('../middleware/validator');
const { authenticate, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (Any authenticated user can create/update)
router.post('/', authenticate, validateProduct, createProduct);
router.put('/:id', authenticate, updateProduct);

// Protected route (Only admin can delete)
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

module.exports = router;
