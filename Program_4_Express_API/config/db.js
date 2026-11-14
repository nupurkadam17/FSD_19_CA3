/**
 * CLOSETÉ - Program 4 Database & Persistence Layer
 * Provides thread-safe data persistence with pre-seeded users and fashion products.
 */

const bcrypt = require('bcryptjs');

// Pre-seeded luxury fashion catalog
const initialProducts = [
  {
    id: "prod-001",
    name: "L'Atelier Silk Slip Maxi Dress",
    description: "Crafted from 100% heavyweight mulberry silk with a bias cut that drapes effortlessly. Cowl neckline.",
    price: 8990,
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Noir", "Champagne"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
    stock: 14,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-002",
    name: "Sculpted Cashmere Blend Trench",
    description: "An architectural outerwear silhouette tailored from double-faced Italian wool-cashmere blend.",
    price: 14990,
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Charcoal"],
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    stock: 4,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-003",
    name: "Tailored Short & Blazer Co-ord Set",
    description: "Refined two-piece ensemble with relaxed blazer and high-waisted pleated shorts in virgin wool.",
    price: 11990,
    category: "Co-ord Sets",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Sage Grey", "Black"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-004",
    name: "Oversized Crisp Poplin Asymmetric Shirt",
    description: "Constructed from 100% organic Egyptian cotton poplin with dropped shoulders and split hem.",
    price: 3990,
    category: "Shirts",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pure White", "Sky Stripe"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    stock: 22,
    createdAt: new Date().toISOString()
  },
  {
    id: "prod-005",
    name: "High-Waist Fluid Pleated Trousers",
    description: "Wide-leg fluid profile from Japanese gabardine twill with sharp pressed pleats and side pockets.",
    price: 4990,
    category: "Trousers",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Ecru"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    stock: 12,
    createdAt: new Date().toISOString()
  }
];

class Database {
  constructor() {
    this.products = [...initialProducts];
    this.users = [];
    this.seedUsers();
  }

  // Pre-seed an admin and client user with hashed passwords (bcrypt salt rounds = 10)
  seedUsers() {
    const salt = bcrypt.genSaltSync(10);
    this.users.push({
      id: "usr-admin-01",
      name: "Atelier Director",
      email: "admin@closete.com",
      password: bcrypt.hashSync("Admin@123", salt),
      role: "admin",
      createdAt: new Date().toISOString()
    });

    this.users.push({
      id: "usr-client-01",
      name: "Ananya Sharma",
      email: "client@closete.com",
      password: bcrypt.hashSync("Client@123", salt),
      role: "customer",
      createdAt: new Date().toISOString()
    });
  }

  // Product Operations
  getAllProducts() {
    return [...this.products];
  }

  getProductById(id) {
    return this.products.find(p => p.id === id) || null;
  }

  createProduct(data) {
    const newProduct = {
      id: `prod-${Date.now().toString().slice(-4)}`,
      ...data,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, updateData) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.products[index] = {
      ...this.products[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return this.products[index];
  }

  deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    const [deleted] = this.products.splice(index, 1);
    return deleted;
  }

  // User Operations
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findUserById(id) {
    return this.users.find(u => u.id === id) || null;
  }

  createUser(userData) {
    const newUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      ...userData,
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }
}

const db = new Database();
module.exports = db;
