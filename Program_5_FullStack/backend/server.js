/**
 * CLOSETÉ - Program 5 Full Stack Backend Server
 * Node.js + Express.js + MongoDB (Mongoose) + JWT Auth
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5005;

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(`[FULLSTACK API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${Date.now() - start}ms)`);
  });
  next();
});

// Root route: Luxury API Landing Page (prevents "Cannot GET /")
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>CLOSETÉ — Backend API</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background: #0A0A0A; color: #F7F6F2; padding: 60px 20px; text-align: center; }
        .card { max-width: 600px; margin: 0 auto; background: #1C1C1C; padding: 40px; border: 1px solid #333; border-radius: 4px; }
        h1 { font-family: Georgia, serif; font-size: 2.4rem; letter-spacing: 0.2em; margin-bottom: 8px; color: #FFFFFF; }
        p { color: #888; font-size: 0.9rem; margin-bottom: 24px; }
        .badge { display: inline-block; background: #2E7D32; color: white; padding: 4px 12px; font-size: 0.75rem; font-weight: bold; margin-bottom: 24px; }
        .links a { display: inline-block; margin: 6px 10px; color: #C5A880; text-decoration: none; font-weight: 600; font-size: 0.85rem; border: 1px solid #444; padding: 8px 16px; }
        .links a:hover { background: #C5A880; color: #000; }
        .note { margin-top: 24px; font-size: 0.8rem; color: #AAA; text-align: left; background: #111; padding: 16px; border-left: 3px solid #C5A880; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>CLOSETÉ</h1>
        <p>"STYLE IS PERSONAL. MAKE IT YOURS."</p>
        <span class="badge">● FULL STACK MERN BACKEND RUNNING</span>
        
        <div class="links">
          <a href="/api/products" target="_blank">View Products API (GET)</a>
          <a href="/api/health" target="_blank">Health Check API</a>
          <a href="http://localhost:5173" target="_blank">Open React Frontend (5173)</a>
        </div>

        <div class="note">
          <strong>Backend Endpoints Active:</strong><br>
          • <code>/api/products</code> — Product CRUD (Mongoose)<br>
          • <code>/api/auth/login</code> — JWT Authentication (bcrypt)<br>
          • <code>/api/orders</code> — Customer Orders<br><br>
          <em>To interact with the visual storefront, run the frontend client with <code>npm run dev</code> inside <code>Program_5_FullStack/frontend</code>.</em>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    platform: 'CLOSETÉ Full Stack MERN Platform',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Centralized Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`=======================================================`);
    console.log(`  CLOSETÉ - Program 5 MERN Server Operational`);
    console.log(`  Port: http://127.0.0.1:${PORT}`);
    console.log(`  Connected API Endpoints:`);
    console.log(`  - /api/auth (register, login, profile)`);
    console.log(`  - /api/products (CRUD with Mongoose)`);
    console.log(`  - /api/orders (User order management)`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
