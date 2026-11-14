/**
 * CLOSETÉ - Program 1 Native HTTP Server
 * Serves static assets and provides authentic REST endpoints (GET & POST)
 * for demonstrating the Fetch API, async/await, and JSON serialization.
 * Zero external dependencies.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

// MIME type map for static asset delivery
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg'
};

// Helper: load products from JSON file
function loadProducts() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products.json:', err.message);
    return [];
  }
}

// Helper: save products to JSON file
function saveProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
}

// In-memory working cache initialized from data file
let productsCache = loadProducts();

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // Set standard CORS headers so client works in all execution contexts
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  // Handle pre-flight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // --------------------------------------------------------------------------
  // API ROUTE 1: GET /api/products
  // --------------------------------------------------------------------------
  if (pathname === '/api/products' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'success',
      timestamp: new Date().toISOString(),
      count: productsCache.length,
      data: productsCache
    }));
    return;
  }

  // --------------------------------------------------------------------------
  // API ROUTE 2: POST /api/products
  // Demonstrates HTTP POST, request body stream reading, input validation,
  // and returning 201 Created with JSON payload.
  // --------------------------------------------------------------------------
  if (pathname === '/api/products' && req.method === 'POST') {
    let rawBody = '';

    req.on('data', chunk => {
      rawBody += chunk;
      // Guard against oversized payload attacks
      if (rawBody.length > 1e6) {
        req.socket.destroy();
      }
    });

    req.on('end', () => {
      try {
        const body = JSON.parse(rawBody);

        // Validation
        if (!body.name || !body.price || !body.category) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Validation failed: name, price, and category are required fields.'
          }));
          return;
        }

        const priceNum = Number(body.price);
        if (isNaN(priceNum) || priceNum <= 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            status: 'error',
            message: 'Validation failed: price must be a positive number.'
          }));
          return;
        }

        // Construct new item
        const newProduct = {
          id: `closete-${String(Date.now()).slice(-4)}`,
          name: String(body.name).trim(),
          description: body.description ? String(body.description).trim() : 'New collection addition.',
          price: priceNum,
          category: body.category,
          sizes: Array.isArray(body.sizes) && body.sizes.length > 0 ? body.sizes : ['S', 'M', 'L'],
          colors: Array.isArray(body.colors) && body.colors.length > 0 ? body.colors : ['Noir', 'Ivory'],
          image: body.image && body.image.startsWith('http') 
            ? body.image 
            : 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
          stock: body.stock ? Number(body.stock) : 10,
          isNew: true,
          isTrending: false,
          rating: 5.0
        };

        // Append to working cache and persist to products.json
        productsCache.unshift(newProduct);
        saveProducts(productsCache);

        console.log(`[SUCCESS] Product created via POST: ${newProduct.name} (ID: ${newProduct.id})`);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'success',
          message: 'Product successfully added to CLOSETÉ catalog via HTTP POST.',
          data: newProduct
        }));
      } catch (err) {
        console.error('JSON parse error on POST /api/products:', err.message);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          status: 'error',
          message: 'Malformed JSON payload.'
        }));
      }
    });
    return;
  }

  // --------------------------------------------------------------------------
  // STATIC ASSET HANDLER
  // --------------------------------------------------------------------------
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for subpaths or 404
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end(`404 Not Found: The resource ${pathname} could not be found.`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`=======================================================`);
    console.log(`  CLOSETÉ - Program 1 Server Running at:`);
    console.log(`  http://127.0.0.1:${PORT}`);
    console.log(`  API Endpoints:`);
    console.log(`  - GET  http://127.0.0.1:${PORT}/api/products`);
    console.log(`  - POST http://127.0.0.1:${PORT}/api/products`);
    console.log(`=======================================================`);
  });
}

module.exports = server;
