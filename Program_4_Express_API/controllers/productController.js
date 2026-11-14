/**
 * CLOSETÉ - Program 4 Product Controller
 * Handles CRUD operations with filtering, sorting, and pagination.
 */

const db = require('../config/db');

/**
 * GET /api/v1/products
 * Public - Retrieves products with optional search, category, and sorting
 */
function getAllProducts(req, res) {
  let products = db.getAllProducts();
  const { search, category, sort } = req.query;

  // Search filter
  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category) {
    products = products.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Sorting
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else {
    // Default newest
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    count: products.length,
    data: products
  });
}

/**
 * GET /api/v1/products/:id
 * Public - Retrieves a single product by ID
 */
function getProductById(req, res) {
  const { id } = req.params;
  const product = db.getProductById(id);

  if (!product) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Product with ID '${id}' not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    data: product
  });
}

/**
 * POST /api/v1/products
 * Protected - Creates a new fashion garment
 */
function createProduct(req, res) {
  const { name, category, price, stock, description, sizes, colors, image } = req.body;

  const newProduct = db.createProduct({
    name: name.trim(),
    category,
    price: Number(price),
    stock: stock !== undefined ? Number(stock) : 10,
    description: description ? description.trim() : 'New collection addition.',
    sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes : ['S', 'M', 'L'],
    colors: Array.isArray(colors) && colors.length > 0 ? colors : ['Noir', 'Ivory'],
    image: image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    createdBy: req.user.email
  });

  res.status(201).json({
    status: 'success',
    statusCode: 201,
    message: 'Product created successfully.',
    data: newProduct
  });
}

/**
 * PUT /api/v1/products/:id
 * Protected - Updates an existing product
 */
function updateProduct(req, res) {
  const { id } = req.params;
  const existing = db.getProductById(id);

  if (!existing) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Cannot update: Product '${id}' not found.`
    });
  }

  const updated = db.updateProduct(id, req.body);

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: 'Product updated successfully.',
    data: updated
  });
}

/**
 * DELETE /api/v1/products/:id
 * Protected (Admin Only) - Deletes a product from catalog
 */
function deleteProduct(req, res) {
  const { id } = req.params;
  const deleted = db.deleteProduct(id);

  if (!deleted) {
    return res.status(404).json({
      status: 'error',
      statusCode: 404,
      message: `Cannot delete: Product '${id}' not found.`
    });
  }

  res.status(200).json({
    status: 'success',
    statusCode: 200,
    message: `Product '${deleted.name}' successfully deleted.`,
    data: deleted
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
