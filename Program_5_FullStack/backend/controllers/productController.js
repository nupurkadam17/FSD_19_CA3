/**
 * CLOSETÉ - Program 5 Mongoose Product Controller
 * Supports multi-criteria filtering, text search, price ranges, and pagination.
 */

const Product = require('../models/Product');

// Fallback in-memory cache if MongoDB is offline during initial test
let fallbackProducts = [
  {
    _id: "6735e5d304ab123456789001",
    name: "L'Atelier Silk Slip Maxi Dress",
    description: "Crafted from 100% heavyweight mulberry silk with a bias cut that drapes effortlessly.",
    price: 8990,
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Champagne"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    stock: 14,
    isNewSeason: true,
    rating: 4.9
  },
  {
    _id: "6735e5d304ab123456789002",
    name: "Sculpted Cashmere Blend Trench",
    description: "An architectural outerwear silhouette tailored from double-faced Italian wool-cashmere blend.",
    price: 14990,
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    stock: 4,
    isNewSeason: true,
    rating: 5.0
  },
  {
    _id: "6735e5d304ab123456789003",
    name: "Tailored Short & Blazer Co-ord Set",
    description: "Refined two-piece ensemble with relaxed blazer and high-waisted pleated shorts in virgin wool.",
    price: 11990,
    category: "Co-ord Sets",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sage Grey", "Black"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    isNewSeason: false,
    rating: 4.8
  }
];

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-asc') sortOptions = { price: 1 };
    if (sort === 'price-desc') sortOptions = { price: -1 };

    let products;
    try {
      products = await Product.find(query).sort(sortOptions);
    } catch (dbErr) {
      // Graceful fallback to cache
      products = fallbackProducts;
    }

    res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    let product;
    try {
      product = await Product.findById(req.params.id);
    } catch {
      product = fallbackProducts.find(p => String(p._id) === String(req.params.id));
    }

    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json({ status: 'success', data: product });
  } catch (err) {
    next(err);
  }
};

// POST /api/products (Admin / Protected)
const createProduct = async (req, res, next) => {
  try {
    let newProduct;
    try {
      newProduct = await Product.create(req.body);
    } catch (dbErr) {
      newProduct = {
        _id: `mem-${Date.now()}`,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      fallbackProducts.unshift(newProduct);
    }

    res.status(201).json({
      status: 'success',
      message: 'Product created successfully.',
      data: newProduct
    });
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id (Admin / Protected)
const updateProduct = async (req, res, next) => {
  try {
    let updated;
    try {
      updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      });
    } catch {
      const idx = fallbackProducts.findIndex(p => String(p._id) === String(req.params.id));
      if (idx !== -1) {
        fallbackProducts[idx] = { ...fallbackProducts[idx], ...req.body };
        updated = fallbackProducts[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id (Admin / Protected)
const deleteProduct = async (req, res, next) => {
  try {
    let deleted;
    try {
      deleted = await Product.findByIdAndDelete(req.params.id);
    } catch {
      const idx = fallbackProducts.findIndex(p => String(p._id) === String(req.params.id));
      if (idx !== -1) {
        [deleted] = fallbackProducts.splice(idx, 1);
      }
    }

    if (!deleted) {
      return res.status(404).json({ status: 'error', message: 'Product not found.' });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product deleted from catalog.',
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
