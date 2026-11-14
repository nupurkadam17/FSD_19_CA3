/**
 * CLOSETÉ - Program 4 Express.js REST API Server
 * Title: Development of a Secure REST API for an Online Fashion Store.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// 1. Global Middleware Pipeline
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// 2. Health Check & Root Route
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>CLOSETÉ — Express REST API (Program 4)</title>
        <style>
          body { font-family: 'Segoe UI', sans-serif; background: #0A0A0A; color: #F7F6F2; padding: 50px 20px; text-align: center; }
          .card { max-width: 600px; margin: 0 auto; background: #1C1C1C; padding: 36px; border: 1px solid #333; }
          h1 { font-family: Georgia, serif; letter-spacing: 0.15em; margin-bottom: 8px; color: #FFF; }
          p { color: #888; font-size: 0.9rem; margin-bottom: 20px; }
          .badge { display: inline-block; background: #E65100; color: #FFF; padding: 4px 12px; font-size: 0.75rem; font-weight: bold; margin-bottom: 20px; }
          .links a { display: inline-block; margin: 6px; color: #C5A880; text-decoration: none; border: 1px solid #444; padding: 8px 14px; font-size: 0.85rem; }
          .links a:hover { background: #C5A880; color: #000; }
          .info { text-align: left; margin-top: 24px; background: #111; padding: 14px; font-size: 0.8rem; border-left: 3px solid #E65100; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>CLOSETÉ</h1>
          <p>Program 4: Secure Express.js REST API</p>
          <span class="badge">● EXPRESS ROUTER & JWT ENGINE ACTIVE</span>
          <div class="links">
            <a href="/api/v1/products" target="_blank">GET /api/v1/products</a>
            <a href="/api/v1/auth" target="_blank">POST /api/v1/auth/login</a>
          </div>
          <div class="info">
            <strong>Features:</strong><br>
            • CRUD Routes (GET, POST, PUT, DELETE)<br>
            • Custom Request Logger & Input Validation Middleware<br>
            • JWT Bearer Token Authentication & Role-Based Access (Admin/User)<br>
            • bcrypt Password Hashing (10 Salt Rounds)
          </div>
        </div>
      </body>
      </html>
    `);
  }
  res.status(200).json({
    brand: 'CLOSETÉ',
    service: 'RESTful E-Commerce API',
    version: 'v1',
    status: 'Operational',
    documentation: {
      auth: '/api/v1/auth',
      products: '/api/v1/products'
    }
  });
});

// 3. API Route Modules
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);

// 4. 404 Route Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    statusCode: 404,
    message: `Endpoint ${req.method} ${req.originalUrl} does not exist.`
  });
});

// 5. Centralized Error Handling Middleware
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`=======================================================`);
    console.log(`  CLOSETÉ - Program 4 Express API Running at:`);
    console.log(`  http://127.0.0.1:${PORT}`);
    console.log(`  JWT Auth & bcrypt Active.`);
    console.log(`  Endpoints:`);
    console.log(`  - POST /api/v1/auth/register`);
    console.log(`  - POST /api/v1/auth/login`);
    console.log(`  - GET  /api/v1/auth/profile (Protected)`);
    console.log(`  - GET  /api/v1/products`);
    console.log(`  - POST /api/v1/products (Protected)`);
    console.log(`  - PUT  /api/v1/products/:id (Protected)`);
    console.log(`  - DELETE /api/v1/products/:id (Admin Protected)`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
